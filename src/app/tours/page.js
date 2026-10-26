"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { tourPackages } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingModal from "@/components/BookingModal";
import { Star, CheckCircle, Clock, Calendar, ArrowRight, Filter } from "lucide-react";

export default function ToursPage() {
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState("");

  const filtered = tourPackages.filter((pkg) => {
    if (filter === "all") return true;
    if (filter === "netarhat") return pkg.destination.toLowerCase().includes("netarhat") && !pkg.destination.toLowerCase().includes("betla");
    if (filter === "betla") return pkg.destination.toLowerCase().includes("betla");
    if (filter === "combo") return pkg.destination.toLowerCase().includes("betla") && pkg.destination.toLowerCase().includes("netarhat");
    return true;
  });

  const openBooking = (tour) => {
    setSelectedTour(tour);
    setModalOpen(true);
  };

  // ItemList structured data for tour listings
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jharkhand Tour Packages — Netarhat & Betla",
    "itemListElement": tourPackages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://netarhat.in/tours/${pkg.slug}`,
      "name": pkg.title,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Breadcrumbs items={[{ label: "Tour Packages", href: "/tours" }]} />

      {/* Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Tour Packages from Ranchi
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            All our tour packages include verified deluxe hotel stays, sanitized private AC vehicles with experienced hill drivers, delicious meals, and certified local guides.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Listing */}
      <section className="py-16 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === "all"
                ? "bg-[#124B2A] text-white shadow-sm"
                : "bg-white text-[#25332B] border border-[#E5E2D7] hover:bg-[#F8F7F2]"
            }`}
          >
            All Packages ({tourPackages.length})
          </button>
          <button
            onClick={() => setFilter("netarhat")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === "netarhat"
                ? "bg-[#124B2A] text-white shadow-sm"
                : "bg-white text-[#25332B] border border-[#E5E2D7] hover:bg-[#F8F7F2]"
            }`}
          >
            Netarhat Hill Retreats
          </button>
          <button
            onClick={() => setFilter("betla")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === "betla"
                ? "bg-[#124B2A] text-white shadow-sm"
                : "bg-white text-[#25332B] border border-[#E5E2D7] hover:bg-[#F8F7F2]"
            }`}
          >
            Betla Wildlife & Safari
          </button>
          <button
            onClick={() => setFilter("combo")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === "combo"
                ? "bg-[#124B2A] text-white shadow-sm"
                : "bg-white text-[#25332B] border border-[#E5E2D7] hover:bg-[#F8F7F2]"
            }`}
          >
            Netarhat + Betla Combo
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded">
                  <Star size={13} className="text-[#F4A62A] fill-[#F4A62A]" />
                  <span className="font-bold">{pkg.rating}</span>
                  <span className="text-[#E5E2D7]">({pkg.reviewsCount} reviews)</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded font-medium">
                  {pkg.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#124B2A] group-hover:text-[#3D8B40] transition mb-1 leading-snug">
                    <Link href={`/tours/${pkg.slug}`}>{pkg.title}</Link>
                  </h2>
                  <p className="text-xs text-[#3D8B40] font-semibold mb-3">{pkg.subtitle}</p>

                  <p className="text-[#25332B] text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-5">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#4e5e54]">
                        <CheckCircle size={13} className="text-[#3D8B40] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="pt-4 border-t border-[#E5E2D7]">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-[#4e5e54] block">All-Inclusive from</span>
                      <span className="text-xl font-bold text-[#124B2A]">
                        ₹{pkg.startingPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] text-[#4e5e54]"> / pax</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#3D8B40] bg-[#3D8B40]/10 px-2 py-0.5 rounded">
                      Hotels + SUV + Safari
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/tours/${pkg.slug}`}
                      className="py-2.5 px-3 rounded-lg border border-[#124B2A] text-[#124B2A] font-bold text-xs text-center hover:bg-[#124B2A] hover:text-white transition"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => openBooking(pkg.title)}
                      className="py-2.5 px-3 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-xs text-center shadow-sm transition cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedTour}
      />
    </div>
  );
}
