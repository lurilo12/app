import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import ScheduleSection from './components/ScheduleSection';
import RegionsSection from './components/RegionsSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Hero />
      <Services />
      <ScheduleSection />
      <RegionsSection />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}

export default App;
