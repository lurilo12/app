import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ScheduleSection from '../components/ScheduleSection';
import RegionsSection from '../components/RegionsSection';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <ScheduleSection />
      <RegionsSection />
      <Testimonials />
    </>
  );
};

export default Home;
