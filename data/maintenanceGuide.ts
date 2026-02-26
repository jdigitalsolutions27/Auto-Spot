import { MaintenanceStep } from "@/lib/types";

export const maintenanceGuide: MaintenanceStep[] = [
  {
    mileage: "5,000 km / 3,000 mi",
    services: [
      "Oil + filter check",
      "Tire pressure + wear inspection",
      "Brake visual inspection",
      "Fluid top-up",
    ],
    note: "Ideal interval for high stop-and-go driving conditions.",
  },
  {
    mileage: "10,000 km / 6,000 mi",
    services: [
      "Synthetic oil service",
      "Wheel balancing",
      "Battery health test",
      "Air filter inspection",
    ],
    note: "Recommended for most daily-use sedans and SUVs.",
  },
  {
    mileage: "20,000 km / 12,000 mi",
    services: [
      "Comprehensive multi-point inspection",
      "Alignment + suspension check",
      "Coolant condition review",
      "Cabin filter replacement",
    ],
    note: "Plan this interval early if you frequently drive long highway routes.",
  },
  {
    mileage: "40,000 km / 24,000 mi",
    services: [
      "Transmission fluid service",
      "Brake fluid assessment",
      "Aircon system service",
      "Diagnostic scan",
    ],
    note: "A key milestone for preserving long-term drivetrain reliability.",
  },
];

