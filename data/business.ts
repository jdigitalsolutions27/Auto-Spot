import { BusinessHours } from "@/lib/types";

export const businessInfo = {
  name: "AUTO SPOT",
  tagline: "Premium Auto Care. Precision Service.",
  phone: "+1 (555) 742-8866",
  whatsapp: "+15557428866",
  email: "service@autospotgarage.com",
  address: "1148 Westlake Motor Ave, Los Angeles, CA 90017",
  mapUrl: "https://maps.google.com/?q=Los+Angeles+Auto+Service+Center",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Los%20Angeles%20Auto%20Service%20Center&output=embed",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const businessHours: BusinessHours[] = [
  { day: "Monday", open: "08:00", close: "18:00" },
  { day: "Tuesday", open: "08:00", close: "18:00" },
  { day: "Wednesday", open: "08:00", close: "18:00" },
  { day: "Thursday", open: "08:00", close: "18:00" },
  { day: "Friday", open: "08:00", close: "19:00" },
  { day: "Saturday", open: "09:00", close: "16:00" },
  { day: "Sunday", open: "00:00", close: "00:00", closed: true },
];

export const trustBadges = [
  "Fast Turnaround",
  "Certified Techs",
  "Transparent Pricing",
  "Premium Tools",
];

export const certifications = [
  "OBD2 Advanced Diagnostics",
  "Factory-Grade Torque Specs",
  "Calibrated Alignment System",
  "Trained Service Advisors",
  "Quality-Control Handoff",
];

