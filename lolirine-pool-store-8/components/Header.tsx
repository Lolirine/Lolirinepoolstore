
import React, { useState, useEffect, useRef } from 'react';
import { HeaderProps, NavLink as NavLinkType, Page, InfoBannerConfig, NavLinkStyle } from '../types';
import { Menu, X, User, ShoppingCart, Search, Heart, ChevronDown, Facebook, Twitter, Linkedin, Instagram, ChevronRight } from 'lucide-react';

const InfoBanner: React.FC<{ config: InfoBannerConfig }> = ({ config }) => {
  if (!config.isVisible) {
    return null;
  }
  return (
    <div 
      style={{ backgroundColor: config.backgroundColor || '#cffafe' }}
      className="text-cyan-800 text-center p-3 text-sm"
    >
      <div className="container mx-auto" dangerouslySetInnerHTML={{ __html: config.text }} />
    </div>
  );
};

const DesktopDropdownItem: React.FC<{ item: NavLinkType; navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void; isWellness?: boolean; isShop?: boolean; isServices?: boolean; }> = ({ item, navigateTo, isWellness, isShop, isServices }) => {
    const hasChildren = item.children && item.children.length > 0;

    const handleNavigate = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.page) {
            navigateTo(item.page, { categoryFilter: item.categoryFilter });
        } else if (item.href) {
            window.location.href = item.href;
        }
    };
    
    const getBaseClasses = () => {
        if (isWellness) return { text: 'text-white', hoverBg: 'hover:bg-cyan-600', subMenuBg: 'bg-cyan-500', chevron: 'text-cyan-200', hoverText: '' };
        if (isShop) return { text: 'text-white', hoverBg: 'hover:bg-orange-700', subMenuBg: 'bg-orange-600', chevron: 'text-orange-200', hoverText: '' };
        if (isServices) return { text: 'text-white', hoverBg: 'hover:bg-sky-600', subMenuBg: 'bg-sky-500', chevron: 'text-sky-200', hoverText: '' };
        return { text: 'text-gray-700', hoverBg: 'hover:bg-gray-100', hoverText: 'hover:text-cyan-600', subMenuBg: 'bg-white', chevron: 'text-gray-400' };
    };

    const classes = getBaseClasses();
    const textColor = classes.text;
    const hoverBg = classes.hoverBg;
    const hoverText = classes.hoverText;
    const subMenuBg = classes.subMenuBg;
    const chevronColor = classes.chevron;

    if (hasChildren) {
        return (
            <div className="relative group/submenu">
                <a href="#" onClick={handleNavigate} className={`w-full flex justify-between items-center px-4 py-2 text-sm ${textColor} ${hoverBg} ${hoverText} cursor-pointer`}>
                    <span>{item.label}</span>
                    <ChevronRight size={14} className={chevronColor} />
                </a>
                <div className={`absolute top-0 left-full mt-[-8px] ml-1 w-56 rounded-md shadow-lg opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-300 z-50 ${subMenuBg}`}>
                    <div className="py-2">
                        {item.children?.map((child) => (
                           <DesktopDropdownItem key={child.id} item={child} navigateTo={navigateTo} isWellness={isWellness} isShop={isShop} isServices={isServices} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
    return (
         <a href="#" onClick={handleNavigate} className={`block px-4 py-2 text-sm ${textColor} ${hoverBg} ${hoverText}`}>
            {item.label}
        </a>
    );
};


const getButtonClasses = (style: NavLinkStyle, isTransparent: boolean, customStyle?: NavLinkType['customStyle']): string => {
    const baseClasses = 'flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg';
    
    if (customStyle === 'promo') {
        return `${baseClasses} text-white bg-red-500 hover:bg-red-600 shadow-sm`;
    }

    switch (style) {
        case 'outline':
            return `${baseClasses} border ${isTransparent ? 'text-white border-white/50 hover:bg-white/20' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`;
        case 'pill':
            return `${baseClasses} rounded-full ${isTransparent ? 'text-white bg-cyan-500/80 hover:bg-cyan-500' : 'text-white bg-cyan-600 hover:bg-cyan-700'}`;
        case 'default':
        default:
            return `${baseClasses} ${isTransparent ? 'text-white bg-white/10 hover:bg-cyan-500/40 backdrop-blur-sm' : 'text-gray-700 hover:bg-cyan-100 hover:text-cyan-600'}`;
    }
};

const NavLink: React.FC<{ link: NavLinkType; navigateTo: HeaderProps['navigateTo']; isMobile?: boolean; closeMenu?: () => void; isTransparent: boolean; linkStyle: NavLinkStyle; }> = ({ link, navigateTo, isMobile, closeMenu, isTransparent, linkStyle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hasChildren = link.children && link.children.length > 0;
  const isWellness = link.id === 'wellness';
  const isShop = link.id === 'shop';
  const isServices = link.id === 'services';

  const handleNavigate = (e: React.MouseEvent, targetLink: NavLinkType) => {
    e.preventDefault();
    if (targetLink.page) {
        navigateTo(targetLink.page, { categoryFilter: targetLink.categoryFilter });
    } else if (targetLink.href) {
        window.location.href = targetLink.href;
    }
    if (closeMenu) closeMenu();
  }

  const handleParentClick = (e: React.MouseEvent) => {
    if (isMobile && hasChildren) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
      return;
    }
    
    // For non-mobile with children, let the dropdown handle it.
    // For items without children (mobile or desktop), navigate.
    if (!hasChildren) {
        handleNavigate(e, link);
    }
  };
  
    const getDropdownBgClass = () => {
        if (isWellness) return 'bg-cyan-500';
        if (isShop) return 'bg-orange-600';
        if (isServices) return 'bg-sky-500';
        return 'bg-white';
    };

  if (isMobile) {
    if (link.customStyle === 'promo') {
      return (
        <div className="p-2">
          <a href="#" onClick={(e) => handleNavigate(e, link)} className="block p-3 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md text-center">
            {link.label}
          </a>
        </div>
      )
    }
    if (hasChildren) {
        return (
            <div className="border-b border-gray-200">
                <div className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-700">
                    <a 
                      href="#" 
                      onClick={(e) => handleNavigate(e, link)}
                      className="flex-grow"
                    >
                        {link.label}
                    </a>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="p-2 -mr-2"
                    >
                        <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className="pl-4 bg-gray-50">
                        {link.children?.map((child) => (
                            <NavLink 
                                key={child.id} 
                                link={child} 
                                navigateTo={navigateTo} 
                                isMobile={true} 
                                closeMenu={closeMenu} 
                                isTransparent={false}
                                linkStyle={linkStyle}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
    // Leaf node
    return (
        <a href="#" onClick={(e) => handleNavigate(e, link)} className="block p-3 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            {link.label}
        </a>
    );
  }

  return (
    <div className="relative group">
      <button onClick={handleParentClick} className={getButtonClasses(linkStyle, isTransparent, link.customStyle)}>
        {link.label}
        {hasChildren && <ChevronDown className="w-4 h-4" />}
      </button>
      {hasChildren && (
        <div className={`absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50 ${getDropdownBgClass()}`}>
          <div className="py-2">
            {link.children?.map((child) => (
              <DesktopDropdownItem key={child.id} item={child} navigateTo={navigateTo} isWellness={isWellness} isShop={isShop} isServices={isServices} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo, cartItemCount, wishlistItemCount, onCartClick, currentUser, onLoginClick, onLogoutClick, bannerConfig, menuConfig }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [scrolled, setScrolled] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo('shop', { searchQuery: searchTerm.trim() });
      setSearchTerm('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isTransparent = currentPage === 'home' && !scrolled;
  const textShadowStyle = isTransparent ? { textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : {};

  return (
    <header className="fixed w-full top-0 z-50">
      <InfoBanner config={bannerConfig} />
      {/* Top Bar */}
      <div className="bg-cyan-500 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
           <div className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-gray-200 transition-colors"><Facebook size={16}/></a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors"><Twitter size={16}/></a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors"><Linkedin size={16}/></a>
              <a href="#" className="text-white hover:text-gray-200 transition-colors"><Instagram size={16}/></a>
           </div>
           <div className="hidden md:flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative">
                   <form onSubmit={handleSearchSubmit}>
                       <input
                           type="text"
                           placeholder="Rechercher un produit..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="rounded-full pl-5 pr-12 py-2.5 w-80 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-sm bg-cyan-600 text-white placeholder-cyan-100"
                       />
                       <button type="submit" aria-label="Rechercher" className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-200 hover:text-white">
                           <Search size={18} />
                       </button>
                   </form>
                </div>
                {/* Call Us Component */}
                <div className="flex items-center gap-3">
                    <a href="tel:+32497444146" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md whitespace-nowrap">
                        +32 497 44 41 46
                    </a>
                    <div className="text-white text-sm">
                        <p className="font-semibold whitespace-nowrap">Du lundi au vendredi, 9h-18h</p>
                        <p className="text-gray-200">(Appel gratuit)</p>
                    </div>
                </div>
           </div>
           <div className="flex items-center gap-4 text-xs text-white">
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
                <User size={16}/>
                <span>{currentUser ? currentUser.name.split(' ')[0] : 'Mon Compte'}</span>
                <ChevronDown size={14}/>
              </button>
              {isUserMenuOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-gray-700">
                    {currentUser ? (
                      <>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('client'); setIsUserMenuOpen(false); }} className="block px-4 py-2 text-sm hover:bg-gray-100">Mon Profil</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onLogoutClick(); setIsUserMenuOpen(false); }} className="block px-4 py-2 text-sm hover:bg-gray-100">Se déconnecter</a>
                      </>
                    ) : (
                      <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); setIsUserMenuOpen(false); }} className="block px-4 py-2 text-sm hover:bg-gray-100">Se connecter</a>
                    )}
                 </div>
              )}
            </div>
            <button
              onClick={() => navigateTo('contact')}
              className="font-bold py-2 px-4 rounded-md transition-colors bg-white text-cyan-700 hover:bg-gray-200 shadow"
            >
              Prenez rendez-vous
            </button>
           </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`transition-colors duration-300 ${isTransparent ? 'bg-black/20 border-t border-white/10' : 'bg-white shadow-sm'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-32">
            <div className="flex items-center">
                <button onClick={() => navigateTo('home')} className="flex items-center space-x-2">
                    <div className={`transition-all duration-300 ease-in-out rounded-xl ${isTransparent ? 'p-0' : 'p-2 bg-white'}`}>
                        <img src="https://lolirine-pool.odoo.com/web/image/website/1/logo/Lolirine%20Pool%20Store?unique=b561c22" alt="Lolirine Pool Store" className="h-20 w-auto" />
                    </div>
                </button>
            </div>
             <nav className="hidden lg:flex items-center space-x-2">
                 {menuConfig.links.map(link => <NavLink key={link.id} link={link} navigateTo={navigateTo} isTransparent={isTransparent} linkStyle={menuConfig.style} />)}
             </nav>
              <div className="flex items-center gap-4">
                  <button onClick={() => navigateTo('wishlist')} className="relative" aria-label={`Liste de souhaits, ${wishlistItemCount} articles`}>
                      <Heart className={`w-6 h-6 transition-colors ${isTransparent ? 'text-white' : 'text-gray-600 hover:text-cyan-600'}`} style={textShadowStyle} />
                      {wishlistItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{wishlistItemCount}</span>}
                  </button>
                  <button onClick={onCartClick} className="relative" aria-label={`Panier, ${cartItemCount} articles`}>
                      <ShoppingCart className={`w-6 h-6 transition-colors ${isTransparent ? 'text-white' : 'text-gray-600 hover:text-cyan-600'}`} style={textShadowStyle} />
                      {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartItemCount}</span>}
                  </button>
                  <button onClick={() => setIsMenuOpen(true)} className="lg:hidden" aria-label="Ouvrir le menu">
                     <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-gray-600'}`} style={textShadowStyle} />
                  </button>
              </div>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-full max-w-sm h-full bg-white shadow-lg flex flex-col">
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-bold">Menu</h2>
                    <button onClick={() => setIsMenuOpen(false)}><X/></button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                    {menuConfig.links.map(link => <NavLink key={link.id} link={link} navigateTo={navigateTo} isMobile={true} closeMenu={() => setIsMenuOpen(false)} isTransparent={false} linkStyle={menuConfig.style} />)}
                </nav>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
