"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40 group">
      <a
        href="https://wa.me/919470938399?text=Hello%20Netarhat%20Betla%20Tourism%2C%20I%20would%20like%20to%20inquire%20about%20a%20trip%20package."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 bg-[#3D8B40] hover:bg-[#327335] text-white p-3.5 rounded-full shadow-2xl transition duration-300 transform group-hover:scale-105 border-2 border-white"
      >
        <MessageCircle size={26} className="text-white fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-semibold pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
