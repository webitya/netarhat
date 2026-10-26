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
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E5E2D7] shadow-lg rounded-[4px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#124B2A] text-white p-6 text-center border-b border-[#0c331c]">
          <div className="w-14 h-14 mx-auto rounded-full overflow-hidden border-2 border-[#F4A62A] bg-white mb-3 shadow flex items-center justify-center">
            <img
              src="/netarhat-logo.jpeg"
              alt="Netarhat Betla Tourism Logo"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Netarhat Betla Tourism
          </h1>
          <p className="text-xs text-[#E5E2D7]/80 mt-1">
            Authenticate to access dashboard, inquiries & bookings
          </p>
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[3px] flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-[3px] text-xs sm:text-sm text-[#25332B] focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#124B2A] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-2.5 text-[#4e5e54]" />
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#E5E2D7] rounded-[3px] text-xs sm:text-sm text-[#25332B] focus:outline-none focus:ring-1 focus:ring-[#124B2A]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#124B2A] hover:bg-[#0c331c] text-white font-bold text-xs sm:text-sm rounded-[3px] transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <ShieldCheck size={16} className="text-[#F4A62A]" />
              <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs text-[#3D8B40] hover:text-[#124B2A] font-semibold underline"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
