import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getStays, createStay } from "@/lib/db";

export async function GET() {
  try {
    const stays = await getStays();
    return NextResponse.json({ success: true, stays });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!validateSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.name) {
      return NextResponse.json({ success: false, error: "Stay name is required" }, { status: 400 });
    }

    const created = await createStay(data);
    return NextResponse.json({ success: true, stay: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

