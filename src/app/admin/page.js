import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getAllInquiries } from "@/lib/inquiriesStore";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard — Netarhat Betla Tourism",
  description: "Compact administration console for bookings, inquiries, and package management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  // Verify authentication
  if (!validateSessionToken(sessionToken)) {
    redirect("/admin-login");
  }

  const initialInquiries = getAllInquiries();

  return <AdminDashboardClient initialInquiries={initialInquiries} />;
}
