"use client";

import { useState } from "react";
import {
  Calendar,
  Phone,
  Mail,
  User,
  Users,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
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
        {/* Header */}
        <div className="bg-[#124B2A] text-white p-5 text-center">
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
              <h3 className="font-bold text-lg text-[#124B2A]">Booking Request Placed!</h3>
              <p className="text-xs text-[#25332B]">
                Inquiry Ref: <strong className="font-mono text-[#124B2A]">{bookingId}</strong>. We will call you within 2 hours to confirm hotel & vehicle availability.
              </p>
              <a
                href={`https://wa.me/916205087480?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#3D8B40] text-white font-bold text-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <h3 className="font-bold text-base text-[#124B2A] pb-1 border-b border-[#E5E2D7]">
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
                    placeholder="+91 62050 87480"
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
                  href={`https://wa.me/916205087480?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-lg bg-[#3D8B40] hover:bg-[#327335] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
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
