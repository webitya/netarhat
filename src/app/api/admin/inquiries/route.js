import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getAllInquiries, addInquiry } from "@/lib/inquiriesStore";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!validateSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inquiries = getAllInquiries();
  return NextResponse.json({ inquiries });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const created = addInquiry(data);
    return NextResponse.json({ success: true, inquiry: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 400 });
  }
}
