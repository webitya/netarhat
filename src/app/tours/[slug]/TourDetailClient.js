"use client";

import { useState } from "react";
import {
  Calendar,
  Phone,
  Mail,
  User,
  Users,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function TourDetailClient({ tour }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    guests: "2 Adults",
    package: tour.title,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setBookingId(data.bookingId);
      } else {
        setError(data.error || "Failed to submit booking. Please reach us on WhatsApp.");
      }
    } catch {
      setError("Network error. Please WhatsApp our Latehar desk.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Netarhat Betla Tourism! I want to book:\n- Package: ${tour.title}\n- Starting Rate: ₹${tour.startingPrice}\n- Name: ${formData.name || "Traveler"}\n- Preferred Date: ${formData.travelDate || "Flexible"}\n- Guests: ${formData.guests}`
  );

  return (
    <div className="sticky top-24 space-y-6">
      {/* Pricing Card & Booking Box */}
      <div className="bg-white rounded-2xl border-2 border-[#124B2A] shadow-xl overflow-hidden">
        {/* Header Badge */}
        <div className="bg-[#124B2A] text-white p-5 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4A62A] block mb-1">
            Official Package Pricing
          </span>
          <div className="text-3xl font-extrabold text-white">
            ₹{tour.startingPrice.toLocaleString("en-IN")}
            <span className="text-xs font-normal text-[#E5E2D7]"> / person</span>
          </div>
          <p className="text-xs text-[#E5E2D7]/80 mt-1">Deluxe Stay • All Meals • AC SUV Included</p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-[#3D8B40]/10 text-[#3D8B40] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={28} />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#124B2A]">Booking Request Placed!</h3>
              <p className="text-xs text-[#25332B]">
                Inquiry Ref: <strong className="font-mono text-[#124B2A]">{bookingId}</strong>. We will call you within 2 hours to confirm hotel & vehicle availability.
              </p>
              <a
                href={`https://wa.me/919470938399?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#3D8B40] text-white font-bold text-xs"
              >
                <MessageCircle size={15} />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <h3 className="font-serif font-bold text-base text-[#124B2A] pb-1 border-b border-[#E5E2D7]">
                Book / Inquire for this Tour
              </h3>

              {error && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-1.5">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-[#124B2A] uppercase mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-xs text-[#25332B] focus:ring-1 focus:ring-[#124B2A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#124B2A] uppercase mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 94709 38399"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-xs text-[#25332B] focus:ring-1 focus:ring-[#124B2A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#124B2A] uppercase mb-1">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-xs text-[#25332B] focus:ring-1 focus:ring-[#124B2A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#124B2A] uppercase mb-1">
                  Group Size
                </label>
                <div className="relative">
                  <Users size={14} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-xs text-[#25332B] focus:ring-1 focus:ring-[#124B2A] outline-none bg-white"
                  >
                    <option value="1 Solo Traveler">1 Solo Traveler</option>
                    <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                    <option value="4 Travelers (Family)">4 Travelers (Family)</option>
                    <option value="6+ Travelers (Group)">6+ Travelers (Group)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-sm shadow-md transition cursor-pointer"
              >
                {loading ? "Submitting..." : "Book This Tour Now"}
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-[#4e5e54] block mb-1.5">Or connect instantly via:</span>
                <a
                  href={`https://wa.me/919470938399?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-lg bg-[#3D8B40] hover:bg-[#327335] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle size={15} />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E5E2D7] shadow-xs space-y-3 text-xs text-[#25332B]">
        <div className="flex items-center gap-2 font-bold text-[#124B2A]">
          <ShieldCheck size={16} className="text-[#3D8B40]" />
          <span>Our Booking Guarantee</span>
        </div>
        <p className="text-[11px] text-[#4e5e54] leading-relaxed">
          • 100% Sanitized Private AC SUVs with experienced local mountain drivers.<br />
          • Free date rescheduling up to 7 days before travel.<br />
          • Dedicated travel manager assigned to your trip.
        </p>
      </div>
    </div>
  );
}
