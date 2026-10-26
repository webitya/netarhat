"use client";

import { useState } from "react";
import { X, CheckCircle, Phone, Calendar, Users, Mail, User, MessageSquare, AlertCircle } from "lucide-react";

export default function BookingModal({ isOpen, onClose, selectedPackage = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    guests: "2 Adults",
    package: selectedPackage || "Ranchi – Netarhat – Ranchi (2N/3D)",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
        setError(data.error || "Failed to submit booking. Please try again or WhatsApp us.");
      }
    } catch (err) {
      setError("Network error. You can also reach us directly via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Netarhat Betla Tourism! I want to book/enquire about:\n- Tour: ${formData.package}\n- Name: ${formData.name}\n- Date: ${formData.travelDate}\n- Guests: ${formData.guests}\n- Notes: ${formData.notes}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-xl shadow-2xl border border-[#E5E2D7] overflow-hidden">
        {/* Header */}
        <div className="bg-[#124B2A] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#F4A62A] font-semibold">Instant Tour Booking</span>
            <h3 className="text-xl font-bold text-[#FFFFFF]">Plan Your Nature Retreat</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#3D8B40]/10 text-[#3D8B40] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-2xl font-bold text-[#124B2A]">Booking Request Received!</h4>
              <p className="text-[#25332B] text-sm">
                Thank you, <strong>{formData.name}</strong>. Your inquiry reference is{" "}
                <span className="font-mono bg-[#E5E2D7] px-2 py-0.5 rounded text-[#124B2A] font-bold">
                  {bookingId}
                </span>
                . Our travel specialist will call you within 2 business hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/916205087480?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20ba5a] transition text-sm"
                >
                  Confirm on WhatsApp Now
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg border border-[#E5E2D7] text-[#25332B] font-medium hover:bg-[#F8F7F2] transition text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-7 basal text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">
                  Selected Package / Tour *
                </label>
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] bg-[#F8F7F2]"
                  required
                >
                  <option value="Ranchi – Netarhat – Ranchi (2N/3D)">Ranchi – Netarhat – Ranchi (2N/3D)</option>
                  <option value="Ranchi – Betla National Park – Netarhat (3N/4D)">
                    Ranchi – Betla National Park – Netarhat (3N/4D)
                  </option>
                  <option value="Grand Jharkhand Nature & Safari Expedition (4N/5D)">
                    Grand Jharkhand Nature & Safari Expedition (4N/5D)
                  </option>
                  <option value="Custom Netarhat & Betla Tour Package">Custom Netarhat & Betla Tour</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 62050 87480"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">Preferred Travel Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">Number of Guests</label>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] bg-white"
                  >
                    <option value="1 Solo Traveler">1 Solo Traveler</option>
                    <option value="2 Adults (Couple / Friends)">2 Adults (Couple / Friends)</option>
                    <option value="3-4 Travelers (Family / Small Group)">3-4 Travelers (Family / Small Group)</option>
                    <option value="5-8 Travelers (Large Family / Group)">5-8 Travelers (Large Family / Group)</option>
                    <option value="8+ Travelers (Corporate / School Tour)">8+ Travelers (Corporate / School Tour)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#124B2A] uppercase mb-1">Special Requests or Notes</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                  <textarea
                    rows={2}
                    placeholder="e.g. Senior citizen friendly rooms, pickup from Ranchi airport, vegetarian food..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-lg text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-base shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? "Submitting Inquiry..." : "Submit Booking Inquiry"}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-[#4e5e54]">
                  Prefer quick booking? Chat with our Latehar office directly:{" "}
                  <a
                    href={`https://wa.me/916205087480?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold underline hover:text-[#124B2A]"
                  >
                    WhatsApp +91 62050 87480
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
