import React, { useState } from 'react';
import { ChevronDown, Facebook, Instagram, Search } from 'lucide-react';
import { navigation } from '../mocks/mock';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="bg-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.path}
                  className="text-white font-medium text-sm hover:text-green-100 transition-colors flex items-center py-4"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </a>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg py-2 min-w-[200px] z-50">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Social Icons & Search */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/drpetdomiciliar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-100 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/drpetdomiciliar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-100 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <button className="text-white hover:text-green-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
