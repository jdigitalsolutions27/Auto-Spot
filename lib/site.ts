import { businessHours } from "@/data/business";

const dayToIndex: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function parseTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return { hours, minutes };
}

export function isBusinessOpen(date = new Date()) {
  const day = businessHours.find((hour) => dayToIndex[hour.day] === date.getDay());

  if (!day || day.closed) {
    return false;
  }

  const open = parseTime(day.open);
  const close = parseTime(day.close);
  const nowInMinutes = date.getHours() * 60 + date.getMinutes();
  const openInMinutes = open.hours * 60 + open.minutes;
  const closeInMinutes = close.hours * 60 + close.minutes;

  return nowInMinutes >= openInMinutes && nowInMinutes <= closeInMinutes;
}

export function toTel(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function toWhatsApp(phone: string, message?: string) {
  const clean = phone.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${clean}${text}`;
}

export function generateReference(prefix = "AS") {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${datePart}-${randomPart}`;
}

export function createIcsFile({
  title,
  description,
  location,
  startDate,
  durationMinutes = 60,
}: {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  durationMinutes?: number;
}) {
  const toICSDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  const uid = `${Date.now()}@autospotgarage.com`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AUTO SPOT//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(startDate)}`,
    `DTEND:${toICSDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
}

