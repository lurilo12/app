import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';
import { Toaster } from './components/ui/toaster';

// Pages
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Consultas from './pages/Consultas';
import Vacinas from './pages/Vacinas';
import Cirurgias from './pages/Cirurgias';
import Duvidas from './pages/Duvidas';
import Contato from './pages/Contato';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Home />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/vacinas" element={<Vacinas />} />
          <Route path="/cirurgias" element={<Cirurgias />} />
          <Route path="/duvidas" element={<Duvidas />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
