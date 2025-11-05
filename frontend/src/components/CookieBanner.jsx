import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-sm bg-gray-900 text-white p-6 rounded-lg shadow-2xl z-50 animate-in slide-in-from-bottom">
      <h3 className="font-bold text-lg mb-2">Cookies.</h3>
      <p className="text-sm text-gray-300 mb-4">
        Este site utiliza cookies para te proporcionar uma melhor experiência. Ao continuar navegando, você aceita nossa{' '}
        <a href="/politica" className="text-green-400 hover:text-green-300 underline">
          Política de Privacidade
        </a>
        .
      </p>
      <Button
        onClick={handleAccept}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
      >
        OK
      </Button>
    </div>
  );
};

export default CookieBanner;
