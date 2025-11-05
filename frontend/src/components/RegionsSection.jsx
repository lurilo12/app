import React from 'react';
import { MessageCircle } from 'lucide-react';
import { regionsSection, siteConfig } from '../mocks/mock';
import { Button } from './ui/button';

const RegionsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {regionsSection.title}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {regionsSection.description}
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {regionsSection.region}
            </h3>
            <div className="pt-4">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-base font-medium rounded-md transition-colors"
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {regionsSection.cta}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <img
                src={regionsSection.image}
                alt="Regiões atendidas"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
