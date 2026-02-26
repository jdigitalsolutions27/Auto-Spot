export type ServiceCategory =
  | "Maintenance"
  | "Diagnostics"
  | "Repairs"
  | "Detailing"
  | "Aircon"
  | "Tires";

export type VehicleType = "Sedan" | "SUV" | "Pickup";

export type BookingStatus = "Received" | "Confirmed" | "In Service" | "Ready";

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  duration: string;
  startingPriceRange: string;
  inclusions: string[];
  benefits: string[];
  symptoms?: string[];
  images: string[];
  popular?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  type: "Maintenance" | "Detailing" | "Fleet";
  priceRange: string;
  image?: string;
  idealFor: string;
  turnaround: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  message: string;
  avatar: string;
  source: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: "Before/After" | "Shop" | "Diagnostics" | "Detailing" | "Customer";
  tag: string;
}

export interface MaintenanceStep {
  mileage: string;
  services: string[];
  note: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface BookingRecord {
  reference: string;
  serviceId: string;
  serviceName: string;
  packageName?: string;
  vehicleType: VehicleType;
  make: string;
  model: string;
  year: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  symptoms?: string[];
  photoName?: string;
  status: BookingStatus;
  createdAt: string;
}
