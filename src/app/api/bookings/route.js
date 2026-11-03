import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const newBooking = await createInquiry({
      type: "Booking",
      name: data.name,
      email: data.email || "",
      phone: data.phone,
      package: data.package || "Custom Tour",
      travelDate: data.travelDate || "Flexible",
      guests: data.guests || "1 Guest",
      amount: data.amount || "Quotation Required",
      notes: data.notes || data.message || "",
    });

    return NextResponse.json({
      success: true,
      bookingId: newBooking.id,
      message: "Booking inquiry submitted successfully. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}
