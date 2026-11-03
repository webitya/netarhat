"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BedDouble,
  LogOut,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  ExternalLink,
  Upload,
  User,
  Phone,
  Mail,
  X,
  Database,
  Cloud,
  DollarSign,
  MapPin,
  Tag,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminDashboardClient({
  initialInquiries = [],
  initialPackages = [],
  initialStays = [],
}) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [packages, setPackages] = useState(initialPackages);
  const [stays, setStays] = useState(initialStays);

  const [activeTab, setActiveTab] = useState("overview"); // overview, packages, stays
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Loading states
  const [loadingAction, setLoadingAction] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. INQUIRY MODAL STATE
  const [isAddInquiryOpen, setIsAddInquiryOpen] = useState(false);
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    phone: "",
    email: "",
    package: "Ranchi – Netarhat – Ranchi (2N/3D)",
    travelDate: "",
    guests: "2 Adults",
    notes: "",
  });

  // 2. PACKAGE MODAL STATE
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [packageForm, setPackageForm] = useState({
    title: "",
    subtitle: "",
    destination: "Netarhat",
    duration: "2 Nights / 3 Days",
    startingPrice: "",
    image: "",
    alt: "",
    overview: "",
    highlights: "",
    inclusions: "",
    exclusions: "",
  });

  // 3. STAY MODAL STATE
  const [isStayModalOpen, setIsStayModalOpen] = useState(false);
  const [editingStay, setEditingStay] = useState(null);
  const [stayForm, setStayForm] = useState({
    name: "",
    location: "Netarhat Hills",
    type: "Colonial Heritage Bungalow",
    pricePerNight: "₹3,499",
    image: "",
    alt: "",
    description: "",
    amenities: "",
  });

  // ==========================================
  // CLOUDINARY IMAGE UPLOADER
  // ==========================================
  const handleCloudinaryUpload = async (e, onUrlReceived) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      showToast("error", "Image size exceeds 8MB limit");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "netarhat_tourism");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onUrlReceived(data.url);
        showToast("success", "Image uploaded to Cloudinary successfully!");
      } else {
        showToast("error", data.error || "Cloudinary upload failed");
      }
    } catch (err) {
      showToast("error", "Failed to connect to Cloudinary upload service");
    } finally {
      setUploadingImage(false);
    }
  };

  // ==========================================
  // INQUIRIES ACTIONS
  // ==========================================
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
        showToast("success", `Status updated to ${newStatus} in MongoDB`);
      }
    } catch (err) {
      showToast("error", "Failed to update inquiry status in MongoDB");
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm(`Are you sure you want to delete inquiry ${id}?`)) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        showToast("success", "Inquiry deleted from MongoDB");
      }
    } catch (err) {
      showToast("error", "Failed to delete inquiry from MongoDB");
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
        setIsAddInquiryOpen(false);
        setNewInquiry({
          name: "",
          phone: "",
          email: "",
          package: "Ranchi – Netarhat – Ranchi (2N/3D)",
          travelDate: "",
          guests: "2 Adults",
          notes: "",
        });
        showToast("success", "New inquiry saved to MongoDB successfully!");
      }
    } catch (err) {
      showToast("error", "Failed to save inquiry to MongoDB");
    } finally {
      setLoadingAction(false);
    }
  };

  // ==========================================
  // TOUR PACKAGES ACTIONS (CRUD)
  // ==========================================
  const openAddPackageModal = () => {
    setEditingPackage(null);
    setPackageForm({
      title: "",
      subtitle: "",
      destination: "Netarhat",
      duration: "2 Nights / 3 Days",
      startingPrice: "",
      image: "/images/netarhat_sunrise.jpg",
      alt: "Tour Package Netarhat Betla",
      overview: "",
      highlights: "",
      inclusions: "Deluxe Hotel Stay\nDaily Breakfast & Dinner\nPrivate Sanitized AC SUV Cab\nCertified Local Naturalist Guide",
      exclusions: "Personal expenses\nTrain/Air tickets to Ranchi\nEntry tickets / Safari camera fee",
    });
    setIsPackageModalOpen(true);
  };

  const openEditPackageModal = (pkg) => {
    setEditingPackage(pkg);
    setPackageForm({
      title: pkg.title || "",
      subtitle: pkg.subtitle || "",
      destination: pkg.destination || "Netarhat",
      duration: pkg.duration || "2 Nights / 3 Days",
      startingPrice: pkg.startingPrice || "",
      image: pkg.image || "",
      alt: pkg.alt || pkg.title || "",
      overview: pkg.overview || "",
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join("\n") : pkg.highlights || "",
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join("\n") : pkg.inclusions || "",
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions.join("\n") : pkg.exclusions || "",
    });
    setIsPackageModalOpen(true);
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    try {
      const isEditing = Boolean(editingPackage);
      const url = isEditing
        ? `/api/admin/packages/${editingPackage.id || editingPackage.slug}`
        : "/api/admin/packages";
      const method = isEditing ? "PUT" : "POST";

      const payload = {
        ...packageForm,
        startingPrice: Number(packageForm.startingPrice) || 0,
        highlights: packageForm.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
        inclusions: packageForm.inclusions.split("\n").map((i) => i.trim()).filter(Boolean),
        exclusions: packageForm.exclusions.split("\n").map((e) => e.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isEditing) {
          setPackages((prev) =>
            prev.map((p) =>
              (p.id === editingPackage.id || p.slug === editingPackage.slug)
                ? { ...p, ...payload, ...data.package }
                : p
            )
          );
          showToast("success", `Package "${payload.title}" updated in MongoDB!`);
        } else {
          setPackages((prev) => [data.package, ...prev]);
          showToast("success", `New package "${payload.title}" saved to MongoDB!`);
        }
        setIsPackageModalOpen(false);
      } else {
        showToast("error", data.error || "Failed to save package");
      }
    } catch (err) {
      showToast("error", "Error saving package to MongoDB");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeletePackage = async (pkg) => {
    const idOrSlug = pkg.id || pkg.slug;
    if (!confirm(`Delete tour package "${pkg.title}" from MongoDB?`)) return;

    try {
      const res = await fetch(`/api/admin/packages/${idOrSlug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPackages((prev) => prev.filter((p) => (p.id || p.slug) !== idOrSlug));
        showToast("success", `Package "${pkg.title}" removed from MongoDB`);
      } else {
        showToast("error", "Failed to delete package from MongoDB");
      }
    } catch (err) {
      showToast("error", "Error deleting package from MongoDB");
    }
  };

  // ==========================================
  // STAYS ACTIONS (CRUD)
  // ==========================================
  const openAddStayModal = () => {
    setEditingStay(null);
    setStayForm({
      name: "",
      location: "Netarhat Hills",
      type: "Colonial Heritage Bungalow",
      pricePerNight: "₹3,499",
      image: "/images/netarhat_stay.jpg",
      alt: "Stay Accommodation Netarhat",
      description: "",
      amenities: "Fireplace Rooms, Heritage Verandah, Pine Forest Views, Hot Water, Home-Cooked Food",
    });
    setIsStayModalOpen(true);
  };

  const openEditStayModal = (stay) => {
    setEditingStay(stay);
    setStayForm({
      name: stay.name || "",
      location: stay.location || "",
      type: stay.type || "Resort / Lodge",
      pricePerNight: stay.pricePerNight || "₹2,999",
      image: stay.image || "",
      alt: stay.alt || stay.name || "",
      description: stay.description || "",
      amenities: Array.isArray(stay.amenities) ? stay.amenities.join(", ") : stay.amenities || "",
    });
    setIsStayModalOpen(true);
  };

  const handleSaveStay = async (e) => {
    e.preventDefault();
    setLoadingAction(true);

    try {
      const isEditing = Boolean(editingStay);
      const url = isEditing
        ? `/api/admin/stays/${editingStay.id}`
        : "/api/admin/stays";
      const method = isEditing ? "PUT" : "POST";

      const payload = {
        ...stayForm,
        amenities: stayForm.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isEditing) {
          setStays((prev) =>
            prev.map((s) => (s.id === editingStay.id ? { ...s, ...payload, ...data.stay } : s))
          );
          showToast("success", `Stay "${payload.name}" updated in MongoDB!`);
        } else {
          setStays((prev) => [data.stay, ...prev]);
          showToast("success", `New stay "${payload.name}" saved to MongoDB!`);
        }
        setIsStayModalOpen(false);
      } else {
        showToast("error", data.error || "Failed to save stay");
      }
    } catch (err) {
      showToast("error", "Error saving stay to MongoDB");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteStay = async (stay) => {
    if (!confirm(`Delete stay "${stay.name}" from MongoDB?`)) return;

    try {
      const res = await fetch(`/api/admin/stays/${stay.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStays((prev) => prev.filter((s) => s.id !== stay.id));
        showToast("success", `Stay "${stay.name}" removed from MongoDB`);
      } else {
        showToast("error", "Failed to delete stay from MongoDB");
      }
    } catch (err) {
      showToast("error", "Error deleting stay from MongoDB");
    }
  };

  // Auth Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin-login");
      router.refresh();
    } catch {
      router.push("/admin-login");
    }
  };

  // Filter inquiries
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === "Pending").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;
  const confirmedCount = inquiries.filter((i) => i.status === "Confirmed").length;

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
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl border text-sm font-semibold flex items-center gap-2 animate-fadeIn ${
            toast.type === "success"
              ? "bg-[#124B2A] text-white border-[#3D8B40]"
              : "bg-red-700 text-white border-red-500"
          }`}
        >
          {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#124B2A] text-white shrink-0 flex flex-col justify-between border-r border-[#0c331c]">
        <div>
          {/* Brand Header */}
          <div className="p-4 flex items-center gap-2.5 border-b border-[#0c331c]">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F4A62A] bg-white shrink-0 flex items-center justify-center">
              <img
                src="/netarhat-logo.jpeg"
                alt="Netarhat Logo"
                className="w-full h-full object-cover"
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

          {/* Database & Cloudinary Connection Pills */}
          <div className="p-3 bg-[#0c331c]/60 border-b border-[#1b653b]/40 text-[11px] space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Database size={13} className="shrink-0 text-emerald-400" />
              <span className="font-mono truncate" title="Database: netarhat_tourism">
                DB: <strong>netarhat_tourism</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Cloud size={13} className="shrink-0 text-[#F4A62A]" />
              <span className="font-mono truncate" title="Cloudinary: oyofglqf">
                Media: <strong>oyofglqf</strong>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="p-2 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition ${
                activeTab === "overview"
                  ? "bg-[#F4A62A] text-[#124B2A] font-bold shadow-xs"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard size={16} />
                <span>Bookings & Inquiries</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition ${
                activeTab === "packages"
                  ? "bg-[#F4A62A] text-[#124B2A] font-bold shadow-xs"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package size={16} />
                <span>Tour Packages</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  activeTab === "packages"
                    ? "bg-[#124B2A] text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                {packages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("stays")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition ${
                activeTab === "stays"
                  ? "bg-[#F4A62A] text-[#124B2A] font-bold shadow-xs"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BedDouble size={16} />
                <span>Stays & Hotels</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  activeTab === "stays"
                    ? "bg-[#124B2A] text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                {stays.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#0c331c] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-white/90 hover:bg-white/10 hover:text-white transition"
          >
            <ExternalLink size={14} />
            <span>Open Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. RIGHT MAIN DASHBOARD */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-[#E5E2D7] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#124B2A] leading-tight flex items-center gap-2">
              {activeTab === "overview" && "Customer Bookings & Inquiries"}
              {activeTab === "packages" && "Manage Tour Packages (MongoDB)"}
              {activeTab === "stays" && "Manage Stays & Hotels (MongoDB)"}
            </h1>
            <p className="text-xs text-[#4e5e54] mt-0.5">
              Live MongoDB Cloud Database • Connected to cluster0.pvnjsje.mongodb.net
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {activeTab === "overview" && (
              <button
                onClick={() => setIsAddInquiryOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus size={15} className="text-[#F4A62A]" />
                <span>New Booking Entry</span>
              </button>
            )}

            {activeTab === "packages" && (
              <button
                onClick={openAddPackageModal}
                className="px-4 py-2 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus size={15} className="text-[#F4A62A]" />
                <span>Add Tour Package</span>
              </button>
            )}

            {activeTab === "stays" && (
              <button
                onClick={openAddStayModal}
                className="px-4 py-2 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus size={15} className="text-[#F4A62A]" />
                <span>Add Stay / Hotel</span>
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* TAB 1: INQUIRIES & BOOKINGS */}
          {activeTab === "overview" && (
            <>
              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E5E2D7] shadow-xs">
                  <span className="text-[11px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Total Inquiries
                  </span>
                  <div className="text-2xl font-bold text-[#124B2A] mt-1">{totalCount}</div>
                  <span className="text-[11px] text-[#3D8B40] font-medium">Synced in MongoDB</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5E2D7] shadow-xs">
                  <span className="text-[11px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Pending Follow-up
                  </span>
                  <div className="text-2xl font-bold text-[#F4A62A] mt-1">{pendingCount}</div>
                  <span className="text-[11px] text-[#F4A62A] font-medium">Needs call/response</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5E2D7] shadow-xs">
                  <span className="text-[11px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Contacted
                  </span>
                  <div className="text-2xl font-bold text-[#3D8B40] mt-1">{contactedCount}</div>
                  <span className="text-[11px] text-[#3D8B40] font-medium">Discussion in progress</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5E2D7] shadow-xs">
                  <span className="text-[11px] uppercase font-bold text-[#4e5e54] tracking-wider block">
                    Confirmed
                  </span>
                  <div className="text-2xl font-bold text-[#124B2A] mt-1">{confirmedCount}</div>
                  <span className="text-[11px] text-[#3D8B40] font-medium">Tour finalized</span>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white p-3.5 rounded-xl border border-[#E5E2D7] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {["all", "pending", "contacted", "confirmed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition cursor-pointer ${
                        filterStatus === st
                          ? "bg-[#124B2A] text-white shadow-xs"
                          : "bg-[#F8F7F2] text-[#25332B] hover:bg-[#E5E2D7]"
                      }`}
                    >
                      {st} {st === "all" ? `(${totalCount})` : ""}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <input
                    type="text"
                    placeholder="Search name, phone, package..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 border border-[#E5E2D7] rounded-lg text-xs text-[#25332B] focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="bg-white rounded-xl border border-[#E5E2D7] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#124B2A] text-white border-b border-[#0c331c]">
                        <th className="py-3 px-3.5 font-semibold">Ref ID</th>
                        <th className="py-3 px-3.5 font-semibold">Type</th>
                        <th className="py-3 px-3.5 font-semibold">Traveler Details</th>
                        <th className="py-3 px-3.5 font-semibold">Tour Requested</th>
                        <th className="py-3 px-3.5 font-semibold">Date & Guests</th>
                        <th className="py-3 px-3.5 font-semibold">Status (MongoDB)</th>
                        <th className="py-3 px-3.5 font-semibold text-right">Actions</th>
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
                          <tr key={item.id || item._id} className="hover:bg-[#F8F7F2] transition">
                            <td className="py-3 px-3.5 font-mono font-bold text-[#124B2A]">
                              {item.id}
                            </td>
                            <td className="py-3 px-3.5">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                  item.type === "Booking"
                                    ? "bg-[#124B2A]/10 text-[#124B2A]"
                                    : "bg-[#3D8B40]/10 text-[#3D8B40]"
                                }`}
                              >
                                {item.type}
                              </span>
                            </td>
                            <td className="py-3 px-3.5">
                              <div className="font-bold text-[#124B2A]">{item.name}</div>
                              <div className="text-[11px] text-[#4e5e54] font-mono">{item.phone}</div>
                              {item.email && (
                                <div className="text-[10px] text-[#75867c]">{item.email}</div>
                              )}
                            </td>
                            <td className="py-3 px-3.5 max-w-[200px]">
                              <div className="font-medium truncate" title={item.package}>
                                {item.package}
                              </div>
                              {item.notes && (
                                <div className="text-[10px] text-[#75867c] truncate" title={item.notes}>
                                  Note: {item.notes}
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-3.5">
                              <div className="font-medium">{item.travelDate}</div>
                              <div className="text-[10px] text-[#75867c]">{item.guests}</div>
                            </td>
                            <td className="py-3 px-3.5">
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                className={`text-[11px] font-bold px-2 py-1 rounded border outline-none cursor-pointer ${
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
                            <td className="py-3 px-3.5 text-right">
                              <button
                                onClick={() => handleDeleteInquiry(item.id)}
                                title="Delete inquiry"
                                className="p-1.5 rounded text-red-600 hover:bg-red-50 transition cursor-pointer"
                              >
                                <Trash2 size={15} />
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

          {/* TAB 2: TOUR PACKAGES (WITH MONGODB EDIT/ADD/DELETE) */}
          {activeTab === "packages" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#E5E2D7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#124B2A]">
                    Tour Packages in MongoDB ({packages.length})
                  </h2>
                  <p className="text-xs text-[#4e5e54]">
                    Add, edit, change pricing, and upload high-res banners to Cloudinary.
                  </p>
                </div>
                <button
                  onClick={openAddPackageModal}
                  className="px-4 py-2 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus size={15} className="text-[#F4A62A]" />
                  <span>Create New Tour Package</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id || pkg.slug}
                    className="bg-white rounded-xl border border-[#E5E2D7] shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-44 w-full bg-[#124B2A]/10 overflow-hidden">
                        {pkg.image ? (
                          <img
                            src={pkg.image}
                            alt={pkg.alt || pkg.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={32} />
                          </div>
                        )}
                        <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-mono">
                          {pkg.duration}
                        </span>
                        <span className="absolute bottom-2.5 left-2.5 bg-[#124B2A] text-white text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                          {pkg.destination}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-base text-[#124B2A] leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-[#3D8B40] font-semibold">{pkg.subtitle}</p>
                        <p className="text-xs text-[#4e5e54] line-clamp-2 leading-relaxed">
                          {pkg.overview}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-[#E5E2D7] bg-[#F8F7F2]/50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#4e5e54] block">Starting from</span>
                        <span className="text-lg font-extrabold text-[#124B2A]">
                          ₹{Number(pkg.startingPrice).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditPackageModal(pkg)}
                          className="p-2 rounded-lg bg-white border border-[#E5E2D7] text-[#124B2A] hover:bg-[#124B2A] hover:text-white transition shadow-2xs cursor-pointer"
                          title="Edit Package"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg)}
                          className="p-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition shadow-2xs cursor-pointer"
                          title="Delete Package"
                        >
                          <Trash2 size={14} />
                        </button>
                        <Link
                          href={`/tours/${pkg.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white border border-[#E5E2D7] text-[#4e5e54] hover:text-[#124B2A] transition shadow-2xs"
                          title="View Live Page"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STAYS & HOTELS (WITH MONGODB EDIT/ADD/DELETE) */}
          {activeTab === "stays" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#E5E2D7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#124B2A]">
                    Partner Accommodations in MongoDB ({stays.length})
                  </h2>
                  <p className="text-xs text-[#4e5e54]">
                    Add and update colonial bungalows, view lodges, and forest resorts.
                  </p>
                </div>
                <button
                  onClick={openAddStayModal}
                  className="px-4 py-2 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus size={15} className="text-[#F4A62A]" />
                  <span>Add New Accommodation</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {stays.map((stay) => (
                  <div
                    key={stay.id}
                    className="bg-white rounded-xl border border-[#E5E2D7] shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Stay Image */}
                      <div className="relative h-44 w-full bg-[#124B2A]/10 overflow-hidden">
                        {stay.image ? (
                          <img
                            src={stay.image}
                            alt={stay.alt || stay.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={32} />
                          </div>
                        )}
                        <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                          {stay.type}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-bold text-base text-[#124B2A]">{stay.name}</h3>
                          <span className="text-xs font-bold text-[#F4A62A]">
                            {stay.pricePerNight}
                          </span>
                        </div>
                        <p className="text-xs text-[#3D8B40] font-medium flex items-center gap-1">
                          <MapPin size={12} />
                          {stay.location}
                        </p>
                        <p className="text-xs text-[#4e5e54] line-clamp-2 leading-relaxed">
                          {stay.description}
                        </p>

                        {/* Amenities Preview */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {(Array.isArray(stay.amenities)
                            ? stay.amenities
                            : (stay.amenities || "").split(",")
                          )
                            .slice(0, 3)
                            .map((a, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-[#F8F7F2] text-[#4e5e54] px-1.5 py-0.5 rounded border border-[#E5E2D7]"
                              >
                                {a}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 border-t border-[#E5E2D7] bg-[#F8F7F2]/50 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditStayModal(stay)}
                        className="p-2 rounded-lg bg-white border border-[#E5E2D7] text-[#124B2A] hover:bg-[#124B2A] hover:text-white transition shadow-2xs cursor-pointer"
                        title="Edit Stay"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteStay(stay)}
                        className="p-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition shadow-2xs cursor-pointer"
                        title="Delete Stay"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ==========================================
          MODAL 1: ADD BOOKING / INQUIRY
      ========================================== */}
      {isAddInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E5E2D7] shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#124B2A] text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm">Record New Inquiry (MongoDB)</span>
              <button
                onClick={() => setIsAddInquiryOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sumanth Verma"
                  value={newInquiry.name}
                  onChange={(e) => setNewInquiry({ ...newInquiry, name: e.target.value })}
                  className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newInquiry.phone}
                    onChange={(e) => setNewInquiry({ ...newInquiry, phone: e.target.value })}
                    className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={newInquiry.email}
                    onChange={(e) => setNewInquiry({ ...newInquiry, email: e.target.value })}
                    className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Tour Package</label>
                <select
                  value={newInquiry.package}
                  onChange={(e) => setNewInquiry({ ...newInquiry, package: e.target.value })}
                  className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                >
                  <option value="Ranchi – Netarhat – Ranchi (2N/3D)">Ranchi – Netarhat – Ranchi (2N/3D)</option>
                  <option value="Ranchi – Betla National Park – Netarhat (3N/4D)">
                    Ranchi – Betla National Park – Netarhat (3N/4D)
                  </option>
                  <option value="Grand Jharkhand Nature & Safari Expedition (4N/5D)">
                    Grand Jharkhand Nature & Safari Expedition (4N/5D)
                  </option>
                  <option value="Custom Netarhat & Betla Tour Package">Custom Netarhat & Betla Tour Package</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={newInquiry.travelDate}
                    onChange={(e) => setNewInquiry({ ...newInquiry, travelDate: e.target.value })}
                    className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Guests</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Adults, 1 Child"
                    value={newInquiry.guests}
                    onChange={(e) => setNewInquiry({ ...newInquiry, guests: e.target.value })}
                    className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Special Notes / Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Customer preferences, vehicle choice..."
                  value={newInquiry.notes}
                  onChange={(e) => setNewInquiry({ ...newInquiry, notes: e.target.value })}
                  className="w-full p-2 border border-[#E5E2D7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddInquiryOpen(false)}
                  className="px-4 py-2 border border-[#E5E2D7] text-[#4e5e54] rounded-lg hover:bg-[#F8F7F2] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingAction}
                  className="px-4 py-2 bg-[#124B2A] hover:bg-[#0c331c] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  {loadingAction ? "Saving to MongoDB..." : "Save to MongoDB"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: ADD / EDIT TOUR PACKAGE (CLOUDINARY & MONGO)
      ========================================== */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E5E2D7] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-[#124B2A] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <span className="font-bold text-sm sm:text-base">
                {editingPackage ? `Edit Package: ${editingPackage.title}` : "Add New Tour Package (MongoDB)"}
              </span>
              <button
                onClick={() => setIsPackageModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ranchi – Netarhat – Ranchi (2N/3D)"
                    value={packageForm.title}
                    onChange={(e) => setPackageForm({ ...packageForm, title: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. The Queen of Chotanagpur Nature Retreat"
                    value={packageForm.subtitle}
                    onChange={(e) => setPackageForm({ ...packageForm, subtitle: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg focus:ring-1 focus:ring-[#124B2A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Destination</label>
                  <select
                    value={packageForm.destination}
                    onChange={(e) => setPackageForm({ ...packageForm, destination: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  >
                    <option value="Netarhat">Netarhat</option>
                    <option value="Betla National Park">Betla National Park</option>
                    <option value="Netarhat & Betla">Netarhat & Betla (Combo)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Nights / 3 Days"
                    value={packageForm.duration}
                    onChange={(e) => setPackageForm({ ...packageForm, duration: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="15399"
                    value={packageForm.startingPrice}
                    onChange={(e) => setPackageForm({ ...packageForm, startingPrice: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              {/* CLOUDINARY IMAGE PICKER */}
              <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#124B2A] flex items-center gap-1.5">
                    <Cloud size={16} className="text-[#F4A62A]" />
                    <span>Package Image (Cloudinary Storage)</span>
                  </label>
                  {uploadingImage && (
                    <span className="text-[11px] font-semibold text-[#124B2A] animate-pulse">
                      Uploading to Cloudinary...
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-[#E5E2D7] bg-white shrink-0">
                    {packageForm.image ? (
                      <img src={packageForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      placeholder="Cloudinary image URL or path"
                      value={packageForm.image}
                      onChange={(e) => setPackageForm({ ...packageForm, image: e.target.value })}
                      className="w-full p-2 border border-[#E5E2D7] rounded-lg text-xs font-mono"
                    />

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs">
                        <Upload size={13} className="text-[#F4A62A]" />
                        <span>Upload File to Cloudinary</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleCloudinaryUpload(e, (url) =>
                              setPackageForm((prev) => ({ ...prev, image: url }))
                            )
                          }
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      <span className="text-[10px] text-[#75867c]">Cloud: oyofglqf</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Overview Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed tour overview and travel highlights..."
                  value={packageForm.overview}
                  onChange={(e) => setPackageForm({ ...packageForm, overview: e.target.value })}
                  className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">
                  Key Highlights (1 per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Witness sunrise over Chotanagpur valley&#10;Sunset at Magnolia Point&#10;Upper Ghaghri waterfalls"
                  value={packageForm.highlights}
                  onChange={(e) => setPackageForm({ ...packageForm, highlights: e.target.value })}
                  className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Inclusions (1 per line)</label>
                  <textarea
                    rows={3}
                    value={packageForm.inclusions}
                    onChange={(e) => setPackageForm({ ...packageForm, inclusions: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Exclusions (1 per line)</label>
                  <textarea
                    rows={3}
                    value={packageForm.exclusions}
                    onChange={(e) => setPackageForm({ ...packageForm, exclusions: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E2D7] flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E2D7] text-[#4e5e54] rounded-lg hover:bg-[#F8F7F2] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingAction || uploadingImage}
                  className="px-5 py-2 bg-[#124B2A] hover:bg-[#0c331c] text-white rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Database size={14} className="text-[#F4A62A]" />
                  <span>{loadingAction ? "Saving..." : "Save to MongoDB"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 3: ADD / EDIT STAY (CLOUDINARY & MONGO)
      ========================================== */}
      {isStayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E5E2D7] shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-[#124B2A] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <span className="font-bold text-sm sm:text-base">
                {editingStay ? `Edit Stay: ${editingStay.name}` : "Add New Accommodation (MongoDB)"}
              </span>
              <button
                onClick={() => setIsStayModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStay} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Stay / Hotel Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dak Bungalow, Netarhat"
                    value={stayForm.name}
                    onChange={(e) => setStayForm({ ...stayForm, name: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netarhat Hills"
                    value={stayForm.location}
                    onChange={(e) => setStayForm({ ...stayForm, location: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Accommodation Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Colonial Heritage Bungalow"
                    value={stayForm.type}
                    onChange={(e) => setStayForm({ ...stayForm, type: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#124B2A] mb-1">Price per Night</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3,499"
                    value={stayForm.pricePerNight}
                    onChange={(e) => setStayForm({ ...stayForm, pricePerNight: e.target.value })}
                    className="w-full p-2.5 border border-[#E5E2D7] rounded-lg font-bold"
                  />
                </div>
              </div>

              {/* CLOUDINARY IMAGE PICKER */}
              <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#124B2A] flex items-center gap-1.5">
                    <Cloud size={16} className="text-[#F4A62A]" />
                    <span>Stay Photo (Cloudinary Storage)</span>
                  </label>
                  {uploadingImage && (
                    <span className="text-[11px] font-semibold text-[#124B2A] animate-pulse">
                      Uploading to Cloudinary...
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-[#E5E2D7] bg-white shrink-0">
                    {stayForm.image ? (
                      <img src={stayForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      placeholder="Cloudinary image URL or path"
                      value={stayForm.image}
                      onChange={(e) => setStayForm({ ...stayForm, image: e.target.value })}
                      className="w-full p-2 border border-[#E5E2D7] rounded-lg text-xs font-mono"
                    />

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded bg-[#124B2A] hover:bg-[#0c331c] text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs">
                        <Upload size={13} className="text-[#F4A62A]" />
                        <span>Upload File to Cloudinary</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleCloudinaryUpload(e, (url) =>
                              setStayForm((prev) => ({ ...prev, image: url }))
                            )
                          }
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      <span className="text-[10px] text-[#75867c]">Cloud: oyofglqf</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe cottages, atmosphere, views, food..."
                  value={stayForm.description}
                  onChange={(e) => setStayForm({ ...stayForm, description: e.target.value })}
                  className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-[#124B2A] mb-1">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Fireplace, Pine Forest Views, Hot Water, Restaurant, Free Wi-Fi"
                  value={stayForm.amenities}
                  onChange={(e) => setStayForm({ ...stayForm, amenities: e.target.value })}
                  className="w-full p-2.5 border border-[#E5E2D7] rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-[#E5E2D7] flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsStayModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E2D7] text-[#4e5e54] rounded-lg hover:bg-[#F8F7F2] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingAction || uploadingImage}
                  className="px-5 py-2 bg-[#124B2A] hover:bg-[#0c331c] text-white rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Database size={14} className="text-[#F4A62A]" />
                  <span>{loadingAction ? "Saving..." : "Save to MongoDB"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
