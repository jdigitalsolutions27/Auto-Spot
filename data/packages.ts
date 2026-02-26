import { ServicePackage } from "@/lib/types";

export const packages: ServicePackage[] = [
  {
    id: "pkg-essential",
    name: "Essential Care",
    type: "Maintenance",
    priceRange: "₱8,300-₱12,800",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Daily-driven vehicles",
    turnaround: "2-3 hours",
    features: ["Oil + filter service", "Brake and tire check", "Fluid top-up", "Digital health summary"],
  },
  {
    id: "pkg-performance",
    name: "Performance Care",
    type: "Maintenance",
    priceRange: "₱15,700-₱23,500",
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Vehicles needing deeper maintenance coverage",
    turnaround: "Half day",
    features: [
      "Essential Care inclusions",
      "Engine tune-up inspection",
      "Battery + alternator diagnostics",
      "Cooling system assessment",
    ],
  },
  {
    id: "pkg-signature",
    name: "Signature Total Care",
    type: "Maintenance",
    priceRange: "₱27,400-₱42,600",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Owners wanting premium all-round preventive care",
    turnaround: "1 day",
    features: [
      "Performance Care inclusions",
      "Alignment + balancing",
      "Aircon performance check",
      "Priority scheduling and QA handoff",
    ],
  },
  {
    id: "pkg-detail-core",
    name: "Detail Core",
    type: "Detailing",
    priceRange: "₱10,100-₱15,700",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Routine detailing refresh",
    turnaround: "2-4 hours",
    features: ["Exterior wash + decontamination", "Interior vacuum and wipe down", "Tire dressing", "Glass polish"],
  },
  {
    id: "pkg-detail-plus",
    name: "Detail Plus",
    type: "Detailing",
    priceRange: "₱17,900-₱30,200",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Deeper correction and interior conditioning",
    turnaround: "5-7 hours",
    features: ["Detail Core inclusions", "Single-stage paint polish", "Interior extraction", "Trim conditioning"],
  },
  {
    id: "pkg-detail-ceramic",
    name: "Ceramic Signature",
    type: "Detailing",
    priceRange: "₱34,700-₱78,400",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Long-term finish protection",
    turnaround: "1-2 days",
    features: ["Paint correction prep", "Ceramic coating application", "Cure inspection", "Aftercare guidance"],
  },
  {
    id: "pkg-fleet-priority",
    name: "Fleet Priority Program",
    type: "Fleet",
    priceRange: "Custom by fleet size",
    image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80",
    idealFor: "Business fleets and mobility operators",
    turnaround: "Scheduled windows",
    features: ["Dedicated account support", "Monthly service planning", "Consolidated billing", "Vehicle status dashboard support"],
  },
];

export const packageComparisonColumns = ["Essential Care", "Performance Care", "Signature Total Care"];


