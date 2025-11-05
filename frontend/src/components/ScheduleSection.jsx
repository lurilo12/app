import React from 'react';
import { MessageCircle } from 'lucide-react';
import { scheduleSection, siteConfig } from '../mocks/mock';
import { Button } from './ui/button';

const ScheduleSection = () => {
  return (
    <section className="bg-blue-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              {scheduleSection.title}
            </h2>
            <p className="text-lg leading-relaxed text-blue-50">
              {scheduleSection.description}
            </p>
            <div className="pt-4">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-base font-medium rounded-md transition-colors"
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {scheduleSection.cta}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <img
                src={scheduleSection.image}
                alt="Agende sua visita"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
