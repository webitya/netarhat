import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items }) {
  // Generate JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://netarhat.in",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://netarhat.in${item.href || ""}`,
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-[#F2EFE8] border-b border-[#E5E2D7] text-xs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap text-[#4e5e54]">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-[#124B2A] transition font-medium"
        >
          <Home size={13} className="text-[#3D8B40]" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.label} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-[#75867c]" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#124B2A] truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#124B2A] transition font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
