"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Emplacement image d'ambiance : affiche la photo si le fichier existe dans
 * /public/images, sinon retombe sur le dégradé kd-scene existant.
 *
 * L'échec de chargement (404 local, quasi instantané) peut survenir avant que
 * React n'attache son écouteur `onError` sur l'élément — d'où la vérification
 * `complete`/`naturalWidth` après montage en complément du handler.
 */
export function SceneImage({ src, alt, note, className = "", style }: { src: string; alt: string; note?: string; className?: string; style?: React.CSSProperties }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setBroken(true);
  }, [src]);

  return (
    <div className={`kd-scene ${className}`} style={style}>
      {!broken && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="kd-scene-photo"
          onError={() => setBroken(true)}
        />
      )}
      {broken && note && <span className="kd-scene-note">{note}</span>}
    </div>
  );
}
