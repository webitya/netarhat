"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Send,
} from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#124B2A] text-[#F8F7F2] border-t-4 border-[#F4A62A] pt-14 pb-8">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#1b653b]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F4A62A] bg-white shrink-0 flex items-center justify-center">
                <img
                  src="/netarhat-logo.jpeg"
                  alt="Netarhat Betla Tourism Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-white block">
                  Netarhat Betla
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#F4A62A] block">
                  Tourism • Jharkhand
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#F8F7F2]/80 leading-relaxed max-w-md">
              Your official eco-tour guide to Jharkhand&apos;s most breathtaking hill sanctuaries and wildlife reserves.
              Specializing in personalized tours to the Queen of Chotanagpur (Netarhat) and Betla National Park.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-[#F4A62A]/40 pb-1.5 inline-block">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-[#F8F7F2]/80 font-medium">
              <li>
                <Link href="/" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> All Destinations
                </Link>
              </li>
              <li>
                <Link href="/destinations/netarhat" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Netarhat Hill Station
                </Link>
              </li>
              <li>
                <Link href="/destinations/betla" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Betla National Park
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/stays" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Recommended Stays
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-[#F4A62A]/40 pb-1.5 inline-block">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-[#F8F7F2]/80 font-medium">
              <li>
                <Link href="/gallery" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Travel Blog & Tips
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> About Our Agency
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F4A62A] transition flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#3D8B40]" /> Contact & Map
                </Link>
              </li>
              <li>
                <Link href="/admin-login" className="hover:text-[#F4A62A] transition flex items-center gap-1.5 text-xs text-[#F8F7F2]/60 hover:text-white">
                  <Lock size={11} className="text-[#F4A62A]" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-[#F4A62A]/40 pb-1.5 inline-block">
              Get in Touch
            </h3>
            <div className="space-y-2.5 text-xs text-[#F8F7F2]/80">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#F4A62A] shrink-0 mt-0.5" />
                <span>Railway Station Road, Latehar, Jharkhand 829207</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#F4A62A] shrink-0" />
                <a href="tel:6205087480" className="hover:text-[#F4A62A] font-semibold text-white tracking-wider">
                  +91 62050 87480
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-[#F4A62A] shrink-0" />
                <a href="mailto:info@netarhat.in" className="hover:text-[#F4A62A]">
                  info@netarhat.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#3D8B40] shrink-0" />
                <span>Mon - Sun: 08:00 AM - 08:00 PM</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs text-[#F4A62A] font-semibold mb-1.5">Seasonal Tour Discounts & Updates</p>
              {subscribed ? (
                <p className="text-xs text-[#3D8B40] bg-[#0c331c] p-2 rounded border border-[#3D8B40]/40">
                  Thank you for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-2.5 py-1.5 rounded bg-[#0c331c] border border-[#1b653b] text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#F4A62A] flex-1"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-3 py-1.5 rounded bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-xs transition cursor-pointer"
                  >
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F7F2]/70 gap-3">
          <p>© 2026 {siteConfig.name} (netarhat.in) • Helpline: 6205087480. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Official Eco-Tourism Portal</span>
            <span>•</span>
            <span>Latehar & Betla Circuit</span>
            <span>•</span>
            <Link href="/admin-login" className="hover:text-[#F4A62A] underline flex items-center gap-1">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
