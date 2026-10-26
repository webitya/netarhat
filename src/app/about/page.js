import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  ShieldCheck,
  TreePine,
  Users,
  Compass,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "About Us — Netarhat Betla Tourism | Official Eco-Tour Operator",
  description:
    "Netarhat Betla Tourism is an official eco-tour operator based in Latehar, Jharkhand, specializing in guided tours to Netarhat and Betla National Park.",
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "About Us", href: "/about" }]} />

      {/* Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            About Netarhat Betla Tourism
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Pioneering authentic, responsible eco-tourism across the highlands and wildlife reserves of western Jharkhand.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#124B2A]">
              Born in Latehar, Dedicated to Jharkhand’s Splendor
            </h2>
            <p className="text-sm sm:text-base text-[#25332B] leading-relaxed">
              Founded on Railway Station Road in Latehar, <strong>Netarhat Betla Tourism</strong> was established to bridge the gap between discerning travelers seeking pristine nature and the rich tribal heritage of Chotanagpur.
            </p>
            <p className="text-sm text-[#4e5e54] leading-relaxed">
              Unlike generic aggregators, we are physically based right here in Latehar district. Our drivers grew up navigating the serpentine forest ghats to Netarhat; our wildlife naturalists have spent decades tracking tiger pugmarks and elephant trails in the Palamau core reserve.
            </p>

            <div className="pt-3 grid grid-cols-2 gap-3 text-xs font-semibold text-[#124B2A]">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-[#3D8B40]" />
                <span>100% Local Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-[#3D8B40]" />
                <span>Govt. Approved Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-[#3D8B40]" />
                <span>Eco-Friendly Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-[#3D8B40]" />
                <span>24/7 Ground Assistance</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-lg">
            <Image
              src="/images/netarhat_stay.jpg"
              alt="Colonial heritage cottage in pine woods Netarhat"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E5E2D7] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#124B2A]">
              How We Create Meaningful Journeys
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7]">
              <div className="w-12 h-12 rounded-lg bg-[#124B2A] text-[#F4A62A] flex items-center justify-center mb-4">
                <TreePine size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#124B2A] mb-2">Preserving Nature</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                We enforce strict zero-litter policies across Netarhat viewpoints and Betla safari trails. We partner with local forest departments to keep our pristine forests unmarred.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7]">
              <div className="w-12 h-12 rounded-lg bg-[#3D8B40] text-white flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#124B2A] mb-2">Empowering Locals</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                Every rupee spent through our packages directly benefits tribal homestays, local dhaba cooks, indigenous artisans, and local forest youth guides from the Asur and Oraon communities.
              </p>
            </div>

            <div className="p-6 bg-[#F8F7F2] rounded-xl border border-[#E5E2D7]">
              <div className="w-12 h-12 rounded-lg bg-[#F4A62A] text-[#124B2A] flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#124B2A] mb-2">Safety & Comfort</h3>
              <p className="text-xs text-[#25332B] leading-relaxed">
                From emergency medical first-aid kits in all safari vehicles to verified hot-water facilities in winter highlands, your safety and well-being is our uncompromised priority.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials & Call to Action */}
        <div className="bg-[#124B2A] text-white p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to Discover Netarhat & Betla?
            </h3>
            <p className="text-xs sm:text-sm text-[#F8F7F2]/80 max-w-xl">
              Connect with our Latehar headquarters today to receive an all-inclusive customized tour quote with sanitized SUV, hotel stays, and guaranteed safari booking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/tours"
              className="px-6 py-3 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-sm shadow transition text-center"
            >
              Browse Tour Packages
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition text-center"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
