"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Compass,
  MapPin,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileDrawerOpen]);

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
              <ShieldCheck size={14} className="text-[#3D8B40]" />
              <span className="font-semibold tracking-wide">Official Eco-Tour Operator • Latehar & Chotanagpur</span>
            </span>
            <span className="text-[#E5E2D7]/60">|</span>
            <span className="text-[#E5E2D7]/90 flex items-center gap-1">
              <MapPin size={12} className="text-[#3D8B40]" />
              Latehar, Jharkhand
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:6205087480"
              className="flex items-center gap-1.5 text-[#F8F7F2] hover:text-[#F4A62A] transition"
            >
              <Phone size={12} className="text-[#F4A62A]" />
              <span className="font-semibold tracking-wider">+91 62050 87480</span>
            </a>
            <a
              href="https://wa.me/916205087480?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20inquire%20about%20tour%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-white font-semibold transition bg-[#124B2A]/80 px-2.5 py-0.5 rounded"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.73 7.39C8.56 7.39 8.28 7.45 8.05 7.7C7.82 7.95 7.18 8.55 7.18 9.77C7.18 10.99 8.07 12.16 8.2 12.33C8.32 12.5 9.94 15.01 12.44 16.08C13.03 16.34 13.5 16.5 13.86 16.61C14.46 16.8 15.01 16.78 15.44 16.71C15.93 16.64 16.94 16.1 17.15 15.51C17.36 14.92 17.36 14.42 17.29 14.31C17.23 14.2 17.06 14.13 16.81 14.01C16.55 13.88 15.3 13.27 15.07 13.18C14.84 13.1 14.67 13.06 14.5 13.31C14.33 13.55 13.86 14.13 13.71 14.3C13.57 14.47 13.43 14.49 13.17 14.37C12.92 14.24 12.1 13.97 11.13 13.11C10.37 12.44 9.86 11.61 9.71 11.36C9.56 11.11 9.7 10.97 9.83 10.84C9.94 10.73 10.08 10.55 10.21 10.4C10.34 10.25 10.38 10.14 10.47 9.97C10.55 9.8 10.51 9.66 10.45 9.53C10.38 9.41 9.9 8.22 9.69 7.74C9.49 7.27 9.28 7.33 9.12 7.32C8.98 7.32 8.85 7.39 8.73 7.39Z"/>
              </svg>
              <span>WhatsApp</span>
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
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#F4A62A] shadow-md bg-white shrink-0 flex items-center justify-center">
              <img
                src="/netarhat-logo.jpeg"
                alt="Netarhat Betla Tourism Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#F4A62A] transition leading-tight">
                Netarhat Betla
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#F4A62A] leading-tight">
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
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition ${
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
                          className="block px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#25332B] hover:bg-[#F8F7F2] hover:text-[#124B2A] transition border-b border-[#E5E2D7]/40 last:border-0"
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
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition ${
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
              href="https://wa.me/916205087480?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20book%20a%20tour"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp 6205087480"
              className="p-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white transition shadow-sm flex items-center justify-center"
              title="Chat with Tour Specialist (+91 62050 87480)"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.73 7.39C8.56 7.39 8.28 7.45 8.05 7.7C7.82 7.95 7.18 8.55 7.18 9.77C7.18 10.99 8.07 12.16 8.2 12.33C8.32 12.5 9.94 15.01 12.44 16.08C13.03 16.34 13.5 16.5 13.86 16.61C14.46 16.8 15.01 16.78 15.44 16.71C15.93 16.64 16.94 16.1 17.15 15.51C17.36 14.92 17.36 14.42 17.29 14.31C17.23 14.2 17.06 14.13 16.81 14.01C16.55 13.88 15.3 13.27 15.07 13.18C14.84 13.1 14.67 13.06 14.5 13.31C14.33 13.55 13.86 14.13 13.71 14.3C13.57 14.47 13.43 14.49 13.17 14.37C12.92 14.24 12.1 13.97 11.13 13.11C10.37 12.44 9.86 11.61 9.71 11.36C9.56 11.11 9.7 10.97 9.83 10.84C9.94 10.73 10.08 10.55 10.21 10.4C10.34 10.25 10.38 10.14 10.47 9.97C10.55 9.8 10.51 9.66 10.45 9.53C10.38 9.41 9.9 8.22 9.69 7.74C9.49 7.27 9.28 7.33 9.12 7.32C8.98 7.32 8.85 7.39 8.73 7.39Z"/>
              </svg>
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
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#F4A62A] bg-white shrink-0 flex items-center justify-center">
              <img
                src="/netarhat-logo.jpeg"
                alt="Netarhat Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-base text-white leading-tight">Netarhat Betla</h2>
              <p className="text-[10px] text-[#F4A62A] tracking-wider uppercase font-semibold">Eco Tourism</p>
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
                          className="block px-3 py-2 text-xs font-semibold text-[#25332B] hover:text-[#124B2A] hover:bg-white rounded transition"
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
              href="https://wa.me/916205087480?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20am%20interested%20in%20a%20tour%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.73 7.39C8.56 7.39 8.28 7.45 8.05 7.7C7.82 7.95 7.18 8.55 7.18 9.77C7.18 10.99 8.07 12.16 8.2 12.33C8.32 12.5 9.94 15.01 12.44 16.08C13.03 16.34 13.5 16.5 13.86 16.61C14.46 16.8 15.01 16.78 15.44 16.71C15.93 16.64 16.94 16.1 17.15 15.51C17.36 14.92 17.36 14.42 17.29 14.31C17.23 14.2 17.06 14.13 16.81 14.01C16.55 13.88 15.3 13.27 15.07 13.18C14.84 13.1 14.67 13.06 14.5 13.31C14.33 13.55 13.86 14.13 13.71 14.3C13.57 14.47 13.43 14.49 13.17 14.37C12.92 14.24 12.1 13.97 11.13 13.11C10.37 12.44 9.86 11.61 9.71 11.36C9.56 11.11 9.7 10.97 9.83 10.84C9.94 10.73 10.08 10.55 10.21 10.4C10.34 10.25 10.38 10.14 10.47 9.97C10.55 9.8 10.51 9.66 10.45 9.53C10.38 9.41 9.9 8.22 9.69 7.74C9.49 7.27 9.28 7.33 9.12 7.32C8.98 7.32 8.85 7.39 8.73 7.39Z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Contact Details Card in Drawer */}
          <div className="mt-4 p-3.5 bg-white rounded-lg border border-[#E5E2D7] text-xs text-[#25332B] space-y-2">
            <div className="font-bold text-[#124B2A] flex items-center gap-1.5">
              <Phone size={13} className="text-[#F4A62A]" />
              <span>Direct Support & Booking:</span>
            </div>
            <p className="font-mono font-bold text-[#124B2A] text-sm">+91 62050 87480</p>
            <p className="text-[11px] text-[#4e5e54]">Railway Station Road, Latehar, Jharkhand</p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#E5E2D7]/50 border-t border-[#E5E2D7] text-center text-[11px] text-[#4e5e54]">
          Netarhat Betla Tourism • Helpline: 6205087480
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
