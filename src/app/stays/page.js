"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { stays as initialStays } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingModal from "@/components/BookingModal";
import { Star, MapPin, ShieldCheck, Coffee, PhoneCall, HelpCircle } from "lucide-react";

export default function StaysPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStay, setSelectedStay] = useState("");
  const [staysList, setStaysList] = useState(initialStays);

  useEffect(() => {
    fetch("/api/admin/stays")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.stays) && data.stays.length > 0) {
          setStaysList(data.stays);
        }
      })
      .catch(() => {});
  }, []);

  const handleBook = (stayName) => {
    setSelectedStay(`Stay Booking: ${stayName}`);
    setModalOpen(true);
  };

  // LodgingBusiness JSON-LD schema
  const staysSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Recommended Stays & Hotels in Netarhat and Betla",
    "itemListElement": staysList.map((stay, index) => ({
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
    <div className="min-h-screen bg-[#F8F7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(staysSchema) }}
      />

      <Breadcrumbs items={[{ label: "Recommended Stays", href: "/stays" }]} />

      {/* Hero Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-white tracking-tight">
            Recommended Stays in Netarhat & Betla
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Stay in verified British-era colonial heritage bungalows, hilltop sunrise view lodges, and forest eco-resorts with hot water, delicious meals, and serene pine views.
          </p>
        </div>
      </section>

      {/* 4 Cards in One Row on Desktop / Fully Responsive Stays Grid */}
      <section className="py-12 sm:py-16 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#124B2A]">
              Featured Accommodations
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e54] mt-1">
              Showing {staysList.length} handpicked government & private properties with verified local hospitality.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#124B2A] bg-white px-3.5 py-2 rounded-lg border border-[#E5E2D7] shadow-xs shrink-0">
            <ShieldCheck size={16} className="text-[#3D8B40]" />
            <span>100% Pre-inspected Clean Rooms</span>
          </div>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staysList.map((stay) => (
            <article
              key={stay.id || stay._id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Container with 16:10 ratio suitable for 4 in a row */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                <Image
                  src={stay.image}
                  alt={stay.alt || stay.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 25vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Rating badge */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md shadow-xs">
                  <Star size={12} className="text-[#F4A62A] fill-[#F4A62A]" />
                  <span className="font-bold">{stay.rating}</span>
                  <span className="text-white/80 text-[10px]">({stay.reviews})</span>
                </div>

                {/* Verified badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#124B2A]/85 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-xs">
                  <ShieldCheck size={11} className="text-[#F4A62A]" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Location & Type */}
                  <div className="flex items-center justify-between text-xs text-[#3D8B40] font-semibold mb-1.5 gap-2">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={13} className="shrink-0" />
                      <span className="truncate">{stay.location}</span>
                    </span>
                    <span className="text-[11px] font-medium text-[#4e5e54] bg-[#F8F7F2] px-2 py-0.5 rounded border border-[#E5E2D7] shrink-0">
                      {stay.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base sm:text-lg font-bold text-[#124B2A] mb-1.5 line-clamp-1 group-hover:text-[#3D8B40] transition-colors"
                    title={stay.name}
                  >
                    {stay.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#25332B] leading-relaxed line-clamp-2 min-h-[32px] mb-3">
                    {stay.description}
                  </p>

                  {/* Amenities */}
                  <div className="pt-2.5 border-t border-[#E5E2D7]">
                    <span className="text-[10px] uppercase font-bold text-[#124B2A] tracking-wider block mb-1.5">
                      Key Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stay.amenities?.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#F8F7F2] text-[#4e5e54] px-2 py-0.5 rounded border border-[#E5E2D7] whitespace-nowrap"
                        >
                          {amenity}
                        </span>
                      ))}
                      {stay.amenities?.length > 3 && (
                        <span
                          className="text-[10px] bg-[#124B2A]/5 text-[#124B2A] font-semibold px-1.5 py-0.5 rounded border border-[#124B2A]/10"
                          title={stay.amenities.slice(3).join(", ")}
                        >
                          +{stay.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price and CTA Footer */}
                <div className="pt-3 border-t border-[#E5E2D7] flex items-center justify-between gap-2 mt-auto">
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#4e5e54] block leading-tight">Average / room</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#124B2A] leading-tight block truncate">
                      {stay.pricePerNight}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBook(stay.name)}
                    className="py-2 px-3 sm:px-3.5 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-xs shadow-xs transition cursor-pointer whitespace-nowrap shrink-0 hover:shadow-md"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="bg-white border-y border-[#E5E2D7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#124B2A]">
              Why Reserve Your Netarhat & Betla Stay With Us?
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e54] mt-1 max-w-xl mx-auto">
              Skip booking uncertainty. We inspect every property and provide complete on-ground support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D7]">
              <div className="w-10 h-10 rounded-lg bg-[#124B2A]/10 text-[#124B2A] flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#124B2A] mb-1">Inspected Hygiene</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                Clean linens, sanitized bathrooms, and continuous running hot water guaranteed in the winter chill.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D7]">
              <div className="w-10 h-10 rounded-lg bg-[#124B2A]/10 text-[#124B2A] flex items-center justify-center mb-3">
                <Coffee size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#124B2A] mb-1">Authentic Meals</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                Enjoy home-style Jharkhand thalis, fresh desi chicken, and hot morning chai with sunrise views.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D7]">
              <div className="w-10 h-10 rounded-lg bg-[#124B2A]/10 text-[#124B2A] flex items-center justify-center mb-3">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#124B2A] mb-1">Prime Scenic Locations</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                Minutes away from Sunrise Point, Magnolia Sunset Point, and the Betla National Park safari gates.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D7]">
              <div className="w-10 h-10 rounded-lg bg-[#124B2A]/10 text-[#124B2A] flex items-center justify-center mb-3">
                <PhoneCall size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#124B2A] mb-1">Direct Latehar Desk</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                Our local coordinators handle hassle-free check-ins and driver parking on your arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#124B2A] bg-[#124B2A]/10 px-3 py-1 rounded-full mb-2">
            <HelpCircle size={14} />
            <span>Stay Guidelines & FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#124B2A]">
            Planning Your Stay: Good to Know
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-[#E5E2D7] shadow-xs">
            <h3 className="font-bold text-sm sm:text-base text-[#124B2A] mb-1.5">
              How far in advance should we book Netarhat & Betla stays?
            </h3>
            <p className="text-xs sm:text-sm text-[#25332B] leading-relaxed">
              During peak months (October through March) and extended holiday weekends, government heritage bungalows like Dak Bungalow and JTDC Prabhat Vihar sell out 3-4 weeks ahead. Early reservation is strongly recommended.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E2D7] shadow-xs">
            <h3 className="font-bold text-sm sm:text-base text-[#124B2A] mb-1.5">
              Is hot water and electricity reliable in Netarhat?
            </h3>
            <p className="text-xs sm:text-sm text-[#25332B] leading-relaxed">
              Yes, all recommended stays feature geysers or hot water arrangements, as mornings and nights in the plateau can get quite cool (especially between November and February). Power backup is provided for essential lighting.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5E2D7] shadow-xs">
            <h3 className="font-bold text-sm sm:text-base text-[#124B2A] mb-1.5">
              Can food and meals be customized for families and seniors?
            </h3>
            <p className="text-xs sm:text-sm text-[#25332B] leading-relaxed">
              Yes, all stays offer on-site kitchens where meals can be prepared fresh according to your preference (mild spices, Jain food, or local regional preparations).
            </p>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedStay}
      />
    </div>
  );
}
