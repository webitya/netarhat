"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Compass,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const pathname = usePathname();

  // Handle sticky scroll appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileDrawerOpen]);

  // Close drawer on path change
  useEffect(() => {
    setMobileDrawerOpen(false);
    setDestDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Destinations",
      href: "/destinations",
      hasDropdown: true,
      subItems: [
        { name: "All Destinations", href: "/destinations" },
        { name: "Netarhat (Queen of Hills)", href: "/destinations/netarhat" },
        { name: "Betla (National Park & Forts)", href: "/destinations/betla" },
      ],
    },
    { name: "Tour Packages", href: "/tours" },
    { name: "Stays", href: "/stays" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Banner with Local Credentials & Direct Helpline */}
      <header className="bg-[#0c331c] text-[#F8F7F2] text-xs py-1.5 px-4 border-b border-[#124B2A] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F4A62A]">
              <Sparkles size={13} />
              <span className="font-medium tracking-wide">Official Eco-Tour Operator • Latehar & Chotanagpur</span>
            </span>
            <span className="text-[#E5E2D7]/60">|</span>
            <span className="text-[#E5E2D7]/90 flex items-center gap-1">
              <MapPin size={12} className="text-[#3D8B40]" />
              Latehar, Jharkhand
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+919470938399"
              className="flex items-center gap-1.5 text-[#F8F7F2] hover:text-[#F4A62A] transition"
            >
              <Phone size={12} className="text-[#F4A62A]" />
              <span className="font-semibold">+91 94709 38399</span>
            </a>
            <a
              href="https://wa.me/919470938399?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20inquire%20about%20tour%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#3D8B40] hover:text-[#4ea852] font-medium transition bg-[#124B2A]/60 px-2 py-0.5 rounded"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Sticky Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#124B2A] text-white shadow-lg py-2.5"
            : "bg-[#124B2A] text-white py-3.5 border-b border-[#0c331c]/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#F4A62A] shadow-md bg-white shrink-0">
              <Image
                src="/netarhat-logo.jpeg"
                alt="Netarhat Betla Tourism Logo"
                fill
                sizes="44px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#F4A62A] transition leading-tight">
                Netarhat Betla
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-medium text-[#F4A62A] leading-tight">
                Tourism • Jharkhand
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setDestDropdownOpen(true)}
                  onMouseLeave={() => setDestDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition ${
                      isActive(link.href)
                        ? "text-[#F4A62A] bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-full pt-1.5 w-56 transition-all duration-200 ${
                      destDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-[#FFFFFF] text-[#25332B] rounded-lg shadow-xl border border-[#E5E2D7] py-2 overflow-hidden">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2.5 text-xs sm:text-sm font-medium text-[#25332B] hover:bg-[#F8F7F2] hover:text-[#124B2A] transition border-b border-[#E5E2D7]/40 last:border-0"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                    isActive(link.href)
                      ? "text-[#F4A62A] bg-white/10"
                      : "text-white/90 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/919470938399?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20book%20a%20tour"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="p-2 rounded-full bg-[#3D8B40] hover:bg-[#327335] text-white transition shadow-sm"
              title="Chat with Tour Specialist"
            >
              <MessageCircle size={18} />
            </a>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="btn-amber px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
            >
              <Calendar size={15} />
              <span>Book Tour</span>
            </button>
          </div>

          {/* Mobile Right Controls: Book Button + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="btn-amber px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open mobile menu"
              className="p-2 rounded-lg text-white hover:bg-white/10 transition"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER: OPENS FROM RIGHT TO LEFT */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel: Slide from right (translate-x-full to translate-x-0) */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#F8F7F2] z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden border-l border-[#E5E2D7] ${
          mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-[#124B2A] text-white p-4 flex items-center justify-between border-b border-[#0c331c]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#F4A62A] bg-white shrink-0">
              <Image
                src="/netarhat-logo.jpeg"
                alt="Netarhat Logo"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-white leading-tight">Netarhat Betla</h2>
              <p className="text-[10px] text-[#F4A62A] tracking-wider uppercase font-medium">Eco Tourism</p>
            </div>
          </div>

          <button
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Close mobile navigation drawer"
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name} className="py-0.5">
              {link.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                      isActive(link.href)
                        ? "bg-[#124B2A] text-white"
                        : "text-[#25332B] hover:bg-[#E5E2D7]/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Compass size={17} className={isActive(link.href) ? "text-[#F4A62A]" : "text-[#124B2A]"} />
                      {link.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${destDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Submenu */}
                  {destDropdownOpen && (
                    <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-[#124B2A]/20 ml-4 mt-1">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className="block px-3 py-2 text-xs font-medium text-[#25332B] hover:text-[#124B2A] hover:bg-white rounded transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-[#124B2A] text-white"
                      : "text-[#25332B] hover:bg-[#E5E2D7]/50"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              )}
            </div>
          ))}

          {/* Quick CTA Actions in Mobile Menu */}
          <div className="pt-4 pb-2 space-y-2.5 border-t border-[#E5E2D7] mt-4">
            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                setBookingModalOpen(true);
              }}
              className="w-full py-2.5 rounded-lg bg-[#F4A62A] text-[#124B2A] font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar size={16} />
              <span>Book Tour Package</span>
            </button>

            <a
              href="https://wa.me/919470938399?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20am%20interested%20in%20a%20tour%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#3D8B40] hover:bg-[#327335] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Contact Details Card in Drawer */}
          <div className="mt-4 p-3.5 bg-white rounded-lg border border-[#E5E2D7] text-xs text-[#25332B] space-y-2">
            <div className="font-bold text-[#124B2A] flex items-center gap-1.5">
              <Phone size={13} className="text-[#F4A62A]" />
              <span>Direct Support & Booking:</span>
            </div>
            <p className="font-mono font-semibold text-[#124B2A]">+91 94709 38399</p>
            <p className="text-[11px] text-[#4e5e54]">Railway Station Road, Latehar, Jharkhand</p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#E5E2D7]/50 border-t border-[#E5E2D7] text-center text-[11px] text-[#4e5e54]">
          Netarhat Betla Tourism © 2026
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
