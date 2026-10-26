"use client";

import { useState } from "react";
import Image from "next/image";
import { stays } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingModal from "@/components/BookingModal";
import { Star, MapPin, CheckCircle, BedDouble, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function StaysPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStay, setSelectedStay] = useState("");

  const handleBook = (stayName) => {
    setSelectedStay(`Stay Booking: ${stayName}`);
    setModalOpen(true);
  };

  // LodgingBusiness JSON-LD schema
  const staysSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Recommended Stays & Hotels in Netarhat and Betla",
    "itemListElement": stays.map((stay, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LodgingBusiness",
        "name": stay.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": stay.location,
          "addressRegion": "Jharkhand",
          "addressCountry": "IN",
        },
        "priceRange": stay.pricePerNight,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(staysSchema) }}
      />

      <Breadcrumbs items={[{ label: "Recommended Stays", href: "/stays" }]} />

      {/* Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Recommended Stays in Netarhat & Betla
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Stay in verified British-era colonial heritage bungalows, hilltop sunrise view lodges, and forest eco-resorts with hot water, delicious meals, and serene pine views.
          </p>
        </div>
      </section>

      {/* Stays Listing */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stays.map((stay) => (
            <div
              key={stay.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-lg transition duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={stay.image}
                  alt={stay.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#124B2A] text-white text-xs font-semibold px-2.5 py-1 rounded shadow">
                  {stay.type}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded">
                  <Star size={13} className="text-[#F4A62A] fill-[#F4A62A]" />
                  <span className="font-bold">{stay.rating}</span>
                  <span className="text-[#E5E2D7]">({stay.reviews} reviews)</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-[#3D8B40] font-semibold mb-1">
                    <MapPin size={13} />
                    <span>{stay.location}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#124B2A] mb-2">{stay.name}</h2>
                  <p className="text-xs sm:text-sm text-[#25332B] leading-relaxed mb-4">
                    {stay.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-[#E5E2D7]">
                    <span className="text-[11px] uppercase font-bold text-[#124B2A] block mb-1">
                      Key Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stay.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[#F8F7F2] text-[#4e5e54] px-2.5 py-1 rounded-md border border-[#E5E2D7]"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E2D7] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#4e5e54] block">Average per night</span>
                    <span className="text-xl font-bold text-[#124B2A]">{stay.pricePerNight}</span>
                    <span className="text-[11px] text-[#4e5e54]"> / room</span>
                  </div>

                  <button
                    onClick={() => handleBook(stay.name)}
                    className="py-2.5 px-5 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedStay}
      />
    </div>
  );
}
