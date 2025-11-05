import React, { useState } from 'react';
import { testimonials } from '../mocks/mock';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-20 bg-gray-800 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={testimonials[activeIndex].image}
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Quote className="w-8 h-8 text-white" fill="currentColor" />
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white">
            {testimonials[activeIndex].name}
          </h3>
          <p className="text-gray-300 text-lg">
            {testimonials[activeIndex].subtitle}
          </p>
          <blockquote className="text-xl text-white leading-relaxed max-w-3xl mx-auto">
            "{testimonials[activeIndex].text}"
          </blockquote>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
