import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatDateTimeParis } from "@/lib/format-date";
import type { Justificatif } from "./justificatif";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1b1812" },
  title: { fontSize: 16, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#746c60", marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 700, marginTop: 16, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: "#e4dcc9" },
  label: { color: "#746c60" },
  value: { fontWeight: 700, textAlign: "right", maxWidth: 320 },
  legal: { marginTop: 24, paddingTop: 12, borderTopWidth: 0.5, borderTopColor: "#e4dcc9", fontSize: 8, color: "#746c60", lineHeight: 1.5 },
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function formatDateTime(iso: string): string {
  return formatDateTimeParis(iso, { dateStyle: "full", timeStyle: "short" });
}

export function JustificatifDocument({ justificatif }: { justificatif: Justificatif }) {
  const { operator, legalReference } = justificatif;
  return (
    <Document title={`Justificatif de réservation ${justificatif.reference}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Justificatif de réservation préalable</Text>
        <Text style={styles.subtitle}>Référence {justificatif.reference}</Text>

        <Text style={styles.sectionTitle}>Exploitant</Text>
        <Row label="Exploitant" value={operator.exploitantName} />
        <Row label="Nom commercial" value={operator.commercialName} />
        <Row label="Adresse" value={operator.address} />
        <Row label="SIREN" value={operator.siren} />
        <Row label="Registre VTC" value={operator.vtcRegistryNumber} />
        <Row label="Carte professionnelle" value={operator.professionalCardNumber} />
        <Row label="Téléphone" value={operator.phone} />
        <Row label="E-mail" value={operator.email} />

        <Text style={styles.sectionTitle}>Passager</Text>
        <Row label="Nom" value={justificatif.passengerName} />
        <Row label="Téléphone" value={justificatif.passengerPhone} />

        <Text style={styles.sectionTitle}>Réservation</Text>
        <Row label="Date et heure de la réservation" value={formatDateTime(justificatif.bookedAt)} />
        <Row label="Date et heure de prise en charge" value={formatDateTime(justificatif.pickupAt)} />
        <Row label="Adresse de prise en charge" value={justificatif.pickupAddress} />
        <Row label="Adresse de destination" value={justificatif.destinationAddress} />
        <Row label="Prix convenu" value={justificatif.agreedPriceLabel} />

        <Text style={styles.sectionTitle}>Chauffeur et véhicule</Text>
        <Row label="Chauffeur affecté" value={justificatif.driverName} />
        <Row label="Téléphone chauffeur" value={justificatif.driverPhone} />
        <Row label="Véhicule" value={justificatif.vehicleLabel} />
        <Row label="Immatriculation" value={justificatif.vehiclePlate} />

        <Text style={styles.legal}>{legalReference.articleLabel}. {legalReference.decreeLabel}</Text>
      </Page>
    </Document>
  );
}
