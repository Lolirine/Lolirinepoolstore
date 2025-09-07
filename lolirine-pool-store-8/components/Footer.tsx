import React from 'react';
import { FooterProps } from '../types';
import { MessageSquare, Mail, Phone, Facebook, Linkedin, Home, Instagram, ChevronUp } from 'lucide-react';
import MaestroIcon from './icons/MaestroIcon';
import PaypalIcon from './icons/PaypalIcon';
import MastercardIcon from './icons/MastercardIcon';

const Footer: React.FC<FooterProps> = ({ navigateTo, onOpenRegisterModal }) => {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-cyan-50/70 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Liens utiles */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-cyan-800 mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('home')} className="text-gray-600 hover:text-cyan-600 transition-colors">Page d'accueil</button></li>
              <li><button onClick={() => navigateTo('about')} className="text-gray-600 hover:text-cyan-600 transition-colors">À propos de nous</button></li>
              <li><button onClick={() => navigateTo('faq')} className="text-gray-600 hover:text-cyan-600 transition-colors">FAQ</button></li>
              <li><button onClick={() => navigateTo('services')} className="text-gray-600 hover:text-cyan-600 transition-colors">Services</button></li>
              <li><button onClick={() => navigateTo('terms')} className="text-gray-600 hover:text-cyan-600 transition-colors">Conditions générales de vente</button></li>
              <li><button onClick={() => navigateTo('privacy')} className="text-gray-600 hover:text-cyan-600 transition-colors">Politique vie privée</button></li>
              <li><button onClick={() => navigateTo('cookies')} className="text-gray-600 hover:text-cyan-600 transition-colors">Cookies</button></li>
              <li><button onClick={() => navigateTo('legal')} className="text-gray-600 hover:text-cyan-600 transition-colors">Mentions légales</button></li>
              <li><button onClick={() => navigateTo('contact')} className="text-gray-600 hover:text-cyan-600 transition-colors">Contactez-nous</button></li>
            </ul>
          </div>

          {/* À propos de nous */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-cyan-800 mb-4">À propos de nous</h3>
            <p className="text-gray-600 text-sm mb-4">
              Nous sommes une équipe de passionnés dédiée à rendre l'entretien et l'aménagement de votre piscine plus simple et agréable grâce à des produits innovants. Nous proposons en ligne une sélection de matériel de haute qualité pour répondre aux besoins spécifiques des propriétaires de piscines.
            </p>
             <p className="text-gray-600 text-sm mb-4">
              Nos équipements sont conçus pour les particuliers et professionnels souhaitant optimiser leurs installations et profiter pleinement de leur espace aquatique.
            </p>
            <button onClick={onOpenRegisterModal} className="text-cyan-600 font-semibold hover:underline text-sm">S'inscrire</button>
          </div>
          
          {/* Rejoignez-nous */}
          <div>
            <h3 className="text-lg font-bold text-cyan-800 mb-4">Rejoignez-nous</h3>
            <ul className="space-y-3 text-sm mb-6">
               <li className="flex items-center space-x-3">
                <MessageSquare size={18} className="text-cyan-600" />
                <button onClick={() => navigateTo('contact')} className="text-gray-600 hover:text-cyan-600 transition-colors">Contactez-nous</button>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-cyan-600" />
                <a href="mailto:info@lolirine-pool.odoo.com" className="text-gray-600 hover:text-cyan-600 transition-colors">info@lolirine-pool.odoo.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-cyan-600" />
                <a href="tel:+32497444146" className="text-gray-600 hover:text-cyan-600 transition-colors">+32 497 44 41 46</a>
              </li>
            </ul>
            <div className="flex items-center space-x-3 mb-6">
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"><Facebook size={20} className="text-blue-600" /></a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"><Linkedin size={20} className="text-blue-700" /></a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"><Home size={20} className="text-gray-800" /></a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"><Instagram size={20} className="text-pink-500" /></a>
            </div>
            <div className="flex items-center space-x-2">
              <MaestroIcon className="h-8"/>
              <PaypalIcon className="h-8"/>
              <MastercardIcon className="h-8"/>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200/70 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 relative">
              <div className="text-center sm:text-left">
                  <p onClick={() => navigateTo('admin')} className="cursor-pointer hover:text-cyan-600 transition-colors" title="Accès administrateur">Copyright © Lolirine Pool Store</p>
                  <p className="text-xs text-gray-500">Tous les prix sont affichés TVAC 21% incluse.</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <a href="#" className="hover:underline">Nederlands</a>
                  <span>|</span>
                  <a href="#" className="hover:underline">English (UK)</a>
                   <span>|</span>
                  <a href="#" className="font-bold hover:underline">Français (BE)</a>
              </div>
              <button onClick={scrollToTop} className="absolute -top-10 right-4 sm:right-0 bg-cyan-600 hover:bg-cyan-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1">
                <ChevronUp size={24} />
              </button>
          </div>
      </div>
    </footer>
  );
};

export default Footer;