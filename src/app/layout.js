import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://netarhat.in"),
  title: {
    default: "Netarhat Betla Tourism — Netarhat & Betla Tour Packages, Jharkhand",
    template: "%s | Netarhat Betla Tourism",
  },
  description:
    "Netarhat Betla Tourism offers guided tours to Netarhat (sunrise point, pine forests) and Betla (safari park, Palamau fort). Book hiking & wildlife packages in Jharkhand. Plan your trip today!",
  keywords: [
    "Netarhat tourism",
    "Betla National Park safari",
    "Netarhat tour package",
    "Jharkhand tourism packages",
    "Queen of Chotanagpur",
    "Magnolia sunset point",
    "Palamau Forts",
    "Latehar tourism",
    "Ranchi to Netarhat tour",
  ],
  authors: [{ name: "Netarhat Betla Tourism" }],
  creator: "Netarhat Betla Tourism",
  publisher: "Netarhat Betla Tourism",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/netarhat-logo.jpeg",
    shortcut: "/netarhat-logo.jpeg",
    apple: "/netarhat-logo.jpeg",
  },
  openGraph: {
    title: "Netarhat Betla Tourism — Discover Jharkhand’s Hidden Gems",
    description:
      "Explore the misty pine hills of Netarhat and wild safaris of Betla National Park. Guided tours, verified stays, and sanitized transport.",
    url: "https://netarhat.in",
    siteName: "Netarhat Betla Tourism",
    images: [
      {
        url: "/images/netarhat_sunrise.jpg",
        width: 1200,
        height: 630,
        alt: "Sunrise view over misty hills of Netarhat",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netarhat Betla Tourism — Netarhat & Betla Tour Packages",
    description: "Explore Netarhat & Betla National Park with Jharkhand's premier eco-tour operator.",
    images: ["/images/netarhat_sunrise.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  // Official TravelAgency JSON-LD structured data from website guide
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Netarhat Betla Tourism",
    "image": "https://netarhat.in/netarhat-logo.jpeg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Railway Station Road",
      "addressLocality": "Latehar",
      "addressRegion": "Jharkhand",
      "postalCode": "829207",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.7367,
      "longitude": 84.4197,
    },
    "telephone": "+919470938399",
    "email": "info@netarhat.in",
    "url": "https://netarhat.in",
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "$$",
    "description":
      "Eco-tour operator offering guided Netarhat and Betla tours, wildlife safaris, and nature retreats in Jharkhand.",
    "sameAs": [
      "https://www.facebook.com/NetarhatBetlaTourism",
      "https://www.instagram.com/netarhatbetlatourism",
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F7F2] text-[#25332B] font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
