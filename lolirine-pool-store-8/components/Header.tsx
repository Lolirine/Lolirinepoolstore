import React, { useState, useEffect, useRef } from 'react';
import { HeaderProps, NavLink as NavLinkType, Page, Service } from '../types';
import { Menu, X, User, ShoppingCart, Search, Heart, ChevronDown, List, ArrowRight } from 'lucide-react';

const InfoBanner: React.FC<{ config: HeaderProps['bannerConfig'] }> = ({ config }) => {
  if (!config.isVisible) return null;
  return (
    <div 
      style={{ backgroundColor: config.backgroundColor || '#cffafe' }}
      className="text-cyan-800 text-center p-2 text-sm"
      dangerouslySetInnerHTML={{ __html: config.text }} 
    />
  );
};

const MegaMenu: React.FC<Pick<HeaderProps, 'navigateTo' | 'services' | 'shopCategories' | 'wellnessCategories'> & { closeMenu: () => void }> = 
  ({ navigateTo, services, shopCategories, wellnessCategories, closeMenu }) => {

  const handleNavigate = (page: Page, options?: { categoryFilter?: string }) => {
    navigateTo(page, options);
    closeMenu();
  };
  
  const MegaMenuColumn: React.FC<{title: string, items: NavLinkType[], page: Page}> = ({title, items, page}) => (
    <div className="flex-1">
      <h3 className="font-bold text-gray-800 mb-4 px-4">{title}</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item.id}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate(page, { categoryFilter: item.categoryFilter }); }}
               className="block px-4 py-2 text-sm text-gray-600 hover:bg-cyan-50 rounded-md">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40 animate-slide-in-top border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <MegaMenuColumn title="Boutique" items={shopCategories} page="shop" />
        <MegaMenuColumn title="Espace Wellness" items={wellnessCategories} page="wellness" />
        <div>
           <h3 className="font-bold text-gray-800 mb-4 px-4">Nos Services</h3>
           <ul className="space-y-1">
            {services.map(service => (
              <li key={service.page}>
                 <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate(service.page); }}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-cyan-50 rounded-md">
                    {service.title}
                 </a>
              </li>
            ))}
           </ul>
        </div>
        <div className="bg-cover bg-center rounded-lg p-6 flex flex-col justify-end text-white" 
             style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan2.jpg')" }}>
          <h3 className="text-2xl font-bold" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>Promotions Exclusives</h3>
          <p className="text-sm my-2" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>Découvrez nos meilleures offres du moment !</p>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('promotions'); }} className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center self-start">
            J'en profite <ArrowRight size={16} className="ml-2"/>
          </a>
        </div>
      </div>
    </div>
  );
};

