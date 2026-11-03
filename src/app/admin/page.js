import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, validateSessionToken } from "@/lib/auth";
import { getInquiries, getTourPackages, getStays } from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard — Netarhat Betla Tourism",
  description: "Compact administration console for bookings, inquiries, package and stays management.",
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

  const [initialInquiries, initialPackages, initialStays] = await Promise.all([
    getInquiries(),
    getTourPackages(),
    getStays(),
  ]);

  return (
    <AdminDashboardClient
      initialInquiries={initialInquiries}
      initialPackages={initialPackages}
      initialStays={initialStays}
    />
  );
}
