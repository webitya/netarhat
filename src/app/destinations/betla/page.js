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
  Binoculars,
  ShieldAlert,
} from "lucide-react";

export const metadata = {
  title: "Betla Tourism – Safari & Attractions | Palamau Tiger Reserve",
  description:
    "Explore Betla in Jharkhand – home to Palamau Tiger Reserve, elephant safaris & 16th-century Palamau Forts. Find Betla tour packages and wildlife adventures today.",
  keywords: [
    "Betla National Park safari",
    "Palamau Tiger Reserve Jharkhand",
    "Betla elephant safari",
    "Palamau Forts Latehar",
    "How to reach Betla",
    "Betla safari timings",
  ],
};

export default function BetlaDestinationPage() {
  const dest = destinations.betla;
  const betlaTours = tourPackages.filter((t) =>
    t.destination.toLowerCase().includes("betla")
  );

  // TouristDestination structured data
  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Betla National Park",
    "description": dest.description,
    "touristType": ["Wildlife Enthusiasts", "Birdwatchers", "History Buffs", "Families"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.8833,
      "longitude": 84.1833,
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Betla",
      "addressRegion": "Jharkhand",
      "addressCountry": "IN",
    },
    "hasMap": "https://maps.google.com/?q=Betla+National+Park+Jharkhand",
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
          { label: "Betla", href: "/destinations/betla" },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative h-[450px] sm:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/betla_safari.jpg"
          alt="Wild elephants in Betla National Park jungle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#124B2A] via-[#124B2A]/60 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D8B40] text-white font-bold text-xs uppercase tracking-wider mb-4">
            <Binoculars size={13} />
            <span>Palamau Tiger Reserve • Wildlife & Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md text-white">
            Betla, Jharkhand
          </h1>
          <p className="font-sans text-base sm:text-xl text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            {dest.tagline}
          </p>
        </div>
      </section>

      {/* Facts Bar */}
      <section className="bg-white border-b border-[#E5E2D7] py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {dest.facts.map((f, i) => (
              <div key={i} className="p-2">
                <span className="text-xs uppercase text-[#4e5e54] font-semibold block">{f.label}</span>
                <span className="font-serif font-bold text-[#124B2A] text-sm sm:text-base">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Overview & Safari Info */}
        <section className="bg-white p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#3D8B40] block mb-2">
              Jungle Sanctuary
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#124B2A] mb-4">
              Wild Asian Elephants & Ancient Fortresses
            </h2>
            <p className="text-sm sm:text-base text-[#25332B] leading-relaxed mb-6">
              {dest.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#124B2A] uppercase mb-1">
                  <Clock size={16} className="text-[#3D8B40]" />
                  <span>Safari Timings</span>
                </div>
                <p className="text-xs text-[#25332B]">
                  • Morning Shift: <strong>06:00 AM – 10:00 AM</strong><br />
                  • Afternoon Shift: <strong>02:30 PM – 05:30 PM</strong>
                </p>
              </div>

              <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#124B2A] uppercase mb-1">
                  <Calendar size={16} className="text-[#F4A62A]" />
                  <span>Best Wildlife Season</span>
                </div>
                <p className="text-xs text-[#25332B]">
                  {dest.bestTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Highlights & Attractions */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
              Wild Adventures & History
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#124B2A]">
              Top Attractions in Betla
            </h2>
            <p className="text-xs sm:text-sm text-[#4e5e54] mt-2">
              From open jeep safaris tracking elephant families to exploring the mysterious stone battlements of Palamau Fort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#124B2A] mb-2">{att.name}</h3>
                    <p className="text-xs text-[#25332B] leading-relaxed">{att.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Reach Betla */}
        <section className="bg-white p-8 rounded-2xl border border-[#E5E2D7] shadow-sm">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#3D8B40] block mb-2">
              Route Information
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#124B2A]">
              How to Reach Betla National Park
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
                <h3 className="font-serif font-bold text-[#124B2A] text-base mb-2">{item.mode}</h3>
                <p className="text-xs text-[#25332B] leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tours Featuring Betla */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-1">
                Safari Packages
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#124B2A]">
                Tours to Betla National Park
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {betlaTours.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-md transition flex flex-col justify-between p-6"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#3D8B40] bg-[#3D8B40]/10 px-2 py-0.5 rounded">
                    {pkg.duration}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#124B2A] mt-2 mb-1">
                    <Link href={`/tours/${pkg.slug}`}>{pkg.title}</Link>
                  </h3>
                  <p className="text-xs text-[#4e5e54] mb-4">{pkg.overview}</p>
                </div>

                <div className="pt-4 border-t border-[#E5E2D7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#4e5e54] block">Starting at</span>
                    <span className="font-bold text-[#124B2A] text-lg">
                      ₹{pkg.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Link
                    href={`/tours/${pkg.slug}`}
                    className="px-4 py-2 rounded-lg bg-[#F4A62A] text-[#124B2A] font-bold text-xs hover:bg-[#e09419] transition"
                  >
                    View Details & Safari
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
