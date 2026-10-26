"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { X, Camera, Eye, MapPin } from "lucide-react";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ["All", "Netarhat", "Betla", "Waterfalls", "Heritage", "Stays"];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Gallery", href: "/gallery" }]} />

      {/* Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Photo & Media Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in the majestic landscapes of Netarhat and the wild fauna of Betla National Park. High-resolution captures of sunrises, ancient forts, cascading waterfalls, and colonial retreats.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                filter === cat
                  ? "bg-[#124B2A] text-white shadow-sm"
                  : "bg-white text-[#25332B] border border-[#E5E2D7] hover:bg-[#F8F7F2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-2xl cursor-pointer transition duration-300"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* View Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye size={16} />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-1.5 text-[11px] text-[#F4A62A] font-semibold mb-1">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-[#F4A62A] transition">
                  {item.title}
                </h2>
                <p className="text-xs text-[#E5E2D7] mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#124B2A] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition"
            >
              <X size={20} />
            </button>

            <div className="relative h-[350px] sm:h-[500px] w-full">
              <Image
                src={activePhoto.image}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-contain bg-black/40"
              />
            </div>

            <div className="p-6 bg-[#0c331c] text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-[#F4A62A]">
                  {activePhoto.location} • {activePhoto.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-[#E5E2D7] leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
