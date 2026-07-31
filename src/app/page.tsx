import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <p className="eyebrow">KD Driver · Lyon</p>
      <h1>Votre trajet, réservé simplement.</h1>
      <p>Prototype technique du tunnel de réservation sur mesure.</p>
      <Link className="button-link" href="/reserver">Commencer une réservation</Link>
    </main>
  );
}
