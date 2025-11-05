import React from 'react';
import { Stethoscope, Syringe, Activity, ArrowRight } from 'lucide-react';
import { services } from '../mocks/mock';
import { Card, CardContent } from './ui/card';

const iconMap = {
  'briefcase-medical': Activity,
  'syringe': Syringe,
  'stethoscope': Stethoscope
};

const Services = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card key={service.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Link */}
                  <a
                    href={service.link}
                    className="text-blue-500 font-medium flex items-center hover:text-blue-600 transition-colors group"
                  >
                    SAIBA MAIS
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
