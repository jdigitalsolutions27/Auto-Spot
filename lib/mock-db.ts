import { BookingRecord } from "@/lib/types";

declare global {
  // eslint-disable-next-line no-var
  var __autoSpotBookings: BookingRecord[] | undefined;
}

const storage = global.__autoSpotBookings ?? [];

if (!global.__autoSpotBookings) {
  global.__autoSpotBookings = storage;
}

export function addBooking(booking: BookingRecord) {
  storage.unshift(booking);
  return booking;
}

export function findBooking(reference: string) {
  return storage.find((item) => item.reference.toLowerCase() === reference.toLowerCase());
}

export function listBookings() {
  return storage;
}

