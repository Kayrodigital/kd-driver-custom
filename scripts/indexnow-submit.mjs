#!/usr/bin/env node
/**
 * Soumet des URL à l'API IndexNow (https://api.indexnow.org/indexnow).
 *
 * Usage :
 *   node scripts/indexnow-submit.mjs --urls /vtc-venissieux,/vtc-givors
 *   node scripts/indexnow-submit.mjs --file urls.txt
 *   node scripts/indexnow-submit.mjs --all
 *   node scripts/indexnow-submit.mjs --changed-since <sha-avant> [--changed-to <sha-apres>]
 *   node scripts/indexnow-submit.mjs ... --dry-run
 *
 * Variables d'environnement :
 *   INDEXNOW_KEY   - la clé IndexNow (sinon la clé retenue ci-dessous est utilisée)
 *   SITE_URL       - domaine canonique (défaut : https://www.kdrive-vtc-lyon.fr)
 *
 * Sécurité : avant toute soumission réelle, le script vérifie que
 * https://<domaine>/<clé>.txt répond 200 avec un corps strictement égal à
 * la clé. Sans cette confirmation, aucune requête n'est envoyée à l'API.
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const SITE_URL = process.env.SITE_URL || "https://www.kdrive-vtc-lyon.fr";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Clé IndexNow retenue (validation KDRIVE du 2026-10-12). C'est la seule clé
// utilisée par ce script ; `public/587d72626dd6488e9cbe765b20ffedc6.txt`
// doit contenir exactement cette valeur. Toute autre clé trouvée dans
// public/ (brouillon, tentative abandonnée) est ignorée par ce script.
const DEFAULT_INDEXNOW_KEY = "587d72626dd6488e9cbe765b20ffedc6";

// Liste de référence : les 16 pages locales mises à jour (SEO KDRIVE, 2026-10-12).
// Utilisée par --all ; sert aussi de garde-fou pour --changed-since (une URL
// détectée doit appartenir à un slug connu sur le site, jamais inventée).
const KNOWN_LOCAL_SLUGS = [
  "vtc-decines-charpieu",
  "vtc-chassieu",
  "vtc-limonest",
  "vtc-dardilly",
  "vtc-saint-genis-laval",
  "vtc-sainte-foy-les-lyon",
  "vtc-charbonnieres-les-bains",
  "vtc-rillieux-la-pape",
  "vtc-saint-fons",
  "vtc-feyzin",
  "vtc-corbas",
  "vtc-craponne",
  "vtc-francheville",
  "vtc-neuville-sur-saone",
  "vtc-givors",
  "vtc-venissieux",
];

// Fichiers de contenu dont une modification peut toucher une ou plusieurs
// des pages locales ci-dessus (registre partagé : un seul fichier contient
// les 16 objets de page). Limité volontairement à ce registre connu —
// un fichier hors de cette liste ne déclenche aucune soumission automatique.
const CONTENT_FILE_TO_FAMILY = {
  "src/app/design-preview/communes-content.ts": "commune",
};

function log(...args) {
  console.log("[indexnow]", ...args);
}

function errorExit(message) {
  console.error("[indexnow] ERREUR:", message);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--all") args.all = true;
    else if (a === "--urls") args.urls = argv[++i];
    else if (a === "--file") args.file = argv[++i];
    else if (a === "--changed-since") args.changedSince = argv[++i];
    else if (a === "--changed-to") args.changedTo = argv[++i];
    else if (a === "--key") args.key = argv[++i];
  }
  return args;
}

function resolveKey(args) {
  const key = args.key || process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
  if (!key) errorExit("Aucune clé IndexNow résolue (ni --key, ni INDEXNOW_KEY, ni clé par défaut).");
  if (!/^[0-9a-fA-F]{8,128}$/.test(key)) errorExit(`Clé IndexNow invalide : "${key}" (attendu : 8 à 128 caractères hexadécimaux).`);
  return key;
}

function normalizeUrl(raw) {
  let u = raw.trim();
  if (!u) return null;
  if (u.startsWith("/")) u = SITE_URL.replace(/\/$/, "") + u;
  if (!u.startsWith(SITE_URL)) {
    log(`Ignoré (domaine non autorisé) : ${u}`);
    return null;
  }
  // Jamais de preview Vercel ni d'URL hors production.
  if (/vercel\.app/.test(u)) {
    log(`Ignoré (URL de preview) : ${u}`);
    return null;
  }
  return u;
}

function dedupe(urls) {
  return Array.from(new Set(urls));
}

function collectFromKnownSlugs() {
  return KNOWN_LOCAL_SLUGS.map((slug) => `${SITE_URL}/${slug}`);
}

function collectFromChangedFiles(fromSha, toSha) {
  const diffRange = toSha ? `${fromSha}..${toSha}` : `${fromSha}..HEAD`;
  let changedFiles;
  try {
    changedFiles = execSync(`git diff --name-only ${diffRange}`, { cwd: repoRoot, encoding: "utf-8" })
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  } catch (e) {
    errorExit(`Impossible de calculer le diff git (${diffRange}) : ${e.message}`);
  }

  const touchedFamilies = new Set();
  for (const f of changedFiles) {
    if (CONTENT_FILE_TO_FAMILY[f]) touchedFamilies.add(CONTENT_FILE_TO_FAMILY[f]);
  }

  if (touchedFamilies.size === 0) {
    log(`Aucun fichier de contenu connu modifié dans ${diffRange} (${changedFiles.length} fichier(s) changés). Rien à soumettre.`);
    return [];
  }

  // Le registre communes-content.ts regroupe les 16 pages dans un seul
  // fichier : impossible de distinguer un slug précis depuis le nom de
  // fichier seul. Par prudence, on ne resoumet que les slugs listés comme
  // connus (jamais une URL inventée), en acceptant de resoumettre tout le
  // lot plutôt que de risquer d'en oublier un.
  if (touchedFamilies.has("commune")) {
    log(`Fichier communes-content.ts modifié entre ${diffRange} : resoumission des ${KNOWN_LOCAL_SLUGS.length} pages locales connues.`);
    return collectFromKnownSlugs();
  }
  return [];
}

async function verifyKeyFilePubliclyAccessible(key) {
  const keyUrl = `${SITE_URL}/${key}.txt`;
  log(`Vérification de l'accessibilité publique de la clé : ${keyUrl}`);
  let res;
  try {
    res = await fetch(keyUrl, { redirect: "follow" });
  } catch (e) {
    errorExit(`Impossible de joindre ${keyUrl} (${e.message}). Le site doit être déployé avant toute soumission.`);
  }
  if (res.status !== 200) {
    errorExit(`${keyUrl} a répondu HTTP ${res.status} (attendu 200). Soumission annulée.`);
  }
  const body = (await res.text()).trim();
  if (body !== key) {
    errorExit(`Le contenu de ${keyUrl} ne correspond pas exactement à la clé attendue. Soumission annulée.`);
  }
  log("Clé publiquement accessible et conforme.");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = resolveKey(args);

  let urls = [];
  if (args.all) {
    urls = collectFromKnownSlugs();
  } else if (args.urls) {
    urls = args.urls.split(",");
  } else if (args.file) {
    urls = readFileSync(args.file, "utf-8").split("\n");
  } else if (args.changedSince) {
    urls = collectFromChangedFiles(args.changedSince, args.changedTo);
  } else {
    errorExit("Spécifiez --all, --urls <liste>, --file <chemin> ou --changed-since <sha>.");
  }

  urls = dedupe(urls.map(normalizeUrl).filter(Boolean));

  if (urls.length === 0) {
    log("Aucune URL valide à soumettre. Fin sans appel API.");
    return;
  }

  log(`${urls.length} URL à soumettre :`);
  for (const u of urls) log(" -", u);

  if (args.dryRun) {
    log("Mode --dry-run : aucune requête envoyée (ni vérification de clé, ni appel IndexNow).");
    return;
  }

  await verifyKeyFilePubliclyAccessible(key);

  const host = new URL(SITE_URL).host;
  const payload = {
    host,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls,
  };

  log(`Envoi d'une seule requête POST à ${INDEXNOW_ENDPOINT} pour ${urls.length} URL...`);
  let res;
  try {
    res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    errorExit(`Échec réseau lors de l'appel IndexNow : ${e.message}`);
  }

  const text = await res.text().catch(() => "");
  log(`Code HTTP retourné : ${res.status}`);
  if (text) log(`Corps de réponse : ${text}`);

  if (res.status === 200 || res.status === 202) {
    log("Soumission acceptée.");
  } else if (res.status === 400) {
    errorExit("400 — requête invalide (format JSON, clé ou host incohérent).");
  } else if (res.status === 403) {
    errorExit("403 — clé invalide ou fichier de clé non conforme.");
  } else if (res.status === 422) {
    errorExit("422 — URL ne correspondant pas au host déclaré, ou clé introuvable à l'emplacement indiqué.");
  } else if (res.status === 429) {
    errorExit("429 — trop de requêtes. Réessayer plus tard.");
  } else {
    errorExit(`Code HTTP inattendu : ${res.status}.`);
  }
}

main().catch((e) => errorExit(e.stack || String(e)));
