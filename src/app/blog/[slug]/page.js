import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Calendar, Clock, User, ArrowRight, Share2, Compass, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Netarhat Betla Tourism`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.alt }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Schema.org BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://netarhat.in${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Netarhat Betla Tourism",
      "logo": {
        "@type": "ImageObject",
        "url": "https://netarhat.in/netarhat-logo.jpeg",
      },
    },
    "datePublished": "2026-02-15",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#124B2A] hover:text-[#3D8B40] transition mb-4"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#124B2A] leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#4e5e54] pb-6 border-b border-[#E5E2D7]">
            <span className="font-semibold text-[#124B2A]">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium text-[#124B2A]">
              <User size={14} className="text-[#3D8B40]" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-[#3D8B40]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-[#F4A62A]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#E5E2D7] mb-10 shadow-sm">
          <Image
            src={post.image}
            alt={post.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-emerald max-w-none text-[#25332B] space-y-6 text-sm sm:text-base leading-relaxed">
          {post.content.split("\n\n").map((para, i) => {
            if (para.startsWith("### ")) {
              return (
                <h2
                  key={i}
                  className="text-xl sm:text-2xl font-bold text-[#124B2A] pt-4 border-b border-[#E5E2D7] pb-2"
                >
                  {para.replace("### ", "")}
                </h2>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        {/* Bottom Tour Booking CTA Box */}
        <div className="mt-12 p-8 bg-[#124B2A] text-white rounded-2xl shadow-lg border border-[#0c331c] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Explore Our Netarhat & Betla Tour Packages
            </h3>
            <p className="text-xs sm:text-sm text-[#F8F7F2]/80 max-w-md">
              Let our certified local team take care of your hotels, sanitized SUV cab, and safari permits.
            </p>
          </div>

          <Link
            href="/tours"
            className="px-6 py-3 rounded-lg bg-[#F4A62A] hover:bg-[#e09419] text-[#124B2A] font-bold text-sm shadow transition shrink-0"
          >
            Browse Tour Packages
          </Link>
        </div>
      </article>
    </div>
  );
}
