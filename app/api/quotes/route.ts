import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  vehicleType: z.enum(["Sedan", "SUV", "Pickup"]),
  category: z.string().min(1),
  addons: z.array(z.string()).default([]),
});

const basePriceMap: Record<string, number> = {
  Maintenance: 6500,
  Diagnostics: 7800,
  Repairs: 11500,
  Detailing: 9800,
  Aircon: 8400,
  Tires: 7200,
};

const multiplierMap: Record<string, number> = {
  Sedan: 1,
  SUV: 1.2,
  Pickup: 1.25,
};

export async function POST(request: NextRequest) {
  try {
    const values = schema.parse(await request.json());
    const base = basePriceMap[values.category] ?? 6500;
    const multiplier = multiplierMap[values.vehicleType] ?? 1;
    const addonFactor = values.addons.length * 1200;
    const min = Math.round((base * multiplier + addonFactor) * 0.9);
    const max = Math.round((base * multiplier + addonFactor) * 1.3);
    return NextResponse.json({
      estimate: {
        min,
        max,
        disclaimer: "Final price is confirmed after inspection.",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to generate quote", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
