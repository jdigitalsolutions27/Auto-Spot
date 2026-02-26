import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { services } from "@/data/services";
import { addBooking, findBooking, listBookings } from "@/lib/mock-db";
import { generateReference } from "@/lib/site";
import { BookingStatus } from "@/lib/types";

const schema = z.object({
  serviceId: z.string().min(1),
  packageId: z.string().optional(),
  vehicleType: z.enum(["Sedan", "SUV", "Pickup"]),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.string().min(4),
  date: z.string().min(1),
  slot: z.string().min(1),
  symptoms: z.array(z.string()).optional(),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional(),
  notes: z.string().optional(),
  photoName: z.string().optional(),
});

const progression: BookingStatus[] = ["Received", "Confirmed", "In Service", "Ready"];

function deriveStatus(reference: string) {
  const hash = reference.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return progression[hash % progression.length];
}

export async function POST(request: NextRequest) {
  try {
    const payload = schema.parse(await request.json());
    const service = services.find((item) => item.id === payload.serviceId);

    if (!service) {
      return NextResponse.json({ message: "Invalid service selected" }, { status: 400 });
    }

    const reference = generateReference();
    const booking = addBooking({
      reference,
      serviceId: payload.serviceId,
      serviceName: service.title,
      packageName: payload.packageId,
      vehicleType: payload.vehicleType,
      make: payload.make,
      model: payload.model,
      year: payload.year,
      date: payload.date,
      slot: payload.slot,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      notes: payload.notes,
      symptoms: payload.symptoms,
      photoName: payload.photoName,
      status: "Received",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to create booking",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ bookings: listBookings() });
  }

  const booking = findBooking(reference);
  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({
    booking: {
      ...booking,
      status: deriveStatus(booking.reference),
    },
  });
}

