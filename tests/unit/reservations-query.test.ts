import { describe, expect, it } from "vitest";
import { buildReservationsQueryParams } from "@/app/admin/reservations-query";

describe("buildReservationsQueryParams", () => {
  it("par défaut : vue 'à traiter', tri création ancienne, page 1, taille 25", () => {
    const params = buildReservationsQueryParams({});
    expect(params.view).toBe("todo");
    expect(params.sort).toBe("created_asc");
    expect(params.page).toBe(1);
    expect(params.pageSize).toBe(25);
    expect(params.includeArchived).toBe(false);
  });

  it("vue 'courses à venir' → tri par défaut course la plus proche", () => {
    expect(buildReservationsQueryParams({ view: "upcoming" }).sort).toBe("pickup_asc");
  });

  it("vue 'archives' → tri par défaut course la plus éloignée (pickup_desc)", () => {
    expect(buildReservationsQueryParams({ view: "archives" }).sort).toBe("pickup_desc");
  });

  it("vue 'toutes' → tri par défaut création récente", () => {
    expect(buildReservationsQueryParams({ view: "all" }).sort).toBe("created_desc");
  });

  it("un tri manuel explicite prend le pas sur le tri par défaut de la vue", () => {
    expect(buildReservationsQueryParams({ view: "todo", sort: "price_desc" }).sort).toBe("price_desc");
  });

  it("ignore une vue ou un tri invalide plutôt que de planter", () => {
    const params = buildReservationsQueryParams({ view: "invalid-view", sort: "invalid-sort" });
    expect(params.view).toBe("todo");
    expect(params.sort).toBe("created_asc");
  });

  it("filtres de date de création et de course indépendants", () => {
    const params = buildReservationsQueryParams({ createdFrom: "2026-08-01", createdTo: "2026-08-05", courseFrom: "2026-08-10", courseTo: "2026-08-15" });
    expect(params).toMatchObject({ createdFrom: "2026-08-01", createdTo: "2026-08-05", courseFrom: "2026-08-10", courseTo: "2026-08-15" });
  });

  it("ignore une date mal formée plutôt que de la transmettre telle quelle", () => {
    const params = buildReservationsQueryParams({ createdFrom: "not-a-date" });
    expect(params.createdFrom).toBe("");
  });

  it("pagination : page et taille de page normalisées, valeur de taille inconnue retombe sur 25", () => {
    expect(buildReservationsQueryParams({ page: "3", pageSize: "50" })).toMatchObject({ page: 3, pageSize: 50 });
    expect(buildReservationsQueryParams({ pageSize: "17" }).pageSize).toBe(25);
    expect(buildReservationsQueryParams({ page: "0" }).page).toBe(1);
    expect(buildReservationsQueryParams({ page: "-5" }).page).toBe(1);
  });

  it("includeArchived seulement si explicitement '1'", () => {
    expect(buildReservationsQueryParams({ includeArchived: "1" }).includeArchived).toBe(true);
    expect(buildReservationsQueryParams({ includeArchived: "true" }).includeArchived).toBe(false);
    expect(buildReservationsQueryParams({}).includeArchived).toBe(false);
  });

  it("recherche : espaces superflus retirés", () => {
    expect(buildReservationsQueryParams({ q: "  KD-2026  " }).search).toBe("KD-2026");
  });
});
