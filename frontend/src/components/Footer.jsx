import React from 'react';
import { footerData, siteConfig } from '../mocks/mock';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Menu */}
          <div>
            <h3 className="text-green-500 font-bold text-lg mb-4 uppercase">
              MENU
            </h3>
            <ul className="space-y-2">
              {footerData.menu.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-green-500 font-bold text-lg mb-4 uppercase">
              NOSSOS SERVIÇOS
            </h3>
            <ul className="space-y-2">
              {footerData.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-green-500 font-bold text-lg mb-4 uppercase">
              ONDE ATENDEMOS
            </h3>
            <p className="text-gray-300">{footerData.location}</p>
            <div className="mt-4">
              <h4 className="text-green-500 font-bold uppercase text-sm mb-2">
                ATENDIMENTO
              </h4>
              <p className="text-gray-300">{footerData.schedule}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-green-500 font-bold text-lg mb-4 uppercase">
              FALE CONOSCO
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${footerData.phone}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Tel: {footerData.phone}
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp: {footerData.whatsapp}
              </a>
              <a
                href={`mailto:${footerData.email}`}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                {footerData.email}
              </a>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Dr. Pet Domiciliar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
