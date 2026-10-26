"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, User, AlertCircle, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch {
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8F7F2]">
      {/* Left Column: Full-Width Cinematic Brand Visuals (Desktop) */}
      <div className="relative w-full lg:w-[58%] min-h-[340px] lg:min-h-screen flex items-center justify-center p-8 sm:p-12 lg:p-16 overflow-hidden text-white">
        <Image
          src="/images/netarhat_sunrise.jpg"
          alt="Sunrise over Netarhat highlands"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#124B2A] via-[#124B2A]/80 to-[#0c331c]/70 backdrop-blur-xs" />

        <div className="relative z-10 max-w-xl text-left space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#F4A62A] bg-white shadow-lg shrink-0 flex items-center justify-center">
              <img
                src="/netarhat-logo.jpeg"
                alt="Netarhat Betla Tourism Logo"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white block leading-tight">
                Netarhat Betla
              </span>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block">
                Tourism • Jharkhand
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Official Administration & Booking Console
            </h1>
            <p className="text-sm sm:text-base text-[#F8F7F2]/90 leading-relaxed font-light">
              Secure internal portal for managing customer holiday reservations, safari requests, customized Latehar itineraries, and hotel bookings across Netarhat and Betla.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#E5E2D7]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#3D8B40] shrink-0" />
              <span>Protected Session Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#3D8B40] shrink-0" />
              <span>Direct Latehar Desk Control</span>
            </div>
          </div>

          <div className="text-xs text-[#E5E2D7]/80 pt-2">
            Latehar Operations Desk: <strong className="text-white">+91 62050 87480</strong> • Railway Station Road, Latehar
          </div>
        </div>
      </div>

      {/* Right Column: Full-Height Clean Authentication Console */}
      <div className="w-full lg:w-[42%] flex flex-col justify-between bg-white p-8 sm:p-12 lg:p-16 border-l border-[#E5E2D7]">
        <div className="max-w-md w-full mx-auto my-auto py-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#124B2A] tracking-tight mb-2">
              Sign In to Admin
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e54] leading-relaxed">
              Enter your authorized administrator credentials to manage tour inquiries, client bookings, and system status.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[4px] flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3 text-[#4e5e54]" />
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-[#E5E2D7] rounded-[4px] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-[#4e5e54]" />
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-[#E5E2D7] rounded-[4px] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#124B2A] hover:bg-[#0c331c] text-white font-bold text-sm rounded-[4px] transition flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <ShieldCheck size={18} className="text-[#F4A62A]" />
              <span>{loading ? "Authenticating..." : "Sign In to Management Console"}</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E5E2D7] text-center">
            <Link
              href="/"
              className="text-xs text-[#3D8B40] hover:text-[#124B2A] font-semibold underline inline-flex items-center gap-1"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#75867c] pt-4">
          © 2026 Netarhat Betla Tourism • Official Latehar & Chotanagpur Circuit Desk
        </div>
      </div>
    </div>
  );
}
