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
  MessageCircle,
  Users,
  TreePine,
  Binoculars,
  Sparkles,
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
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Photo with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/netarhat_sunrise.jpg"
            alt="Sunrise over Netarhat hills viewpoint"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#124B2A] via-[#124B2A]/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
          {/* Nature Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-[#F4A62A] mb-6 shadow-sm">
            <TreePine size={16} className="text-[#3D8B40]" />
            <span>Jharkhand’s Premier Hill Station & Wildlife Sanctuary</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-md">
            Netarhat Betla Tourism
          </h1>

          <p className="font-sans text-lg sm:text-2xl text-[#F8F7F2]/90 max-w-3xl mx-auto font-light leading-relaxed mb-8 drop-shadow">
            Discover the misty pine highlands of the <span className="font-semibold text-white">Queen of Chotanagpur</span> and the untamed safaris of <span className="font-semibold text-white">Betla National Park</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
              <Compass size={18} className="text-[#F4A62A]" />
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
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D7] bg-[#F8F7F2] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
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
                  className="w-full p-2.5 rounded-lg border border-[#E5E2D7] bg-[#F8F7F2] text-sm text-[#25332B] focus:outline-none focus:ring-2 focus:ring-[#124B2A]"
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#124B2A] mb-4">
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
                  <h3 className="font-serif text-xl font-bold text-[#FFFFFF]">Netarhat — The Queen of Chotanagpur</h3>
                  <p className="text-xs text-[#E5E2D7]">Pine forests, cool morning mist & legendary sunsets</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-[#25332B] text-sm leading-relaxed">
                  Perched high upon the Chotanagpur plateau, Netarhat invites you to tranquil British-era pine tracks, the cascading Upper Ghaghri waterfalls, and world-renowned sunsets at Magnolia Point that bathe endless forested ridges in radiant amber glow.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#124B2A] font-medium pt-2 border-t border-[#E5E2D7]">
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
                  <h3 className="font-serif text-xl font-bold text-[#FFFFFF]">Betla National Park & Forts</h3>
                  <p className="text-xs text-[#E5E2D7]">Wild Asian elephants, safari trails & 16th-century ruins</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-[#25332B] text-sm leading-relaxed">
                  One of India’s pioneering wildlife reserves, Betla combines rich biodiversity with mysterious archaeological history. Embark on early morning open-top jeep safaris to track elephant herds, bison, and deer, then journey deep into sal canopies to explore the ancient stone ramparts of the Palamau Forts.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#124B2A] font-medium pt-2 border-t border-[#E5E2D7]">
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

      {/* 3. FEATURED TOUR PACKAGES (Listing with ItemList concept) */}
      <section id="packages" className="py-16 sm:py-20 bg-white border-y border-[#E5E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
                Handcrafted Itineraries from Ranchi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#124B2A]">
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
                    <h3 className="font-serif text-xl font-bold text-[#124B2A] group-hover:text-[#3D8B40] transition mb-1 leading-snug">
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
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
                <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#124B2A] mb-3">
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
                  <p className="font-serif font-bold text-[#124B2A] text-base">{t.name}</p>
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
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#124B2A]">
            Planning a Family Holiday or Corporate Retreat to Netarhat?
          </h2>
          <p className="text-[#4e5e54] text-base max-w-2xl mx-auto">
            Tell us your travel dates, group size, and preferences. Our Latehar travel desk will create a customized package with vehicle, stays, and safari permits within 2 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openBookingFor("Custom Netarhat & Betla Tour Package")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-base shadow-md transition cursor-pointer"
            >
              Request Custom Quote
            </button>
            <a
              href="https://wa.me/919470938399?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20want%20to%20plan%20a%20custom%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#3D8B40] hover:bg-[#327335] text-white font-bold text-base shadow-md transition flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
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
