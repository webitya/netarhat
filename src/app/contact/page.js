"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Tour Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "Tour Inquiry", message: "" });
      } else {
        setError(data.error || "Failed to send message. Please try again or WhatsApp us.");
      }
    } catch {
      setError("Network error. Please reach us directly on WhatsApp or phone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "Contact Us", href: "/contact" }]} />

      {/* Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Contact Netarhat Betla Tourism
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about tour packages, hotel availability, safari permits, or route conditions? Drop us a message or call our Latehar desk. We reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Form */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E2D7] shadow-sm">
            <h2 className="text-2xl font-bold text-[#124B2A] mb-2">
              Drop Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e54] mb-6">
              Fill in your details below and our travel consultants will respond promptly with recommendations and quotes.
            </p>

            {success ? (
              <div className="p-6 bg-[#3D8B40]/10 border border-[#3D8B40]/30 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 bg-[#3D8B40] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={26} />
                </div>
                <h3 className="font-bold text-lg text-[#124B2A]">Message Sent Successfully!</h3>
                <p className="text-xs text-[#25332B] leading-relaxed">
                  Thank you for contacting Netarhat Betla Tourism. Our tour executive will contact you via email or phone shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-[#124B2A] text-white text-xs font-bold rounded-lg hover:bg-[#0c331c] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2D7] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2D7] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 62050 87480"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2D7] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                    Subject / Topic of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2D7] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] bg-white"
                  >
                    <option value="Tour Package Booking">Tour Package Booking</option>
                    <option value="Netarhat Hotel & Stay Booking">Netarhat Hotel & Stay Booking</option>
                    <option value="Betla National Park Safari Booking">Betla National Park Safari Booking</option>
                    <option value="Custom Group / Corporate Trip">Custom Group / Corporate Trip</option>
                    <option value="Transportation / Cab Rental from Ranchi">Transportation / Cab Rental from Ranchi</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your planned travel dates, number of people, preferred accommodation type, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E2D7] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-sm shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>{loading ? "Sending Message..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Info, Map, & Direct WhatsApp */}
          <div className="space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-[#124B2A] text-white p-8 rounded-2xl shadow-md space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Netarhat Betla Tourism
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#F8F7F2]/90">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#F4A62A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Office Address:</strong>
                    <span>Railway Station Road, Latehar, Jharkhand 829207, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#F4A62A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Call / Direct Helpline:</strong>
                    <a href="tel:6205087480" className="hover:text-[#F4A62A] font-mono text-base font-bold text-white">
                      +91 62050 87480
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#F4A62A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Email Address:</strong>
                    <a href="mailto:info@netarhat.in" className="hover:text-[#F4A62A]">
                      info@netarhat.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#3D8B40] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Desk Working Hours:</strong>
                    <span>Monday to Sunday: 08:00 AM – 08:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct block */}
              <div className="pt-4 border-t border-[#1b653b]">
                <a
                  href="https://wa.me/916205087480?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20inquire%20about%20a%20tour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-[#3D8B40] hover:bg-[#327335] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Chat Directly on WhatsApp (+91 62050 87480)</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm">
              <div className="p-4 bg-[#F8F7F2] border-b border-[#E5E2D7] flex items-center justify-between">
                <span className="font-bold text-xs uppercase text-[#124B2A] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#3D8B40]" />
                  Latehar & Netarhat Location Map
                </span>
                <span className="text-[11px] text-[#4e5e54]">Jharkhand, India</span>
              </div>
              <div className="h-64 w-full">
                <iframe
                  title="Netarhat Latehar Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116744.38289437199!2d84.2045610817028!3d23.479532585250624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b17cebf33583b%3A0xe54fb72a39f60e9a!2sNetarhat%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
