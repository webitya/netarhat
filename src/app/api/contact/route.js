import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/inquiriesStore";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const newContact = addInquiry({
      type: "Contact",
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      package: data.subject || "General Inquiry",
      notes: data.message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We typically reply within 24 hours.",
      id: newContact.id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
