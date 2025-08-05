import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-aps-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Akshya Patra Services</h3>
            <p className="text-aps-gray-300 mb-4">
              Leading job consultancy firm connecting talented professionals with their dream careers. 
              We specialize in comprehensive recruitment solutions across various industries.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-aps-gray-300">Made with care</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-aps-accent" />
                <span className="text-sm text-aps-gray-300">info@akshyapatra.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-aps-accent" />
                <span className="text-sm text-aps-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-aps-accent" />
                <span className="text-sm text-aps-gray-300">Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/candidate" className="block text-sm text-aps-gray-300 hover:text-white transition-colors duration-300">
                Find Jobs
              </a>
              <a href="/hr/login" className="block text-sm text-aps-gray-300 hover:text-white transition-colors duration-300">
                HR Portal
              </a>
              <a href="/admin/login" className="block text-sm text-aps-gray-300 hover:text-white transition-colors duration-300">
                Admin Portal
              </a>
              <a href="/help" className="block text-sm text-aps-gray-300 hover:text-white transition-colors duration-300">
                Help Center
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-aps-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-aps-gray-400">
            © 2025 Akshya Patra Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;