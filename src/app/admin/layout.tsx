import Link from "next/link";
import "../design-preview/design-preview.css";
import "./admin.css";

/**
 * Réutilise le design system kd-* déjà servi au site (design-preview.css,
 * déjà importé tel quel par (site)/layout.tsx) plutôt que de le dupliquer.
 * admin.css n'ajoute que les styles propres à l'administration.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="kd-preview">
      <header className="kd-on-dark kd-admin-header">
        <div className="kd-container kd-admin-header-inner">
          <Link href="/admin" className="kd-logo" style={{ color: "var(--kd-cream)", textDecoration: "none" }}>KDRIVE</Link>
          <span className="kd-admin-header-title">Administration</span>
        </div>
      </header>
      {children}
    </div>
  );
}
