import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, MapPin, CheckCircle, Compass, TreePine, Binoculars } from "lucide-react";

export const metadata = {
  title: "Destinations in Jharkhand — Netarhat & Betla National Park",
  description:
    "Explore the top travel destinations of Jharkhand: the cool hill station of Netarhat and the wild elephant sanctuary of Betla National Park. Plan your trip with Netarhat Betla Tourism.",
};

export default function DestinationsIndexPage() {
  const destList = Object.values(destinations);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Destinations", href: "/destinations" }]} />

      {/* Hero Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
            Jharkhand Eco-Tourism Circuit
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-4 text-white">
            Destinations: Netarhat & Betla
          </h1>
          <p className="text-sm sm:text-lg text-[#F8F7F2]/90 font-light leading-relaxed max-w-2xl mx-auto">
            Experience the harmony of Jharkhand’s elevated pine forests and dense tropical tiger reserves. Discover why Netarhat and Betla are Eastern India’s best-kept nature secrets.
          </p>
        </div>
      </section>

      {/* Destinations Listing */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {destList.map((dest, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={dest.slug}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-white rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-md transition p-6 sm:p-8 ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 relative h-72 sm:h-96 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={dest.heroImage}
                    alt={dest.heroAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#124B2A] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    {dest.elevation}
                  </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3D8B40] uppercase tracking-wider">
                    <Compass size={15} />
                    <span>Destination Guide</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#124B2A]">
                    {dest.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#F4A62A] uppercase tracking-wide">
                    {dest.tagline}
                  </p>

                  <p className="text-sm text-[#25332B] leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Top Attractions preview */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs uppercase font-bold text-[#124B2A]">Top Sights:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dest.attractions.slice(0, 4).map((att) => (
                        <div key={att.name} className="flex items-center gap-2 text-xs text-[#4e5e54]">
                          <CheckCircle size={14} className="text-[#3D8B40] shrink-0" />
                          <span className="font-medium">{att.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="px-6 py-2.5 rounded-lg bg-[#124B2A] hover:bg-[#0c331c] text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
                    >
                      <span>Explore {dest.name} Guide</span>
                      <ArrowRight size={15} />
                    </Link>
                    <Link
                      href="/tours"
                      className="px-6 py-2.5 rounded-lg border border-[#124B2A] text-[#124B2A] hover:bg-[#F8F7F2] font-semibold text-xs sm:text-sm transition"
                    >
                      View Tour Packages
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
