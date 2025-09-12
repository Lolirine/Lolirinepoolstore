
import React, { useState, useCallback, useEffect } from 'react';
// FIX: Changed import to named import as Header is not a default export.
import { Header } from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ShopPage from './pages/ShopPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import ClientAreaPage from './pages/ClientAreaPage';
import AdminLoginModal from './components/AdminLoginModal';
import ClientLoginModal from './components/ClientLoginModal';
import ClientRegisterModal from './components/ClientRegisterModal';
import CartModal from './components/CartModal';
import FaqPage from './pages/FaqPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPage from './pages/CookiesPage';
import LegalNoticePage from './pages/LegalNoticePage';
import WellnessPage from './pages/WellnessPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import RepairsPage from './pages/RepairsPage';
import ConstructionPage from './pages/ConstructionPage';
import WaterAnalysisPage from './pages/WaterAnalysisPage';
import WinterizationPage from './pages/WinterizationPage';
import CookieConsent from './components/CookieConsent';
import EmailNotificationManager from './components/EmailNotificationManager';
import { ProductsCarousel } from './components/ProductCard';
import PromotionalPopup from './components/PromotionalPopup';
import { Page, UserAccount, Product, CartItem, Order, Review, Supplier, Invoice, PaymentMethod, EmailTemplate, Notification, PurchaseOrder, InfoBannerConfig, PopupConfig, MenuConfig, NavLink } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_SUPPLIERS, INITIAL_INVOICES, INITIAL_PAYMENT_METHODS, INITIAL_EMAIL_TEMPLATES, INITIAL_USERS, SERVICES, WELLNESS_SUB_CATEGORIES, PORTFOLIO_ITEMS, BLOG_POSTS } from './constants';
import { EmailService } from './utils/emailService';
import ServicesOverviewPage from './pages/ServicesOverviewPage';
import WhatsAppButton from './components/WhatsAppButton';
import AiAssistantButton from './components/AiAssistantButton';
// FIX: Changed import to named import as AiAssistantWidget is not a default export.
import { AiAssistantWidget } from './components/AiAssistantWidget';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [history, setHistory] = useState<Page[]>(['home']);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string | undefined>();
  const [shopSearchQuery, setShopSearchQuery] = useState<string | undefined>();
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  
  // Product state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Order state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

    // Purchase Order state
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  // Supplier State
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);

  // Invoice State
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  
  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  
  // Email Templates State
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(INITIAL_EMAIL_TEMPLATES);

  // Admin auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Client auth and registration state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [isClientLoginModalOpen, setIsClientLoginModalOpen] = useState(false);
  const [isClientRegisterModalOpen, setIsClientRegisterModalOpen] = useState(false);

  // Recently viewed products state
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Cookie Consent State
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  
  // Notifications State for email simulation
  const [notifications, setNotifications] = useState<Notification[]>([]);

    // AI Assistant state
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Info Banner State
  const [infoBanner, setInfoBanner] = useState<InfoBannerConfig>({
    isVisible: true,
    text: `<p><span role="img" aria-label="sun">☀️</span> Même pendant les vacances, nous sommes à votre service. Tous nos magasins reste ouverts entre le 21/07 et le 9/08, avec des heures d'ouverture ajustées de 9h à 13h.&nbsp;<strong class="font-semibold">Notre boutique en ligne est disponible 24/7 quand et où vous le souhaitez.</strong> 😉</p>`,
    backgroundColor: '#cffafe' // cyan-100
  });

  // Promotional Popups State
  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [activePopup, setActivePopup] = useState<PopupConfig | null>(null);

  // Menu Config State
  const [menuConfig, setMenuConfig] = useState<MenuConfig>({
    style: 'default',
    links: [
        { id: 'home', label: 'Accueil', page: 'home' },
        {
          id: 'wellness',
          label: 'Espace Wellness',
          page: 'wellness',
          children: WELLNESS_SUB_CATEGORIES.map((item, index) => ({ ...item, id: `wellness-${index}`}))
        },
        {
          id: 'shop',
          label: 'Boutique Piscine',
          page: 'shop',
          children: [
            { id: 'shop-all', label: 'Voir toute la boutique', page: 'shop' },
            { 
              id: 'shop-cleaning', 
              label: 'Nettoyage', 
              page: 'shop', 
              categoryFilter: 'Nettoyage',
              children: [
                { id: 'shop-cleaning-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Nettoyage' },
                { 
                  id: 'shop-cleaning-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Nettoyage',
                  children: [
                    { id: 'shop-cleaning-brand-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Nettoyage - Zodiac' },
                  ]
                },
                { 
                  id: 'shop-cleaning-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Nettoyage',
                  children: [
                    { id: 'shop-cleaning-type-private', label: 'Robots Piscine Privée', page: 'shop', categoryFilter: 'Nettoyage - Robots Piscine Privée' },
                    { id: 'shop-cleaning-type-public', label: 'Robots Piscine Publique', page: 'shop', categoryFilter: 'Nettoyage - Robots Piscine Publique' },
                    { id: 'shop-cleaning-type-hydraulic', label: 'Robots Hydrauliques', page: 'shop', categoryFilter: 'Nettoyage - Robots Hydrauliques' },
                    { id: 'shop-cleaning-type-accessories', label: 'Accessoires de Nettoyage', page: 'shop', categoryFilter: 'Nettoyage - Accessoires' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-filtration', 
              label: 'Filtration', 
              page: 'shop', 
              categoryFilter: 'Filtration',
              children: [
                { id: 'shop-filtration-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Filtration' },
                { 
                  id: 'shop-filtration-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Filtration',
                  children: [
                    { id: 'shop-filtration-brand-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Filtration - Zodiac' },
                    { id: 'shop-filtration-brand-astral', label: 'AstralPool', page: 'shop', categoryFilter: 'Filtration - AstralPool' },
                    { id: 'shop-filtration-brand-bering', label: 'Bering', page: 'shop', categoryFilter: 'Filtration - Bering' },
                  ]
                },
                { 
                  id: 'shop-filtration-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Filtration',
                  children: [
                    { id: 'shop-filtration-type-cartridges', label: 'Cartouches', page: 'shop', categoryFilter: 'Filtration - Cartouches' },
                    { id: 'shop-filtration-type-filters', label: 'Filtres', page: 'shop', categoryFilter: 'Filtration - Filtres' },
                    { id: 'shop-filtration-type-media', label: 'Charges Filtrantes', page: 'shop', categoryFilter: 'Filtration - Charges' },
                    { id: 'shop-filtration-type-pumps', label: 'Pompes de Filtration', page: 'shop', categoryFilter: 'Filtration - Pompes' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-pumps', 
              label: 'Pompes', 
              page: 'shop', 
              categoryFilter: 'Pompes',
              children: [
                { id: 'shop-pumps-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Pompes' },
                { 
                  id: 'shop-pumps-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Pompes',
                  children: [
                    { id: 'shop-pumps-brand-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Pompes - Zodiac' },
                    { id: 'shop-pumps-brand-astral', label: 'AstralPool', page: 'shop', categoryFilter: 'Pompes - AstralPool' },
                    { id: 'shop-pumps-brand-bering', label: 'Bering', page: 'shop', categoryFilter: 'Pompes - Bering' },
                    { id: 'shop-pumps-brand-polaris', label: 'Polaris', page: 'shop', categoryFilter: 'Pompes - Polaris' },
                  ]
                },
                { 
                  id: 'shop-pumps-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Pompes',
                  children: [
                    { id: 'shop-pumps-type-variable', label: 'Pompes à Vitesse Variable', page: 'shop', categoryFilter: 'Pompes - Vitesse Variable' },
                    { id: 'shop-pumps-type-ncc', label: 'Nage à Contre-Courant', page: 'shop', categoryFilter: 'Pompes - Nage à Contre-Courant' },
                    { id: 'shop-pumps-type-booster', label: 'Surpresseurs', page: 'shop', categoryFilter: 'Pompes - Surpresseurs' },
                    { id: 'shop-pumps-type-blower', label: 'Blowers Spa', page: 'shop', categoryFilter: 'Pompes - Blowers Spa' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-watertreat', 
              label: 'Traitement de l\'eau', 
              page: 'shop', 
              categoryFilter: 'Traitement de l\'eau',
              children: [
                { id: 'shop-watertreat-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Traitement de l\'eau' },
                { 
                  id: 'shop-watertreat-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Traitement de l\'eau',
                  children: [
                    { id: 'shop-watertreat-brand-ctx', label: 'CTX Pro', page: 'shop', categoryFilter: 'Traitement de l\'eau - CTX Pro' },
                  ]
                },
                { 
                  id: 'shop-watertreat-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Traitement de l\'eau',
                  children: [
                    { id: 'shop-watertreat-type-balance', label: 'Équilibre de l\'eau', page: 'shop', categoryFilter: 'Traitement de l\'eau - Équilibre de l\'eau' },
                    { id: 'shop-watertreat-type-disinfection', label: 'Désinfection', page: 'shop', categoryFilter: 'Traitement de l\'eau - Désinfection' },
                    { id: 'shop-watertreat-type-prevention', label: 'Prévention', page: 'shop', categoryFilter: 'Traitement de l\'eau - Prévention' },
                    { id: 'shop-watertreat-type-floc', label: 'Floculants', page: 'shop', categoryFilter: 'Traitement de l\'eau - Floculants' },
                    { id: 'shop-watertreat-type-maintenance', label: 'Entretien & Nettoyage', page: 'shop', categoryFilter: 'Traitement de l\'eau - Entretien & Nettoyage' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-measurement', 
              label: 'Instruments de mesure', 
              page: 'shop', 
              categoryFilter: 'Instruments de mesure',
              children: [
                { id: 'shop-measurement-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Instruments de mesure' },
                { 
                  id: 'shop-measurement-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Instruments de mesure',
                  children: [
                    { id: 'shop-measurement-brand-astral', label: 'AstralPool', page: 'shop', categoryFilter: 'Instruments de mesure - AstralPool' },
                  ]
                },
                { 
                  id: 'shop-measurement-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Instruments de mesure',
                  children: [
                    { id: 'shop-measurement-type-connected', label: 'Analyseurs Connectés', page: 'shop', categoryFilter: 'Instruments de mesure - Analyseurs Connectés' },
                    { id: 'shop-measurement-type-strips', label: 'Bandelettes', page: 'shop', categoryFilter: 'Instruments de mesure - Bandelettes' },
                    { id: 'shop-measurement-type-electronic', label: 'Testeurs Électroniques', page: 'shop', categoryFilter: 'Instruments de mesure - Testeurs Électroniques' },
                    { id: 'shop-measurement-type-kits', label: 'Trousses & Photomètres', page: 'shop', categoryFilter: 'Instruments de mesure - Trousses & Photomètres' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-electrical', 
              label: 'Matériel Électrique', 
              page: 'shop', 
              categoryFilter: 'Matériel Électrique',
              children: [
                { id: 'shop-electrical-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Matériel Électrique' },
                { id: 'shop-electrical-boxes', label: 'Coffrets Électriques', page: 'shop', categoryFilter: 'Matériel Électrique - Coffrets Électriques' },
                { id: 'shop-electrical-lamps', label: 'Lampes', page: 'shop', categoryFilter: 'Matériel Électrique - Lampes' },
                { id: 'shop-electrical-accessories', label: 'Accessoires Électriques', page: 'shop', categoryFilter: 'Matériel Électrique - Accessoires Électriques' },
              ]
            },
            { 
              id: 'shop-sealing', 
              label: 'Pièces à sceller', 
              page: 'shop', 
              categoryFilter: 'Pièces à sceller',
              children: [
                { id: 'shop-sealing-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Pièces à sceller' },
                { 
                  id: 'shop-sealing-range', 
                  label: 'Par Gamme', 
                  page: 'shop', 
                  categoryFilter: 'Pièces à sceller',
                  children: [
                    { id: 'shop-sealing-range-unik', label: 'SKIMMER UNIK', page: 'shop', categoryFilter: 'Pièces à sceller - UNIK' },
                    { id: 'shop-sealing-range-norm', label: 'NORM', page: 'shop', categoryFilter: 'Pièces à sceller - NORM' },
                    { id: 'shop-sealing-range-prestige', label: 'PRESTIGE', page: 'shop', categoryFilter: 'Pièces à sceller - PRESTIGE' },
                    { id: 'shop-sealing-range-standard', label: 'STANDARD', page: 'shop', categoryFilter: 'Pièces à sceller - STANDARD' },
                    { id: 'shop-sealing-range-easy', label: 'EASY LINE', page: 'shop', categoryFilter: 'Pièces à sceller - EASY LINE' },
                    { id: 'shop-sealing-range-inox', label: 'INOX', page: 'shop', categoryFilter: 'Pièces à sceller - INOX' },
                  ]
                },
                { 
                  id: 'shop-sealing-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Pièces à sceller',
                  children: [
                    { id: 'shop-sealing-type-skimmers', label: 'Skimmers', page: 'shop', categoryFilter: 'Pièces à sceller - Skimmer' },
                    { id: 'shop-sealing-type-drains', label: 'Bondes', page: 'shop', categoryFilter: 'Pièces à sceller - Bondes' },
                    { id: 'shop-sealing-type-nozzles', label: 'Buses', page: 'shop', categoryFilter: 'Pièces à sceller - Buses' },
                    { id: 'shop-sealing-type-wall', label: 'Traversée de paroi', page: 'shop', categoryFilter: 'Pièces à sceller - Traversée de paroi' },
                    { id: 'shop-sealing-type-accessories', label: 'Accessoires', page: 'shop', categoryFilter: 'Pièces à sceller - Accessoires' },
                    { id: 'shop-sealing-type-hydro', label: 'Hydromassage', page: 'shop', categoryFilter: 'Pièces à sceller - Hydromassage' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-pvc', 
              label: 'Raccords & PVC', 
              page: 'shop', 
              categoryFilter: 'Raccords & PVC',
              children: [
                { id: 'shop-pvc-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Raccords & PVC' },
                { 
                  id: 'shop-pvc-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Raccords & PVC',
                  children: [
                    { id: 'shop-pvc-brand-cepex', label: 'CEPEX', page: 'shop', categoryFilter: 'Raccords & PVC - CEPEX' },
                    { id: 'shop-pvc-brand-astral', label: 'AstralPool', page: 'shop', categoryFilter: 'Raccords & PVC - AstralPool' },
                    { id: 'shop-pvc-brand-fitt', label: 'FITT', page: 'shop', categoryFilter: 'Raccords & PVC - FITT' },
                    { id: 'shop-pvc-brand-griffon', label: 'GRIFFON', page: 'shop', categoryFilter: 'Raccords & PVC - GRIFFON' },
                    { id: 'shop-pvc-brand-stanley', label: 'STANLEY', page: 'shop', categoryFilter: 'Raccords & PVC - STANLEY' },
                  ]
                },
                { 
                  id: 'shop-pvc-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Raccords & PVC',
                  children: [
                    { id: 'shop-pvc-type-tubes', label: 'Tubes', page: 'shop', categoryFilter: 'Raccords & PVC - Tubes' },
                    { id: 'shop-pvc-type-valves', label: 'Vannes', page: 'shop', categoryFilter: 'Raccords & PVC - Vannes' },
                    { id: 'shop-pvc-type-fittings', label: 'Raccords', page: 'shop', categoryFilter: 'Raccords & PVC - Raccords' },
                    { id: 'shop-pvc-type-glue', label: 'Colles & Réparation', page: 'shop', categoryFilter: 'Raccords & PVC - Colles' },
                    { id: 'shop-pvc-type-tools', label: 'Outillage', page: 'shop', categoryFilter: 'Raccords & PVC - Outillage' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-heating', 
              label: 'Chauffage', 
              page: 'shop', 
              categoryFilter: 'Chauffage',
              children: [
                { id: 'shop-heating-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Chauffage' },
                { 
                  id: 'shop-heating-brand', 
                  label: 'Par Marque', 
                  page: 'shop', 
                  categoryFilter: 'Chauffage',
                  children: [
                    { id: 'shop-heating-brand-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Chauffage - Zodiac' },
                    { id: 'shop-heating-brand-astral', label: 'AstralPool', page: 'shop', categoryFilter: 'Chauffage - AstralPool' },
                    { id: 'shop-heating-brand-bering', label: 'Bering', page: 'shop', categoryFilter: 'Chauffage - Bering' },
                  ]
                },
                { 
                  id: 'shop-heating-type', 
                  label: 'Par Type', 
                  page: 'shop', 
                  categoryFilter: 'Chauffage',
                  children: [
                    { id: 'shop-heating-type-pumps', label: 'Pompes à Chaleur', page: 'shop', categoryFilter: 'Chauffage - Pompes à Chaleur' },
                    { id: 'shop-heating-type-exchangers', label: 'Echangeurs', page: 'shop', categoryFilter: 'Chauffage - Echangeurs' },
                    { id: 'shop-heating-type-heaters', label: 'Réchauffeurs', page: 'shop', categoryFilter: 'Chauffage - Réchauffeurs' },
                    { id: 'shop-heating-type-solar', label: 'Solaire', page: 'shop', categoryFilter: 'Chauffage - Solaire' },
                    { id: 'shop-heating-type-accessories', label: 'Accessoires', page: 'shop', categoryFilter: 'Chauffage - Accessoires' },
                  ]
                }
              ]
            },
            { 
              id: 'shop-liners', 
              label: 'Liners', 
              page: 'shop', 
              categoryFilter: 'Liners',
              children: [
                { id: 'shop-liners-all', label: 'Voir toute la catégorie', page: 'shop', categoryFilter: 'Liners' },
                { 
                  id: 'shop-liners-reinforced', 
                  label: 'Membrane Armée', 
                  page: 'shop', 
                  categoryFilter: 'Liners - Membrane Armée',
                  children: [
                    { id: 'shop-liners-reinforced-printed', label: 'Imprimés', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Imprimés' },
                    { id: 'shop-liners-reinforced-nonslip', label: 'Unis Antidérapants', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Unis Antidérapants' },
                    { id: 'shop-liners-reinforced-plain', label: 'Unis', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Unis' },
                    { id: 'shop-liners-reinforced-natural', label: 'Naturels', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Naturels' },
                    { id: 'shop-liners-reinforced-mosaic', label: 'Mosaïques', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Mosaïques' },
                    { id: 'shop-liners-reinforced-textured', label: 'Texturés', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Texturés' },
                    { id: 'shop-liners-reinforced-astral', label: 'UNI By AstralPool', page: 'shop', categoryFilter: 'Liners - Membrane Armée - UNI By AstralPool' },
                    { id: 'shop-liners-reinforced-tools', label: 'Matériel de pose', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Matériel de pose' },
                  ]
                },
                { 
                  id: 'shop-liners-accessories', 
                  label: 'Accessoires', 
                  page: 'shop', 
                  categoryFilter: 'Liners - Accessoires' 
                },
              ]
            },
          ]
        },
        {
          id: 'header-promo',
          label: '🔥 Promotions',
          page: 'shop',
          categoryFilter: 'Promotions',
          customStyle: 'promo'
        },
        {
          id: 'services',
          label: 'Nos Services',
          page: 'servicesOverview',
          children: [
              { id: 'services-overview', label: 'Voir tous les services', page: 'servicesOverview'},
              ...SERVICES.map((service): NavLink => ({
                id: `service-${service.page}`,
                label: service.title,
                page: service.page,
              }))
          ]
        },
        { id: 'portfolio', label: 'Nos Réalisations', page: 'portfolio' },
        { id: 'blog', label: 'Blog', page: 'blog' },
        { id: 'about', label: 'À Propos', page: 'about' },
        { id: 'contact', label: 'Contact', page: 'contact' },
      ]
  });

  // Email Service
  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: `notif-${Date.now()}` };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const emailService = new EmailService(emailTemplates, addNotification);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('lolirine_pool_users');
      if (storedUsers) {
        // To prevent overriding initial users, we could merge or just load if empty
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers) && parsedUsers.length > users.length) {
            setUsers(parsedUsers);
        }
      }
      const consentStatus = localStorage.getItem('cookie_consent_status');
      if (!consentStatus) {
        setShowCookieConsent(true);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      // Fallback to showing consent if localStorage is blocked
      setShowCookieConsent(true);
    }
  }, []);

    // Effect to check and display popups
    useEffect(() => {
        const checkPopups = () => {
            try {
                const seenPopupsRaw = sessionStorage.getItem('seen_popups');
                const seenPopups = seenPopupsRaw ? JSON.parse(seenPopupsRaw) : [];

                const targetIdentifier = currentPage === 'productDetail' && selectedProduct
                    ? `product:${selectedProduct.id}`
                    : currentPage;

                const popupToShow = popups.find(p => 
                    p.isEnabled &&
                    !seenPopups.includes(p.id) &&
                    (p.displayOn.includes('all') || p.displayOn.includes(targetIdentifier))
                );

                if (popupToShow) {
                    setActivePopup(popupToShow);
                } else {
                    setActivePopup(null);
                }
            } catch (error) {
                console.error("Error handling session storage for popups:", error);
            }
        };

        // Delay check to allow page to render
        const timer = setTimeout(checkPopups, 500);
        return () => clearTimeout(timer);

    }, [currentPage, selectedProduct, popups]);

  const navigateTo = useCallback((page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => {
    if (page === 'admin' && !isAdminAuthenticated) {
      setIsAdminLoginModalOpen(true);
      return;
    }
    if (page === 'client' && !currentUser) {
      setIsClientLoginModalOpen(true);
      return;
    }
    
    if (page !== 'productDetail') {
        setSelectedProduct(null);
    }
    
    if (options?.categoryFilter) {
      setShopCategoryFilter(options.categoryFilter);
    } else if (page === 'shop' && !options?.categoryFilter) {
        setShopCategoryFilter(undefined);
    }

    if (options?.searchQuery) {
        setShopSearchQuery(options.searchQuery);
    } else if (page === 'shop' && !options?.searchQuery) {
        setShopSearchQuery(undefined);
    }

    setHistory(prevHistory => {
        if (prevHistory[prevHistory.length - 1] !== page) {
            return [...prevHistory, page];
        }
        return prevHistory;
    });

    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, [isAdminAuthenticated, currentUser]);

  const goBack = useCallback(() => {
    if (history.length > 1) {
        const newHistory = history.slice(0, history.length - 1);
        const previousPage = newHistory[newHistory.length - 1];
        setHistory(newHistory);
        setCurrentPage(previousPage);
        window.scrollTo(0, 0);
    }
  }, [history]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updatedProducts);
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
        setSelectedProduct(updatedProduct);
    }
  };

  const handleCreateProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
        ...newProductData,
        id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        rating: undefined,
        reviewCount: undefined,
        reviews: [],
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string | number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddCategory = (categoryPath: string) => {
    // Create a hidden placeholder product to make the category appear
    const placeholderProduct: Omit<Product, 'id'> = {
      name: `Placeholder for ${categoryPath}`,
      category: categoryPath,
      price: 0,
      tvaRate: 0,
      imageUrl: '',
      isHidden: true,
      stock: 0,
    };
    handleCreateProduct(placeholderProduct);
  };

  const handleDeleteCategoryAndProducts = (categoryPath: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryPath}" et TOUS les produits et sous-catégories qu'elle contient ? Cette action est irréversible.`)) {
      setProducts(prev => prev.filter(p => !p.category.startsWith(categoryPath)));
    }
  };

  const handleRenameCategory = (oldCategoryPath: string, newCategoryName: string) => {
    const parentCategory = oldCategoryPath.substring(0, oldCategoryPath.lastIndexOf(' - '));
    const newCategoryPath = parentCategory ? `${parentCategory} - ${newCategoryName}` : newCategoryName;

    setProducts(prev => prev.map(p => {
      if (p.category.startsWith(oldCategoryPath)) {
        // Replace only the part of the path that is changing
        const newProductCategory = p.category.replace(oldCategoryPath, newCategoryPath);
        return { ...p, category: newProductCategory };
      }
      return p;
    }));
  };
  
  const handleDuplicateCategory = (sourceCategoryPath: string, newCategoryPath: string) => {
    const productsToDuplicate = products.filter(p => p.category.startsWith(sourceCategoryPath));
    const newProducts: Product[] = productsToDuplicate.map(p => {
        const { id, rating, reviewCount, reviews, ...rest } = p;
        const newProductCategory = p.category.replace(sourceCategoryPath, newCategoryPath);
        return {
            ...rest,
            id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            category: newProductCategory,
            name: `${p.name} (Copie)`,
        };
    });
    setProducts(prev => [...prev, ...newProducts]);
  };

  const handleBulkUpdateProducts = (importedProducts: Product[]) => {
      setProducts(currentProducts => {
          const productMap = new Map(currentProducts.map(p => [p.id, p]));
          importedProducts.forEach(importedProduct => {
              if (importedProduct.id && productMap.has(importedProduct.id)) {
                  // Update existing product by merging properties
                  const existingProduct = productMap.get(importedProduct.id)!;
                  productMap.set(importedProduct.id, { ...existingProduct, ...importedProduct });
              } else {
                  // Create a new product
                  const newId = importedProduct.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                  productMap.set(newId, {
                      ...importedProduct,
                      id: newId,
                      rating: undefined,
                      reviewCount: undefined,
                      reviews: [],
                  });
              }
          });
          return Array.from(productMap.values());
      });
  };

  const handleCreateSupplier = (newSupplierData: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...newSupplierData,
      id: `sup-${Date.now()}`,
    };
    setSuppliers(prev => [newSupplier, ...prev]);
  };

  const handleUpdateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
  };
  
  const handleDeleteSupplier = (supplierId: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const handleUpdatePurchaseOrder = (updatedPO: PurchaseOrder) => {
    setPurchaseOrders(prev => prev.map(po => po.id === updatedPO.id ? updatedPO : po));
  };

  const handleCreateInvoice = (newInvoiceData: Omit<Invoice, 'id'>) => {
    const newId = `FAC/${new Date().getFullYear()}/${(invoices.length + 1).toString().padStart(4, '0')}`;
    const newInvoice: Invoice = {
        ...newInvoiceData,
        id: newId,
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
      setInvoices(prev => prev.map(inv => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));
  };

  const handleDeleteInvoice = (invoiceId: string) => {
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  };

  const handleUpdatePaymentMethod = (updatedMethod: PaymentMethod) => {
      setPaymentMethods(prev => prev.map(m => m.id === updatedMethod.id ? updatedMethod : m));
  };
  
  const handleUpdateEmailTemplate = (updatedTemplate: EmailTemplate) => {
    setEmailTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
  };

  const handleUpdateUser = (updatedUser: UserAccount) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
        setCurrentUser(updatedUser);
    }
  };

  const handleUpdateInfoBanner = (config: InfoBannerConfig) => {
    setInfoBanner(config);
  };
  
  const handleCreatePopup = (popupData: Omit<PopupConfig, 'id'>) => {
    const newPopup: PopupConfig = { ...popupData, id: `popup-${Date.now()}` };
    setPopups(prev => [...prev, newPopup]);
  };
  
  const handleUpdatePopup = (updatedPopup: PopupConfig) => {
    setPopups(prev => prev.map(p => p.id === updatedPopup.id ? updatedPopup : p));
  };
  
  const handleDeletePopup = (popupId: string) => {
    setPopups(prev => prev.filter(p => p.id !== popupId));
  };

  const handleUpdateMenuConfig = (config: MenuConfig) => {
    setMenuConfig(config);
  };


  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed(prev => {
        const isAlreadyViewed = prev.find(p => p.id === product.id);
        if (isAlreadyViewed) {
            return [product, ...prev.filter(p => p.id !== product.id)];
        }
        return [product, ...prev].slice(0, 10);
    });
    navigateTo('productDetail');
  };

  const addToCart = (productToAdd: Product, quantity: number) => {
    // Bypass stock check for dropshipping products
    if (productToAdd.isDropshipping) {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...productToAdd, quantity }];
        });
        setIsCartOpen(true);
        return;
    }

    const productInStock = products.find(p => p.id === productToAdd.id);
    const availableStock = productInStock?.stock;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
      
      if (availableStock !== undefined && (currentQuantityInCart + quantity) > availableStock) {
          const remainingStock = availableStock - currentQuantityInCart;
          alert(`Stock insuffisant. Il ne reste que ${remainingStock > 0 ? remainingStock : 0} exemplaire(s) de ce produit.`);
          return prevCart;
      }

      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string | number, quantity: number) => {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart?.isDropshipping) {
        setCart(prevCart => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
        });
        return;
    }

    const productInStock = products.find(p => p.id === productId);
    const availableStock = productInStock?.stock;

    if (availableStock !== undefined && quantity > availableStock) {
        alert(`Stock insuffisant. Il ne reste que ${availableStock} exemplaire(s) de ce produit.`);
        return;
    }

    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };
  
  const removeFromCart = (productId: string | number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (productToAdd: Product) => {
    setWishlist(prev => {
        if(prev.find(p => p.id === productToAdd.id)) {
            return prev.filter(p => p.id !== productToAdd.id); // Remove if already there
        }
        return [...prev, productToAdd]; // Add if not
    });
  };

  const handlePlaceOrder = (shippingAddressData: { shippingAddress: string; shippingCity: string; shippingZip: string }) => {
    const totalTTC = cart.reduce((sum, item) => sum + (item.price * (1 + item.tvaRate) * item.quantity), 0);
    
    const isDropshippingOrder = cart.some(item => item.isDropshipping);

    const newOrderId = `#${10524 + orders.length}`;
    const newOrder: Order = {
        id: newOrderId,
        customer: currentUser?.name || 'Client invité',
        customerEmail: currentUser?.email || 'guest@example.com',
        date: new Date().toISOString().split('T')[0],
        total: totalTTC,
        status: 'En attente',
        items: cart,
        ...shippingAddressData,
        isDropshippingOrder: isDropshippingOrder,
        ...(isDropshippingOrder && { supplierStatus: 'En attente' })
    };
    
    // Decrement stock ONLY for non-dropshipping items
    const updatedProducts = products.map(p => {
        const itemInCart = cart.find(item => item.id === p.id && !item.isDropshipping);
        if (itemInCart && p.stock !== undefined) {
            return { ...p, stock: p.stock - itemInCart.quantity };
        }
        return p;
    });
    setProducts(updatedProducts);
    
    setOrders(prev => [newOrder, ...prev]);

    // --- Purchase Order Generation Logic ---
    if (isDropshippingOrder) {
        const dropshippingItems = cart.filter(item => item.isDropshipping && item.supplierId);
        const itemsBySupplier = dropshippingItems.reduce((acc, item) => {
            const supplierId = item.supplierId!;
            if (!acc[supplierId]) {
                acc[supplierId] = [];
            }
            acc[supplierId].push(item);
            return acc;
        }, {} as Record<string, CartItem[]>);
        
        const newPOs: PurchaseOrder[] = Object.entries(itemsBySupplier).map(([supplierId, items]) => ({
            id: `BC-${newOrderId.replace('#','')}-${supplierId}`,
            orderId: newOrderId,
            supplierId: supplierId,
            customerShippingAddress: {
                address: shippingAddressData.shippingAddress,
                city: shippingAddressData.shippingCity,
                zip: shippingAddressData.shippingZip,
            },
            items: items.map(item => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
            })),
            status: 'À envoyer',
            createdAt: new Date().toISOString(),
        }));
        
        setPurchaseOrders(prev => [...prev, ...newPOs]);
    }
    
    setLastOrder(newOrder);
    setCart([]);
    
    emailService.send('order_confirmation', { ...newOrder, customerName: newOrder.customer });
    
    navigateTo('orderConfirmation');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginModalOpen(false);
    navigateTo('admin');
  };
  
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    navigateTo('home');
  };

  const handleClientLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setIsClientLoginModalOpen(false);
    navigateTo('client');
  };
  
  const handleClientLogout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const handleRegisterSuccess = (newUser: Omit<UserAccount, 'id' | 'createdAt' | 'segment' | 'communicationHistory' | 'gdprConsent'> & {gdprConsent: {marketingEmails: boolean}}) => {
    const now = new Date().toISOString();
    const userWithId: UserAccount = { 
        ...newUser,
        id: `user-${Date.now()}`,
        createdAt: now,
        segment: 'Nouveau',
        communicationHistory: [],
        gdprConsent: {
            ...newUser.gdprConsent,
            consentDate: newUser.gdprConsent.marketingEmails ? now : undefined
        }
    };
    const updatedUsers = [...users, userWithId];
    try {
      localStorage.setItem('lolirine_pool_users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Failed to save users to localStorage:", error);
    }
    setUsers(updatedUsers);
    setCurrentUser(userWithId);
    setIsClientRegisterModalOpen(false);
    
    emailService.send('registration_confirmation', { customerName: userWithId.name, customerEmail: userWithId.email });
    
    navigateTo('client');
  };

  const openRegisterModal = () => {
    setIsClientLoginModalOpen(false);
    setIsClientRegisterModalOpen(true);
  };

  const openLoginModal = () => {
    setIsClientRegisterModalOpen(false);
    setIsClientLoginModalOpen(true);
  };

  const handleAcceptCookies = () => {
    try {
      localStorage.setItem('cookie_consent_status', 'accepted');
    } catch(error) {
      console.error("Could not set cookie consent in localStorage", error);
    }
    setShowCookieConsent(false);
  };

  const handleDeclineCookies = () => {
    try {
      localStorage.setItem('cookie_consent_status', 'declined');
    } catch (error) {
      console.error("Could not set cookie consent in localStorage", error);
    }
    // Future logic to disable non-essential cookies can go here
    setShowCookieConsent(false);
  };

  const renderPage = () => {
    const homePageProps = { navigateTo, products, addToCart, recentlyViewed, onSelectProduct: handleSelectProduct, orders, currentUser, cart, wishlist, addToWishlist };
    const backButtonProps = { goBack, canGoBack: history.length > 1 };
    const adminPageProps = { 
        onLogout: handleAdminLogout, 
        products, 
        onUpdateProduct: handleUpdateProduct, 
        onCreateProduct: handleCreateProduct,
        onDeleteProduct: handleDeleteProduct,
        onBulkUpdateProducts: handleBulkUpdateProducts,
        orders,
        suppliers,
        onCreateSupplier: handleCreateSupplier,
        onUpdateSupplier: handleUpdateSupplier,
        onDeleteSupplier: handleDeleteSupplier,
        onUpdateOrder: handleUpdateOrder,
        invoices,
        onCreateInvoice: handleCreateInvoice,
        onUpdateInvoice: handleUpdateInvoice,
        onDeleteInvoice: handleDeleteInvoice,
        paymentMethods,
        onUpdatePaymentMethod: handleUpdatePaymentMethod,
        emailTemplates,
        onUpdateEmailTemplate: handleUpdateEmailTemplate,
        users,
        onUpdateUser: handleUpdateUser,
        cart,
        purchaseOrders,
        onUpdatePurchaseOrder: handleUpdatePurchaseOrder,
        infoBanner: infoBanner,
        onUpdateInfoBanner: handleUpdateInfoBanner,
        popups,
        onCreatePopup: handleCreatePopup,
        onUpdatePopup: handleUpdatePopup,
        onDeletePopup: handleDeletePopup,
        menuConfig,
        onUpdateMenuConfig: handleUpdateMenuConfig,
        onAddCategory: handleAddCategory,
        onDeleteCategoryAndProducts: handleDeleteCategoryAndProducts,
        onRenameCategory: handleRenameCategory,
        onDuplicateCategory: handleDuplicateCategory,
        emailService,
    };
    switch (currentPage) {
      case 'home':
        return <HomePage {...homePageProps} />;
      case 'services':
        return <ServicesPage navigateTo={navigateTo} {...backButtonProps} />;
      case 'servicesOverview':
        return <ServicesOverviewPage navigateTo={navigateTo} {...backButtonProps} />;
      case 'repairs':
        return <RepairsPage navigateTo={navigateTo} {...backButtonProps} />;
      case 'construction':
        return <ConstructionPage navigateTo={navigateTo} {...backButtonProps} />;
      case 'waterAnalysis':
        return <WaterAnalysisPage navigateTo={navigateTo} {...backButtonProps} />;
      case 'winterization':
        return <WinterizationPage navigateTo={navigateTo} {...backButtonProps} />;
      case 'wellness':
        return <WellnessPage navigateTo={navigateTo} products={products} addToCart={addToCart} onSelectProduct={handleSelectProduct} wishlist={wishlist} addToWishlist={addToWishlist} {...backButtonProps} />;
      case 'shop':
        return <ShopPage products={products} addToCart={addToCart} onSelectProduct={handleSelectProduct} initialCategoryFilter={shopCategoryFilter} initialSearchTerm={shopSearchQuery} wishlist={wishlist} addToWishlist={addToWishlist} />;
      case 'productDetail':
        return selectedProduct ? <ProductDetailPage product={selectedProduct} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} navigateTo={navigateTo} products={products} onSelectProduct={handleSelectProduct} {...backButtonProps} /> : <HomePage {...homePageProps} />;
      case 'portfolio':
        return <PortfolioPage {...backButtonProps} />;
      case 'blog':
        return <BlogPage {...backButtonProps} />;
      case 'about':
        return <AboutPage {...backButtonProps} />;
      case 'contact':
        return <ContactPage {...backButtonProps} />;
      case 'faq':
        return <FaqPage {...backButtonProps} />;
      case 'terms':
          return <TermsPage {...backButtonProps} />;
      case 'privacy':
          return <PrivacyPolicyPage {...backButtonProps} />;
      case 'cookies':
          return <CookiesPage {...backButtonProps} />;
      case 'legal':
          return <LegalNoticePage {...backButtonProps} />;
      case 'checkout':
        return <CheckoutPage cart={cart} onPlaceOrder={handlePlaceOrder} currentUser={currentUser} paymentMethods={paymentMethods.filter(p => p.enabled)} {...backButtonProps} />;
      case 'orderConfirmation':
        return lastOrder ? <OrderConfirmationPage order={lastOrder} /> : <HomePage {...homePageProps} />;
      case 'wishlist':
        return <WishlistPage wishlist={wishlist} navigateTo={navigateTo} onSelectProduct={handleSelectProduct} addToCart={addToCart} addToWishlist={addToWishlist} {...backButtonProps} />;
      case 'admin':
        return isAdminAuthenticated ? <AdminPage {...adminPageProps} /> : <HomePage {...homePageProps} />;
      case 'client':
        return currentUser ? <ClientAreaPage onLogout={handleClientLogout} user={currentUser} orders={orders.filter(o => o.customerEmail === currentUser.email)} onUpdateUser={handleUpdateUser} {...backButtonProps} /> : <HomePage {...homePageProps} />;
      default:
        return <HomePage {...homePageProps} />;
    }
  };
  
  const handlePopupClose = (popupId: string) => {
    try {
        const seenPopupsRaw = sessionStorage.getItem('seen_popups');
        const seenPopups = seenPopupsRaw ? JSON.parse(seenPopupsRaw) : [];
        if (!seenPopups.includes(popupId)) {
            sessionStorage.setItem('seen_popups', JSON.stringify([...seenPopups, popupId]));
        }
    } catch (error) {
        console.error("Error saving seen popup to session storage:", error);
    }
    setActivePopup(null);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistItemCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onLoginClick={openLoginModal}
        onLogoutClick={handleClientLogout}
        bannerConfig={infoBanner}
        menuConfig={menuConfig}
       />
      <main className={`flex-grow bg-white ${currentPage === 'home' ? '' : 'pt-[212px]'}`}>
        {renderPage()}
        {currentPage === 'home' && (
          <div className="h-2 bg-gradient-to-r from-cyan-100 via-cyan-300 to-blue-400"></div>
        )}
        <section 
          className="py-16 bg-cover bg-center relative" 
          style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan16.avif')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                  Consultés récemment
              </h2>
              {recentlyViewed.length > 0 ? (
                  <ProductsCarousel
                    products={recentlyViewed}
                    addToCart={addToCart}
                    onSelectProduct={handleSelectProduct}
                    navigateTo={navigateTo}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    headless={true}
                  />
              ) : (
                  <div className="text-center py-8 bg-white/10 backdrop-blur-sm rounded-lg">
                      <p className="text-white text-lg">
                          Les produits que vous consultez apparaîtront ici.
                      </p>
                      <p className="text-white/80 mt-2">
                          Continuez votre navigation pour découvrir nos offres !
                      </p>
                  </div>
              )}
          </div>
        </section>
        
      </main>
      
      <Footer navigateTo={navigateTo} onOpenRegisterModal={openRegisterModal} />
      {isAdminLoginModalOpen && (
        <AdminLoginModal 
          onSuccess={handleAdminLoginSuccess}
          onClose={() => setIsAdminLoginModalOpen(false)}
        />
      )}
      {isClientLoginModalOpen && (
        <ClientLoginModal
          onSuccess={handleClientLoginSuccess}
          onClose={() => setIsClientLoginModalOpen(false)}
          onSwitchToRegister={openRegisterModal}
          users={users}
        />
      )}
      {isClientRegisterModalOpen && (
        <ClientRegisterModal
          onSuccess={handleRegisterSuccess}
          onClose={() => setIsClientRegisterModalOpen(false)}
          onSwitchToLogin={openLoginModal}
          existingUsers={users}
        />
      )}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        navigateTo={navigateTo}
      />
      {showCookieConsent && (
          <CookieConsent 
            onAccept={handleAcceptCookies}
            onDecline={handleDeclineCookies}
          />
      )}
      <EmailNotificationManager 
         notifications={notifications}
         onDismiss={removeNotification}
      />
      {activePopup && (
        <PromotionalPopup 
            popup={activePopup}
            onClose={() => handlePopupClose(activePopup.id)}
            navigateTo={navigateTo}
        />
      )}
      <WhatsAppButton pageIdentifier={currentPage} />
      <AiAssistantButton onClick={() => setIsAiAssistantOpen(prev => !prev)} />
      {isAiAssistantOpen && (
        <AiAssistantWidget 
            onClose={() => setIsAiAssistantOpen(false)}
            products={products}
            orders={orders}
            services={SERVICES}
            portfolioItems={PORTFOLIO_ITEMS}
            blogPosts={BLOG_POSTS}
            currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default App;
