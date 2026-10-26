import Image from "next/image";
import Link from "next/link";
import { destinations, tourPackages } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Plane,
  Train,
  Car,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Netarhat Tourism – Things to Do & See | Queen of Chotanagpur",
  description:
    "Netarhat in Jharkhand offers misty hills, stunning sunrises at sunrise point, and sunset at Magnolia Point. Browse top tours to Netarhat and book holiday packages today.",
  keywords: [
    "Netarhat tourism",
    "Queen of Chotanagpur",
    "Magnolia sunset point Netarhat",
    "Upper Ghaghri waterfall",
    "Netarhat pine forest",
    "How to reach Netarhat",
    "Netarhat hotel booking",
  ],
};

export default function NetarhatDestinationPage() {
  const dest = destinations.netarhat;
  const netarhatTours = tourPackages.filter((t) =>
    t.destination.toLowerCase().includes("netarhat")
  );

  // TouristDestination structured data
  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Netarhat",
    "description": dest.description,
    "touristType": ["Nature Lovers", "Couples", "Hikers", "Birdwatchers"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.4795,
      "longitude": 84.2694,
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Netarhat",
      "addressRegion": "Jharkhand",
      "addressCountry": "IN",
    },
    "hasMap": "https://maps.google.com/?q=Netarhat+Jharkhand",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: "Destinations", href: "/destinations" },
          { label: "Netarhat", href: "/destinations/netarhat" },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative h-[450px] sm:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/netarhat_sunrise.jpg"
          alt="Sunrise over Netarhat viewpoint"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#124B2A] via-[#124B2A]/60 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md text-white">
            Netarhat, Jharkhand
          </h1>
          <p className="font-sans text-base sm:text-xl text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            {dest.tagline}
          </p>
        </div>
      </section>

      {/* Facts Bar */}
      <section className="bg-white border-b border-[#E5E2D7] py-6 shadow-xs">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {dest.facts.map((f, i) => (
              <div key={i} className="p-2">
                <span className="text-xs uppercase text-[#4e5e54] font-semibold block">{f.label}</span>
                <span className="font-bold text-[#124B2A] text-sm sm:text-base">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 space-y-16">
        {/* Overview Section */}
        <section className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#124B2A] mb-4">
              The Misty Haven of Jharkhand
            </h2>
            <p className="text-sm sm:text-base text-[#25332B] leading-relaxed mb-4">
              {dest.description}
            </p>
            <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7] flex items-center gap-3">
              <Clock size={20} className="text-[#F4A62A] shrink-0" />
              <div className="text-xs sm:text-sm text-[#25332B]">
                <strong className="text-[#124B2A]">Best Season to Visit: </strong>
                {dest.bestTime}
              </div>
            </div>
          </div>
        </section>

        {/* Top Highlights & Attractions */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#124B2A]">
              Top Attractions in Netarhat
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e54] mt-2">
              From historic viewpoints to cascading waterfalls, explore the most scenic locations of Netarhat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dest.attractions.map((att) => (
              <div
                key={att.name}
                className="bg-white rounded-xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={att.image}
                    alt={att.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#124B2A] mb-2">{att.name}</h3>
                    <p className="text-xs text-[#25332B] leading-relaxed">{att.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Reach Netarhat */}
        <section className="bg-white p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#124B2A]">
              How to Reach Netarhat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dest.howToReach.map((item) => (
              <div key={item.mode} className="p-5 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7]">
                <div className="w-10 h-10 rounded-lg bg-[#124B2A] text-[#F4A62A] flex items-center justify-center mb-3">
                  {item.mode.includes("Air") && <Plane size={20} />}
                  {item.mode.includes("Train") && <Train size={20} />}
                  {item.mode.includes("Road") && <Car size={20} />}
                </div>
                <h3 className="font-bold text-[#124B2A] text-base mb-2">{item.mode}</h3>
                <p className="text-xs text-[#25332B] leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tours Featuring Netarhat */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#124B2A]">
                Tours to Netarhat
              </h2>
            </div>
            <Link
              href="/tours"
              className="text-xs sm:text-sm font-bold text-[#124B2A] hover:text-[#3D8B40] flex items-center gap-1 mt-2 sm:mt-0"
            >
              <span>View All Tour Packages</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {netarhatTours.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-md transition flex flex-col justify-between p-5"
              >
                <div>
                  <span className="text-xs font-semibold text-[#3D8B40]">
                    {pkg.duration}
                  </span>
                  <h3 className="text-lg font-bold text-[#124B2A] mt-1 mb-1">
                    <Link href={`/tours/${pkg.slug}`}>{pkg.title}</Link>
                  </h3>
                  <p className="text-xs text-[#4e5e54] mb-3 line-clamp-2">{pkg.overview}</p>
                </div>

                <div className="pt-3 border-t border-[#E5E2D7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#4e5e54] block">Starting at</span>
                    <span className="font-bold text-[#124B2A] text-sm">
                      ₹{pkg.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Link
                    href={`/tours/${pkg.slug}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F4A62A] text-[#124B2A] font-bold text-xs hover:bg-[#e09419] transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
