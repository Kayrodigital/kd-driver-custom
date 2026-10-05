import type { VehicleCatalogEntry } from "@/domain/pricing/vehicle-catalog";

const vehicleLabels: Record<VehicleCatalogEntry["slug"], string> = {
  essential: "Standard",
  premium: "Premium",
  van: "Van",
};

const modelNames: Record<string, string> = {
  "Mercedes Classe E": "Mercedes E-Class",
  "Mercedes Classe V": "Mercedes V-Class",
};

export function getEnglishVehicleLabel(vehicle: VehicleCatalogEntry): string {
  return vehicleLabels[vehicle.slug];
}

export function getEnglishVehicleExamples(vehicle: VehicleCatalogEntry): string[] {
  return vehicle.examples.map((model) => modelNames[model] ?? model);
}
