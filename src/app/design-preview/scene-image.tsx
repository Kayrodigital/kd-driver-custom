"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Emplacement image d'ambiance : affiche la photo si le fichier existe dans
 * /public/images, sinon retombe sur le dégradé kd-scene existant. Passe par
 * next/image (optimisation automatique, WebP/AVIF selon le navigateur).
 */
export function SceneImage({ src, alt, note, className = "", style, priority = false, sizes = "(max-width: 700px) 100vw, 50vw" }: { src: string; alt: string; note?: string; className?: string; style?: React.CSSProperties; priority?: boolean; sizes?: string }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className={`kd-scene ${className}`} style={style}>
      {!broken && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className="kd-scene-photo"
          onError={() => setBroken(true)}
        />
      )}
      {broken && note && <span className="kd-scene-note">{note}</span>}
    </div>
  );
}
