"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Compass,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Phone,
  Users,
  TreePine,
  Binoculars,
} from "lucide-react";
import { tourPackages, whyChooseUs, testimonials, siteConfig } from "@/lib/data";
import BookingModal from "@/components/BookingModal";

export default function HomePage() {
  const [selectedTour, setSelectedTour] = useState("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Search Widget State
  const [searchDestination, setSearchDestination] = useState("all");
  const [searchDuration, setSearchDuration] = useState("all");

  const openBookingFor = (tourTitle) => {
    setSelectedTour(tourTitle);
    setBookingModalOpen(true);
  };

  const filteredPackages = tourPackages.filter((pkg) => {
    const matchDest =
      searchDestination === "all" ||
      pkg.destination.toLowerCase().includes(searchDestination.toLowerCase());
    const matchDur =
      searchDuration === "all" ||
      (searchDuration === "2n3d" && pkg.slug.includes("2n3d")) ||
      (searchDuration === "3n4d" && pkg.slug.includes("3n4d")) ||
      (searchDuration === "4n5d" && pkg.slug.includes("4n5d"));
    return matchDest && matchDur;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Photo with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/netarhat_sunrise.jpg"
            alt="Sunrise over Netarhat hills viewpoint"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#124B2A] via-[#124B2A]/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Authentic Local Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#124B2A]/80 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-[#F4A62A] mb-5 shadow-sm">
            <ShieldCheck size={15} className="text-[#3D8B40]" />
            <span>Govt. Approved Local Operator • Latehar & Netarhat Circuit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 drop-shadow-md">
            Netarhat Betla Tourism
          </h1>

          <p className="text-base sm:text-xl text-[#F8F7F2]/90 max-w-3xl mx-auto font-normal leading-relaxed mb-8 drop-shadow">
            Discover the misty pine highlands of the <span className="font-semibold text-white">Queen of Chotanagpur</span> and the untamed safaris of <span className="font-semibold text-white">Betla National Park</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => openBookingFor("Ranchi – Netarhat – Ranchi (2N/3D)")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-base shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              <span>Book Tour Package</span>
            </button>

            <Link
              href="/destinations"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-base transition flex items-center justify-center gap-2"
            >
              <MapPin size={18} className="text-[#F4A62A]" />
              <span>Explore Destinations</span>
            </Link>
          </div>

          {/* Quick Filter Bar */}
          <div className="bg-[#FFFFFF] text-[#25332B] p-4 sm:p-5 rounded-xl shadow-2xl border border-[#E5E2D7] max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div className="text-left">
                <label className="block text-xs uppercase font-bold text-[#124B2A] tracking-wider mb-1">
                  Destination
                </label>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D7] bg-[#F8F7F2] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] font-medium"
                >
                  <option value="all">All Destinations (Netarhat & Betla)</option>
                  <option value="netarhat">Netarhat (Queen of Chotanagpur)</option>
                  <option value="betla">Betla National Park (Wildlife)</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-xs uppercase font-bold text-[#124B2A] tracking-wider mb-1">
                  Duration
                </label>
                <select
                  value={searchDuration}
                  onChange={(e) => setSearchDuration(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D7] bg-[#F8F7F2] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A] font-medium"
                >
                  <option value="all">Any Duration</option>
                  <option value="2n3d">2 Nights / 3 Days</option>
                  <option value="3n4d">3 Nights / 4 Days</option>
                  <option value="4n5d">4 Nights / 5 Days (Expedition)</option>
                </select>
              </div>

              <div className="pt-2 sm:pt-5">
                <a
                  href="#packages"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-bold text-sm transition flex items-center justify-center gap-2"
                >
                  <span>View Matching Tours</span>
                  <ArrowRight size={16} className="text-[#F4A62A]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS SPOTLIGHT: NETARHAT & BETLA DUAL ATTRACTION */}
      <section className="py-16 sm:py-20 bg-[#F8F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#3D8B40] block mb-2">
              Two Unmatched Wonders of Jharkhand
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#124B2A] tracking-tight mb-3">
              Misty Mountain Heights & Untamed Tiger Reserve
            </h2>
            <p className="text-[#4e5e54] text-base leading-relaxed">
              Separated by picturesque mountain ghats, Netarhat and Betla together form Eastern India’s most rejuvenating eco-tourism corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Netarhat Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#E5E2D7] transition duration-300 flex flex-col">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src="/images/magnolia_sunset.jpg"
                  alt="Magnolia sunset point vista in Netarhat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#124B2A] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  Elevation: 1,128m
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs text-white p-3 rounded-lg">
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Netarhat — The Queen of Chotanagpur</h3>
                  <p className="text-xs text-[#E5E2D7]">Pine forests, cool morning mist & legendary sunsets</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-[#25332B] text-sm leading-relaxed">
                  Perched high upon the Chotanagpur plateau, Netarhat invites you to tranquil British-era pine tracks, the cascading Upper Ghaghri waterfalls, and world-renowned sunsets at Magnolia Point that bathe endless forested ridges in radiant amber glow.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#124B2A] font-semibold pt-2 border-t border-[#E5E2D7]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> Magnolia Sunset Point
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> Upper Ghaghri Falls
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> Fragrant Pine Woods
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> Historic Netarhat School
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/destinations/netarhat"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#124B2A] hover:text-[#3D8B40] transition"
                  >
                    <span>Discover Netarhat Attractions</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Betla Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#E5E2D7] transition duration-300 flex flex-col">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src="/images/betla_safari.jpg"
                  alt="Elephant safari in Betla National Park"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#3D8B40] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  Palamau Tiger Reserve
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs text-white p-3 rounded-lg">
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Betla National Park & Forts</h3>
                  <p className="text-xs text-[#E5E2D7]">Wild Asian elephants, safari trails & 16th-century ruins</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-[#25332B] text-sm leading-relaxed">
                  One of India’s pioneering wildlife reserves, Betla combines rich biodiversity with mysterious archaeological history. Embark on early morning open-top jeep safaris to track elephant herds, bison, and deer, then journey deep into sal canopies to explore the ancient stone ramparts of the Palamau Forts.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#124B2A] font-semibold pt-2 border-t border-[#E5E2D7]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> 4x4 Core Jungle Safari
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> 16th-Century Palamau Forts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> Elephant Herd Tracking
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-[#3D8B40]" /> Certified Forest Naturalist
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/destinations/betla"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#124B2A] hover:text-[#3D8B40] transition"
                  >
                    <span>Discover Betla Safari Guide</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED TOUR PACKAGES */}
      <section id="packages" className="py-16 sm:py-20 bg-white border-y border-[#E5E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
                Handcrafted Itineraries from Ranchi
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#124B2A] tracking-tight">
                Our Featured Tour Packages
              </h2>
              <p className="text-[#4e5e54] text-sm sm:text-base mt-2 max-w-2xl">
                All packages include verified deluxe accommodations, delicious traditional meals, private sanitized SUV transport, and certified local guides.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#124B2A] hover:text-[#3D8B40] transition"
              >
                <span>View All Tour Packages</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#F8F7F2] rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#124B2A] text-white text-xs font-semibold px-2.5 py-1 rounded shadow">
                    {pkg.duration}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#F4A62A] text-[#124B2A] text-xs font-bold px-2.5 py-1 rounded shadow">
                    {pkg.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded">
                    <Star size={13} className="text-[#F4A62A] fill-[#F4A62A]" />
                    <span className="font-bold">{pkg.rating}</span>
                    <span className="text-[#E5E2D7]">({pkg.reviewsCount})</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#124B2A] group-hover:text-[#3D8B40] transition mb-1 leading-snug">
                      <Link href={`/tours/${pkg.slug}`}>{pkg.title}</Link>
                    </h3>
                    <p className="text-xs text-[#3D8B40] font-semibold mb-3">{pkg.subtitle}</p>

                    <p className="text-[#25332B] text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                      {pkg.overview}
                    </p>

                    {/* Highlights Preview */}
                    <div className="space-y-1.5 mb-5">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#4e5e54]">
                          <CheckCircle size={13} className="text-[#3D8B40] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-[#E5E2D7]">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-[#4e5e54] block">Starting from</span>
                        <span className="text-xl font-bold text-[#124B2A]">
                          ₹{pkg.startingPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] text-[#4e5e54]"> / person</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#3D8B40] bg-[#3D8B40]/10 px-2 py-0.5 rounded">
                        Hotels + SUV + Meals
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/tours/${pkg.slug}`}
                        className="py-2.5 px-3 rounded-lg border border-[#124B2A] text-[#124B2A] font-bold text-xs text-center hover:bg-[#124B2A] hover:text-white transition"
                      >
                        View Itinerary
                      </Link>

                      <button
                        onClick={() => openBookingFor(pkg.title)}
                        className="py-2.5 px-3 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-xs text-center shadow-sm transition cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE NETARHAT BETLA TOURISM */}
      <section className="py-16 sm:py-20 bg-[#124B2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
              Credibility & Local Expertise
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Why Travel With Netarhat Betla Tourism?
            </h2>
            <p className="text-[#F8F7F2]/80 text-sm sm:text-base leading-relaxed">
              Based directly in Latehar at the threshold of Netarhat and Betla, we are local stewards dedicated to responsible tourism, safety, and authentic nature experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-[#0c331c] p-6 rounded-xl border border-[#1b653b] hover:border-[#F4A62A] transition duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#3D8B40]/20 text-[#F4A62A] flex items-center justify-center mb-4">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#F8F7F2]/75 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-[#F8F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#3D8B40] block mb-2">
              Guest Experiences
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#124B2A] tracking-tight mb-3">
              What Our Travelers Say
            </h2>
            <p className="text-[#4e5e54] text-sm sm:text-base">
              Verified reviews from families, couples, and nature lovers who explored Netarhat and Betla with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-[#E5E2D7] shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F4A62A] mb-3">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={16} className="fill-[#F4A62A]" />
                    ))}
                  </div>
                  <p className="text-[#25332B] text-sm italic leading-relaxed mb-4">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2D7]">
                  <p className="font-bold text-[#124B2A] text-base">{t.name}</p>
                  <p className="text-xs text-[#4e5e54]">{t.location}</p>
                  <p className="text-[11px] text-[#3D8B40] font-medium mt-1">Tour: {t.tour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / CUSTOM TRIP BANNER */}
      <section className="py-16 bg-[#F2EFE8] border-t border-[#E5E2D7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#124B2A]/10 text-[#124B2A] text-xs font-bold uppercase tracking-wider">
            Personalized Mountain & Safari Itineraries
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#124B2A] tracking-tight">
            Planning a Family Holiday or Corporate Retreat to Netarhat?
          </h2>
          <p className="text-[#4e5e54] text-base max-w-2xl mx-auto">
            Tell us your travel dates, group size, and preferences. Call our Latehar desk directly at{" "}
            <strong className="text-[#124B2A]">6205087480</strong> or request a quick callback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openBookingFor("Custom Netarhat & Betla Tour Package")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-base shadow-md transition cursor-pointer"
            >
              Request Custom Quote
            </button>
            <a
              href="https://wa.me/916205087480?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20plan%20a%20custom%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base shadow-md transition flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.73 7.39C8.56 7.39 8.28 7.45 8.05 7.7C7.82 7.95 7.18 8.55 7.18 9.77C7.18 10.99 8.07 12.16 8.2 12.33C8.32 12.5 9.94 15.01 12.44 16.08C13.03 16.34 13.5 16.5 13.86 16.61C14.46 16.8 15.01 16.78 15.44 16.71C15.93 16.64 16.94 16.1 17.15 15.51C17.36 14.92 17.36 14.42 17.29 14.31C17.23 14.2 17.06 14.13 16.81 14.01C16.55 13.88 15.3 13.27 15.07 13.18C14.84 13.1 14.67 13.06 14.5 13.31C14.33 13.55 13.86 14.13 13.71 14.3C13.57 14.47 13.43 14.49 13.17 14.37C12.92 14.24 12.1 13.97 11.13 13.11C10.37 12.44 9.86 11.61 9.71 11.36C9.56 11.11 9.7 10.97 9.83 10.84C9.94 10.73 10.08 10.55 10.21 10.4C10.34 10.25 10.38 10.14 10.47 9.97C10.55 9.8 10.51 9.66 10.45 9.53C10.38 9.41 9.9 8.22 9.69 7.74C9.49 7.27 9.28 7.33 9.12 7.32C8.98 7.32 8.85 7.39 8.73 7.39Z"/>
              </svg>
              <span>WhatsApp 6205087480</span>
            </a>
          </div>
        </div>
      </section>

      {/* Reusable Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedPackage={selectedTour}
      />
    </div>
  );
}
