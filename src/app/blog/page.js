import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Insights & Travel Tips — Netarhat & Betla Travel Blog",
  description:
    "Expert travel guides, seasonal weather tips, wildlife safari instructions, and hidden spots of Netarhat and Betla National Park.",
};

export default function BlogPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Blog & Travel Tips", href: "/blog" }]} />

      {/* Header */}
      <section className="bg-[#124B2A] text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F4A62A] block mb-2">
            Local Knowledge & Guides
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-4 text-white">
            Insights & Travel Tips
          </h1>
          <p className="text-sm sm:text-base text-[#F8F7F2]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Insider advice from our certified naturalists and local travel guides to help you plan an unforgettable holiday across Jharkhand.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E2D7] shadow-sm hover:shadow-lg transition duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#124B2A] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-[#4e5e54] mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#3D8B40]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#F4A62A]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-[#124B2A] group-hover:text-[#3D8B40] transition mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#25332B] line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2D7] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#4e5e54] flex items-center gap-1">
                    <User size={13} className="text-[#3D8B40]" />
                    {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#124B2A] hover:text-[#3D8B40] transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
