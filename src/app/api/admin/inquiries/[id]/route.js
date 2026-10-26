import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { updateInquiryStatus, deleteInquiry } from "@/lib/inquiriesStore";


export async function PATCH(request, { params }) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!validateSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updated = updateInquiryStatus(id, body.status);

  if (!updated) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, inquiry: updated });
}

export async function DELETE(request, { params }) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!validateSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteInquiry(id);

  if (!deleted) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, inquiry: deleted });
}
