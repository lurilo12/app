import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../mocks/mock';

const WhatsAppButton = () => {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