const MobileMenu: React.FC<HeaderProps & { isOpen: boolean; closeMenu: () => void }> = (props) => {
    const { isOpen, closeMenu, navigateTo, menuConfig } = props;

    const handleNavigate = (page: Page, options?: { categoryFilter?: string }) => {
        navigateTo(page, options);
        closeMenu();
    };
    
    const renderCategorySubmenu = (items: NavLinkType[], page: Page) => (
      <div className="pl-4 border-l ml-4">
        {items.map(item => (
          <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); handleNavigate(page, {categoryFilter: item.categoryFilter}); }}
             className="block py-2 text-gray-600 hover:text-cyan-600">{item.label}</a>
        ))}
      </div>
    );

    return (
        <div className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={closeMenu}></div>
            <div className="relative w-full max-w-sm h-full bg-white shadow-lg flex flex-col ml-auto">
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-bold text-lg">Menu</h2>
                    <button onClick={closeMenu}><X/></button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuConfig.links.map(link => (
                      <a key={link.id} href="#" onClick={(e) => { e.preventDefault(); if (link.page) handleNavigate(link.page); }}
                         className="block py-2 px-3 font-semibold text-gray-700 hover:bg-gray-100 rounded-md">{link.label}</a>
                    ))}
                    <details className="group">
                        <summary className="py-2 px-3 font-semibold text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer list-none flex justify-between items-center">
                          Boutique
                          <ChevronDown className="group-open:rotate-180 transition-transform" />
                        </summary>
                        {renderCategorySubmenu(props.shopCategories, 'shop')}
                    </details>
                     <details className="group">
                        <summary className="py-2 px-3 font-semibold text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer list-none flex justify-between items-center">
                          Espace Wellness
                          <ChevronDown className="group-open:rotate-180 transition-transform" />
                        </summary>
                        {renderCategorySubmenu(props.wellnessCategories, 'wellness')}
                    </details>
                    <details className="group">
                        <summary className="py-2 px-3 font-semibold text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer list-none flex justify-between items-center">
                          Nos Services
                          <ChevronDown className="group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="pl-4 border-l ml-4">
                          {props.services.map(service => (
                             <a key={service.page} href="#" onClick={(e) => { e.preventDefault(); handleNavigate(service.page); }}
                                className="block py-2 text-gray-600 hover:text-cyan-600">{service.title}</a>
                          ))}
                        </div>
                    </details>
                </nav>
            </div>
        </div>
    );
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { currentPage, navigateTo, cartItemCount, wishlistItemCount, onCartClick, currentUser, onLoginClick, onLogoutClick, bannerConfig, menuConfig } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const megaMenuTimeoutRef = useRef<number | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo('shop', { searchQuery: searchTerm.trim() });
      setSearchTerm('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };
  
  const handleMegaMenuLeave = () => {
     megaMenuTimeoutRef.current = window.setTimeout(() => {
        setIsMegaMenuOpen(false);
     }, 300); // Delay to allow moving mouse to menu
  };

  const isTransparent = currentPage === 'home' && !scrolled;

  return (
    <>
    <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${scrolled ? 'pt-0' : 'pt-8'}`}>
      <InfoBanner config={bannerConfig} />
      
      {/* Main Header Container */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isTransparent ? 'bg-opacity-20 backdrop-blur-sm' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tier 1: Main Actions */}
            <div className="flex items-center h-20">
                {/* Logo */}
                <button onClick={() => navigateTo('home')} className="flex-shrink-0">
                    <img src="https://lolirine-pool.odoo.com/web/image/website/1/logo/Lolirine%20Pool%20Store?unique=b561c22" alt="Lolirine Pool Store" className="h-16 w-auto"/>
                </button>
                
                {/* Mega Menu Trigger */}
                <div className="hidden lg:block ml-6" onMouseEnter={handleMegaMenuEnter} onMouseLeave={handleMegaMenuLeave}>
                    <button className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${isTransparent ? 'bg-black/20 text-white hover:bg-black/40' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                        <List size={20} />
                        Toutes nos catégories
                    </button>
                </div>
                
                {/* Search Bar */}
                <div className="flex-1 mx-6 hidden lg:block">
                     <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                           type="text"
                           placeholder="Rechercher un produit, une marque..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full pl-5 pr-12 py-3.5 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 text-sm"
                       />
                       <button type="submit" aria-label="Rechercher" title="Lancer la recherche" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600">
                           <Search size={20} />
                       </button>
                   </form>
                </div>

                {/* Right side icons & actions */}
                <div className="flex items-center gap-4 ml-auto">
                     <div className="relative hidden lg:block">
                        <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)} 
                                title="Mon compte et mes listes"
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
                            <User size={24}/>
                            <div className="text-left text-xs">
                                <p className="leading-tight">Bonjour, {currentUser ? currentUser.name.split(' ')[0] : 'identifiez-vous'}</p>
                                <p className="font-bold leading-tight flex items-center">Compte et listes <ChevronDown size={14}/></p>
                            </div>
                        </button>
                        {isUserMenuOpen && (
                             <div onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}
                                  className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 z-50 text-gray-700">
                                {currentUser ? (
                                <>
                                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('client'); }} className="block px-4 py-2 text-sm hover:bg-gray-100">Mon Compte</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('client'); }} className="block px-4 py-2 text-sm hover:bg-gray-100">Mes Commandes</a>
                                    <div className="my-1 border-t"></div>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onLogoutClick(); }} className="block px-4 py-2 text-sm hover:bg-gray-100">Se déconnecter</a>
                                </>
                                ) : (
                                  <div className="p-2">
                                     <button onClick={onLoginClick} className="w-full bg-yellow-400 text-black font-semibold text-sm py-2 rounded-md hover:bg-yellow-500">Se connecter</button>
                                     <p className="text-xs text-center mt-2">Nouveau client ? <button onClick={() => { onLoginClick(); /* This should switch to register */ }} className="text-cyan-600 hover:underline">Commencez ici.</button></p>
                                  </div>
                                )}
                             </div>
                        )}
                    </div>
                    <button onClick={() => navigateTo('wishlist')} className="relative" title="Ma liste de souhaits" aria-label={`Liste de souhaits, ${wishlistItemCount} articles`}>
                      <Heart className={`w-7 h-7 transition-colors ${isTransparent ? 'text-white' : 'text-gray-600 hover:text-cyan-600'}`} />
                      {wishlistItemCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{wishlistItemCount}</span>}
                  </button>
                  <button onClick={onCartClick} className="relative" title="Mon panier" aria-label={`Panier, ${cartItemCount} articles`}>
                      <ShoppingCart className={`w-7 h-7 transition-colors ${isTransparent ? 'text-white' : 'text-gray-600 hover:text-cyan-600'}`} />
                      {cartItemCount > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartItemCount}</span>}
                  </button>
                  <button onClick={() => setIsMenuOpen(true)} className="lg:hidden" title="Ouvrir le menu" aria-label="Ouvrir le menu">
                     <Menu className={`w-7 h-7 ${isTransparent ? 'text-white' : 'text-gray-600'}`} />
                  </button>
                </div>
            </div>
            
            {/* Tier 2: Sub Navigation */}
            <div className="hidden lg:flex items-center h-12 border-t" style={{borderColor: isTransparent ? 'rgba(255,255,255,0.2)' : 'rgba(229, 231, 235, 1)'}}>
              <nav className="flex items-center gap-2">
                {menuConfig.links.map(link => {
                  const isPromo = link.customStyle === 'promo';
                  return (
                    <a key={link.id} href="#" onClick={(e) => {e.preventDefault(); if (link.page) navigateTo(link.page)}}
                       className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                          isPromo ? 'bg-red-500 text-white hover:bg-red-600' : 
                          isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                       }`}>
                      {link.label}
                    </a>
                  )
                })}
              </nav>
              <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('contact')}}
                 className="ml-auto font-bold py-2 px-4 rounded-md transition-colors bg-white text-cyan-700 hover:bg-gray-200 shadow">
                Prenez rendez-vous
              </a>
            </div>
        </div>
        {isMegaMenuOpen && (
          <div onMouseEnter={handleMegaMenuEnter} onMouseLeave={handleMegaMenuLeave}>
            <MegaMenu {...props} closeMenu={() => setIsMegaMenuOpen(false)}/>
          </div>
        )}
      </div>
    </header>
    <MobileMenu {...props} isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;