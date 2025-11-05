import React from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { heroData, siteConfig } from '../mocks/mock';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="text-sm text-gray-600 uppercase tracking-wider">
              {heroData.subtitle}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-green-500">
              {heroData.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              {heroData.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-base font-medium rounded-md transition-colors"
                onClick={() => window.location.href = '/servicos'}
              >
                {heroData.ctaPrimary}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-base font-medium rounded-md transition-colors"
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {heroData.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative">
              {/* Decorative dots */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-50">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-green-400 rounded-full" />
                  ))}
                </div>
              </div>
              
              {/* Main circular image */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-green-500 rounded-full" />
                <div className="absolute inset-4 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src={heroData.image}
                    alt="Veterinário com pet"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
