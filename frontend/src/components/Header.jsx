import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../mocks/mock';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-green-500">Dr</span>
              <span className="text-green-600">Pet</span>
            </div>
            <div className="ml-2 text-xs text-gray-600">
              <div>veterinário em domicílio</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Hours */}
            <div className="text-sm">
              <div className="text-gray-500 text-xs">Atendimento:</div>
              <div className="text-green-600 font-medium">
                Domingo à Domingo
              </div>
              <div className="text-green-600 font-medium text-xs">
                até às 22:00 horas
              </div>
            </div>

            {/* WhatsApp */}
            <div className="text-sm">
              <div className="text-gray-500 text-xs">Envie sua mensagem:</div>
              <a
                href={`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`}
                className="text-green-600 font-medium flex items-center hover:text-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {siteConfig.phone}
              </a>
            </div>

            {/* Phone */}
            <div className="text-sm">
              <div className="text-gray-500 text-xs">Fale conosco:</div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-green-600 font-medium flex items-center hover:text-green-700 transition-colors"
              >
                <Phone className="w-4 h-4 mr-1" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
