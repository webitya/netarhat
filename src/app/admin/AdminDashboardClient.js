"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  BedDouble,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  ShieldAlert,
  User,
  Phone,
  Mail,
  RefreshCw,
  X,
} from "lucide-react";
import { tourPackages, stays } from "@/lib/data";

export default function AdminDashboardClient({ initialInquiries }) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries || []);
  const [activeTab, setActiveTab] = useState("overview"); // overview, packages, stays, settings
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, contacted, confirmed
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // New Inquiry Form State
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    phone: "",
    email: "",
    package: "Ranchi – Netarhat – Ranchi (2N/3D)",
    travelDate: "",
    guests: "2 Adults",
    notes: "",
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete inquiry ${id}?`)) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry", err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin-login");
      router.refresh();
    } catch {
      router.push("/admin-login");
    }
  };

  const handleCreateInquiry = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) => [data.inquiry, ...prev]);
        setIsAddModalOpen(false);
        setNewInquiry({
          name: "",
          phone: "",
          email: "",
          package: "Ranchi – Netarhat – Ranchi (2N/3D)",
          travelDate: "",
          guests: "2 Adults",
          notes: "",
        });
      }
    } catch (err) {
      console.error("Failed to create inquiry", err);
    } finally {
      setLoadingAction(false);
    }
  };

  // Metrics
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === "Pending").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;
  const confirmedCount = inquiries.filter((i) => i.status === "Confirmed").length;

  // Filtered List
  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus =
      filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.package.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F0EFEA] flex flex-col md:flex-row font-sans text-[#25332B]">
      {/* 1. LEFT SIDEBAR: COMPACT, MINIMAL, LESS BORDER RADIUS */}
      <aside className="w-full md:w-60 bg-[#124B2A] text-white shrink-0 flex flex-col justify-between border-r border-[#0c331c]">
        <div>
          {/* Brand Header */}
          <div className="p-4 flex items-center gap-2.5 border-b border-[#0c331c]">
            <div className="w-9 h-9 rounded-[3px] overflow-hidden border border-[#F4A62A] bg-white shrink-0 flex items-center justify-center">
              <img
                src="/netarhat-logo.jpeg"
                alt="Netarhat Betla Tourism Logo"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">
                Netarhat Betla
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#F4A62A] block">
                Admin Console
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-2 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[3px] text-xs font-semibold transition ${
                activeTab === "overview"
                  ? "bg-[#F4A62A] text-[#124B2A]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard size={15} />
                <span>Inquiries & Bookings</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-[2px] font-mono ${
                  activeTab === "overview"
                    ? "bg-[#124B2A] text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-semibold transition ${
                activeTab === "packages"
                  ? "bg-[#F4A62A] text-[#124B2A]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Package size={15} />
              <span>Tour Packages ({tourPackages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("stays")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-semibold transition ${
                activeTab === "stays"
                  ? "bg-[#F4A62A] text-[#124B2A]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BedDouble size={15} />
              <span>Stays & Hotels ({stays.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[3px] text-xs font-semibold transition ${
                activeTab === "settings"
                  ? "bg-[#F4A62A] text-[#124B2A]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Settings size={15} />
              <span>Environment & System</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#0c331c] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-[11px] text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <ExternalLink size={13} />
            <span>Open Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-[3px] bg-red-600/80 hover:bg-red-700 text-white font-semibold text-xs transition cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. RIGHT SIDE DASHBOARD: COMPACT, SIMPLE, LESS BORDER RADIUS */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-[#E5E2D7] px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-[#124B2A] leading-tight">
              {activeTab === "overview" && "Customer Bookings & Inquiries"}
              {activeTab === "packages" && "Active Tour Packages Directory"}
              {activeTab === "stays" && "Accommodations & Stays Directory"}
              {activeTab === "settings" && "System Configuration (.env.local)"}
            </h1>
            <p className="text-[11px] text-[#4e5e54]">
              Connected to Netarhat Betla Tourism Database • Live Status:{" "}
              <span className="text-[#3D8B40] font-bold">Online</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-[3px] bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus size={14} className="text-[#F4A62A]" />
              <span>Record New Inquiry</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {activeTab === "overview" && (
            <>
              {/* Metric Cards: Compact, Less Border Radius */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-[3px] border border-[#E5E2D7] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Total Inquiries
                  </span>
                  <div className="text-2xl font-bold text-[#124B2A] mt-1">{totalCount}</div>
                  <span className="text-[10px] text-[#3D8B40] font-medium">All recorded leads</span>
                </div>

                <div className="bg-white p-4 rounded-[3px] border border-[#E5E2D7] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Pending Follow-up
                  </span>
                  <div className="text-2xl font-bold text-[#F4A62A] mt-1">{pendingCount}</div>
                  <span className="text-[10px] text-[#F4A62A] font-medium">Needs call/response</span>
                </div>

                <div className="bg-white p-4 rounded-[3px] border border-[#E5E2D7] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Contacted
                  </span>
                  <div className="text-2xl font-bold text-[#3D8B40] mt-1">{contactedCount}</div>
                  <span className="text-[10px] text-[#3D8B40] font-medium">Discussion in progress</span>
                </div>

                <div className="bg-white p-4 rounded-[3px] border border-[#E5E2D7] shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Confirmed
                  </span>
                  <div className="text-2xl font-bold text-[#124B2A] mt-1">{confirmedCount}</div>
                  <span className="text-[10px] text-[#3D8B40] font-medium">Booking finalized</span>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="bg-white p-3 rounded-[3px] border border-[#E5E2D7] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition ${
                      filterStatus === "all"
                        ? "bg-[#124B2A] text-white"
                        : "bg-[#F8F7F2] text-[#25332B] hover:bg-[#E5E2D7]"
                    }`}
                  >
                    All ({totalCount})
                  </button>
                  <button
                    onClick={() => setFilterStatus("pending")}
                    className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition ${
                      filterStatus === "pending"
                        ? "bg-[#F4A62A] text-[#124B2A]"
                        : "bg-[#F8F7F2] text-[#25332B] hover:bg-[#E5E2D7]"
                    }`}
                  >
                    Pending ({pendingCount})
                  </button>
                  <button
                    onClick={() => setFilterStatus("contacted")}
                    className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition ${
                      filterStatus === "contacted"
                        ? "bg-[#3D8B40] text-white"
                        : "bg-[#F8F7F2] text-[#25332B] hover:bg-[#E5E2D7]"
                    }`}
                  >
                    Contacted ({contactedCount})
                  </button>
                  <button
                    onClick={() => setFilterStatus("confirmed")}
                    className={`px-3 py-1 text-xs font-semibold rounded-[2px] transition ${
                      filterStatus === "confirmed"
                        ? "bg-[#124B2A] text-white"
                        : "bg-[#F8F7F2] text-[#25332B] hover:bg-[#E5E2D7]"
                    }`}
                  >
                    Confirmed ({confirmedCount})
                  </button>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-2.5 top-2.5 text-[#4e5e54]" />
                  <input
                    type="text"
                    placeholder="Search name, phone, package..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-[#E5E2D7] rounded-[2px] text-xs text-[#25332B] focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
              </div>

              {/* Data Table: Compact, Simple, Less Border Radius */}
              <div className="bg-white rounded-[3px] border border-[#E5E2D7] overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#124B2A] text-white border-b border-[#0c331c]">
                        <th className="py-2.5 px-3 font-semibold">Ref ID</th>
                        <th className="py-2.5 px-3 font-semibold">Type</th>
                        <th className="py-2.5 px-3 font-semibold">Traveler Details</th>
                        <th className="py-2.5 px-3 font-semibold">Requested Tour</th>
                        <th className="py-2.5 px-3 font-semibold">Date & Guests</th>
                        <th className="py-2.5 px-3 font-semibold">Status</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E2D7] text-[#25332B]">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-[#75867c] text-xs">
                            No inquiries match the selected criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((item) => (
                          <tr key={item.id} className="hover:bg-[#F8F7F2] transition">
                            <td className="py-2.5 px-3 font-mono font-bold text-[#124B2A]">
                              {item.id}
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-[2px] font-semibold ${
                                  item.type === "Booking"
                                    ? "bg-[#124B2A]/10 text-[#124B2A]"
                                    : "bg-[#3D8B40]/10 text-[#3D8B40]"
                                }`}
                              >
                                {item.type}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-[#124B2A]">{item.name}</div>
                              <div className="text-[11px] text-[#4e5e54] font-mono">{item.phone}</div>
                              {item.email && (
                                <div className="text-[10px] text-[#75867c]">{item.email}</div>
                              )}
                            </td>
                            <td className="py-2.5 px-3 max-w-[200px]">
                              <div className="font-medium truncate" title={item.package}>
                                {item.package}
                              </div>
                              {item.notes && (
                                <div className="text-[10px] text-[#75867c] truncate" title={item.notes}>
                                  Note: {item.notes}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="font-medium">{item.travelDate}</div>
                              <div className="text-[10px] text-[#75867c]">{item.guests}</div>
                            </td>
                            <td className="py-2.5 px-3">
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-[2px] border outline-none cursor-pointer ${
                                  item.status === "Confirmed"
                                    ? "bg-green-50 text-green-800 border-green-300"
                                    : item.status === "Contacted"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : "bg-amber-50 text-amber-800 border-amber-300"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Confirmed">Confirmed</option>
                              </select>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleDelete(item.id)}
                                title="Delete inquiry"
                                className="p-1 rounded-[2px] text-red-600 hover:bg-red-50 transition cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Tab 2: Tour Packages Directory */}
          {activeTab === "packages" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-[3px] border border-[#E5E2D7]">
                <h2 className="text-base font-bold text-[#124B2A] mb-1">
                  Active Tour Packages
                </h2>
                <p className="text-xs text-[#4e5e54]">
                  Official itineraries showcased on netarhat.in
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tourPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white p-4 rounded-[3px] border border-[#E5E2D7] shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#3D8B40] uppercase">{pkg.destination}</span>
                      <span className="font-mono bg-[#E5E2D7] px-2 py-0.5 rounded-[2px]">
                        {pkg.duration}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#124B2A]">{pkg.title}</h3>
                    <p className="text-xs text-[#4e5e54] line-clamp-2">{pkg.overview}</p>

                    <div className="pt-2 border-t border-[#E5E2D7] flex items-center justify-between">
                      <span className="text-base font-bold text-[#124B2A]">
                        ₹{pkg.startingPrice.toLocaleString("en-IN")}
                      </span>
                      <Link
                        href={`/tours/${pkg.slug}`}
                        target="_blank"
                        className="text-xs font-semibold text-[#3D8B40] hover:underline flex items-center gap-1"
                      >
                        <span>View Page</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Stays Directory */}
          {activeTab === "stays" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-[3px] border border-[#E5E2D7]">
                <h2 className="text-base font-bold text-[#124B2A] mb-1">
                  Partner Accommodations & Stays
                </h2>
                <p className="text-xs text-[#4e5e54]">
                  Verified colonial bungalows and eco-lodges
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stays.map((stay) => (
                  <div
                    key={stay.id}
                    className="bg-white p-4 rounded-[3px] border border-[#E5E2D7] shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-[#124B2A]">{stay.name}</h3>
                      <span className="text-xs font-bold text-[#F4A62A]">{stay.pricePerNight}</span>
                    </div>
                    <p className="text-xs text-[#3D8B40] font-medium">{stay.location} • {stay.type}</p>
                    <p className="text-xs text-[#4e5e54]">{stay.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Settings & Environment */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-[3px] border border-[#E5E2D7] shadow-2xs space-y-4 max-w-2xl">
              <h2 className="text-lg font-bold text-[#124B2A]">
                Environment Configuration (.env.local)
              </h2>
              <p className="text-xs text-[#4e5e54]">
                The admin authentication is configured securely in <code className="bg-[#E5E2D7] px-1.5 py-0.5 rounded text-[#124B2A]">.env.local</code>.
              </p>

              <div className="space-y-2 text-xs font-mono bg-[#F8F7F2] p-4 rounded-[3px] border border-[#E5E2D7]">
                <div>ADMIN_USERNAME = &quot;admin&quot;</div>
                <div>ADMIN_PASSWORD = &quot;netarhat2026!&quot;</div>
                <div>NEXT_PUBLIC_PHONE = &quot;+916205087480&quot;</div>
                <div>NEXT_PUBLIC_WHATSAPP = &quot;+916205087480&quot;</div>
                <div>NEXT_PUBLIC_SITE_URL = &quot;https://netarhat.in&quot;</div>
              </div>

              <p className="text-[11px] text-[#75867c]">
                To update credentials or contact phone numbers, edit the <code className="text-[#124B2A]">.env.local</code> file in the project root.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* QUICK ADD MODAL: COMPACT, LESS BORDER RADIUS */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[4px] border border-[#E5E2D7] shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-[#124B2A] text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold text-sm">Add New Tour Inquiry</span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={newInquiry.name}
                  onChange={(e) => setNewInquiry({ ...newInquiry, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={newInquiry.phone}
                    onChange={(e) => setNewInquiry({ ...newInquiry, phone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@mail.com"
                    value={newInquiry.email}
                    onChange={(e) => setNewInquiry({ ...newInquiry, email: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Tour Package</label>
                <select
                  value={newInquiry.package}
                  onChange={(e) => setNewInquiry({ ...newInquiry, package: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px] bg-white"
                >
                  <option value="Ranchi – Netarhat – Ranchi (2N/3D)">
                    Ranchi – Netarhat – Ranchi (2N/3D)
                  </option>
                  <option value="Ranchi – Betla National Park – Netarhat (3N/4D)">
                    Ranchi – Betla National Park – Netarhat (3N/4D)
                  </option>
                  <option value="Grand Jharkhand Nature & Safari Expedition (4N/5D)">
                    Grand Jharkhand Nature & Safari Expedition (4N/5D)
                  </option>
                  <option value="Custom Tour Inquiry">Custom Tour Inquiry</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={newInquiry.travelDate}
                    onChange={(e) => setNewInquiry({ ...newInquiry, travelDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Guests</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Adults"
                    value={newInquiry.guests}
                    onChange={(e) => setNewInquiry({ ...newInquiry, guests: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Special Notes</label>
                <textarea
                  rows={2}
                  placeholder="Notes from customer..."
                  value={newInquiry.notes}
                  onChange={(e) => setNewInquiry({ ...newInquiry, notes: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[#E5E2D7] rounded-[2px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-[2px] border border-[#E5E2D7] text-[#25332B] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingAction}
                  className="px-4 py-1.5 rounded-[2px] bg-[#124B2A] text-white font-bold hover:bg-[#0c331c]"
                >
                  {loadingAction ? "Saving..." : "Save Inquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
