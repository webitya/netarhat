import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { tourPackages } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import TourDetailClient from "./TourDetailClient";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Phone,
  MessageCircle,
  Users,
} from "lucide-react";

export async function generateStaticParams() {
  return tourPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = tourPackages.find((p) => p.slug === slug);
  if (!tour) return { title: "Tour Not Found" };

  return {
    title: `${tour.title} | Netarhat Betla Tourism`,
    description: `${tour.overview.slice(0, 150)}... Includes deluxe hotel & cab. Starting ₹${tour.startingPrice}/pax. Book now!`,
    openGraph: {
      title: `${tour.title} — Jharkhand Tour Package`,
      description: tour.overview,
      images: [{ url: tour.image, alt: tour.alt }],
    },
  };
}

export default async function TourDetailPage({ params }) {
  const { slug } = await params;
  const tour = tourPackages.find((p) => p.slug === slug);

  if (!tour) {
    notFound();
  }

  // Schema.org TouristTrip JSON-LD (as specified in website guide)
  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.overview,
    "touristType": "Nature Lovers",
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": tour.itinerary.map((day, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Place",
          "name": day.title,
        },
      })),
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Netarhat Betla Tourism",
      "url": "https://netarhat.in",
      "telephone": "+916205087480",
    },
    "offers": {
      "@type": "Offer",
      "price": tour.startingPrice.toString(),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tour Packages", href: "/tours" },
          { label: tour.title, href: `/tours/${tour.slug}` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative h-[420px] sm:h-[480px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#124B2A] via-[#124B2A]/60 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#124B2A] text-white text-xs font-bold shadow">
              {tour.duration}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F4A62A] text-[#124B2A] text-xs font-bold shadow">
              {tour.badge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md text-white">
            {tour.title}
          </h1>
          <p className="font-sans text-sm sm:text-lg text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            {tour.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content & Interactive Booking */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Details & Itinerary */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
              <span className="text-xs uppercase tracking-widest font-bold text-[#3D8B40] block mb-2">
                Tour Summary
              </span>
              <h2 className="text-2xl font-bold text-[#124B2A] mb-4">
                About this Itinerary
              </h2>
              <p className="text-sm sm:text-base text-[#25332B] leading-relaxed mb-6">
                {tour.overview}
              </p>

              <div className="border-t border-[#E5E2D7] pt-5">
                <h3 className="text-lg font-bold text-[#124B2A] mb-3">
                  Key Highlights:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#4e5e54]">
                      <CheckCircle size={15} className="text-[#3D8B40] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day-by-Day Detailed Itinerary */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
                Day-by-Day Schedule
              </span>
              <h2 className="text-2xl font-bold text-[#124B2A] mb-6">
                Detailed Itinerary
              </h2>

              <div className="space-y-6">
                {tour.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-5 rounded-xl bg-[#F8F7F2] border border-[#E5E2D7] transition hover:border-[#124B2A]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-[#124B2A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        D{day.day}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#124B2A]">
                        Day {day.day}: {day.title}
                      </h3>
                    </div>

                    <ul className="space-y-2 pl-4 border-l-2 border-[#124B2A]/20 ml-4">
                      {day.activities.map((act, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-[#25332B] leading-relaxed flex items-start gap-2">
                          <span className="text-[#3D8B40] font-bold">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Table */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
              <span className="text-xs uppercase tracking-widest font-bold text-[#3D8B40] block mb-2">
                Transparent Rates
              </span>
              <h2 className="text-2xl font-bold text-[#124B2A] mb-4">
                Pricing by Group Size
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#124B2A] text-white">
                      <th className="p-3 font-semibold rounded-tl-lg">Group Size</th>
                      <th className="p-3 font-semibold">Per Person Price</th>
                      <th className="p-3 font-semibold rounded-tr-lg">Package Inclusions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2D7] text-[#25332B]">
                    {tour.pricing.map((p, idx) => (
                      <tr key={idx} className="hover:bg-[#F8F7F2] transition">
                        <td className="p-3 font-bold text-[#124B2A]">{p.pax}</td>
                        <td className="p-3 font-extrabold text-[#F4A62A] text-base">{p.pricePerPerson}</td>
                        <td className="p-3 text-[#4e5e54]">{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-[#75867c] mt-2">
                * Prices include Deluxe Hotel Stays, 3 Daily Meals, Private AC Vehicle & Sightseeing. GST (5%) extra.
              </p>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E5E2D7] shadow-sm">
                <h3 className="text-lg font-bold text-[#124B2A] mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#3D8B40]" />
                  <span>What&apos;s Included</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#25332B]">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#3D8B40] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5E2D7] shadow-sm">
                <h3 className="text-lg font-bold text-[#124B2A] mb-3 flex items-center gap-2">
                  <XCircle size={18} className="text-[#75867c]" />
                  <span>What&apos;s Excluded</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4e5e54]">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget & Help */}
          <div className="lg:col-span-1">
            <TourDetailClient tour={tour} />
          </div>
        </div>
      </div>
    </div>
  );
}
