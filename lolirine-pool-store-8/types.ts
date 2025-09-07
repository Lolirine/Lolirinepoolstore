
import React from 'react';

export type Page = 'home' | 'services' | 'shop' | 'portfolio' | 'blog' | 'about' | 'contact' | 'admin' | 'client' | 'faq' | 'checkout' | 'orderConfirmation' | 'terms' | 'privacy' | 'cookies' | 'legal' | 'wellness' | 'productDetail' | 'wishlist' | 'repairs' | 'construction' | 'waterAnalysis' | 'winterization' | 'servicesOverview';

export type PurchaseOrderStatus = 'À envoyer' | 'Envoyé' | 'Expédié';

export interface PurchaseOrderItem {
  productId: string | number;
  productName: string;
  quantity: number;
}

export interface PurchaseOrder {
  id: string; // e.g., PO-10524-SUP1
  orderId: string; // The original customer order ID
  supplierId: string;
  customerShippingAddress: {
    address: string;
    city: string;
    zip: string;
  };
  items: PurchaseOrderItem[];
  status: PurchaseOrderStatus;
  createdAt: string; // ISO date string
}

export type AdminView = 'dashboard' | 'products' | 'clients' | 'billing' | 'reports' | 'inventory' | 'suppliers' | 'dropshipping' | 'paymentMethods' | 'emails' | 'purchaseOrders' | 'infoBanner' | 'popups' | 'menuManagement' | 'orders';

export interface PopupConfig {
    id: string;
    title: string;
    content: string; // Can contain HTML
    imageUrl?: string;
    buttonText: string;
    buttonLink: string; // Can be a URL or a page identifier
    isEnabled: boolean;
    displayOn: string[]; // e.g., ['all'], ['home', 'shop'], ['product:prod-123']
    frequency: 'once_per_session';
    backgroundColor?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NavLink {
  id: string;
  page?: Page;
  label: string;
  href?: string;
  children?: NavLink[];
  categoryFilter?: string;
  customStyle?: 'promo';
}

export type NavLinkStyle = 'default' | 'outline' | 'pill';

export interface MenuConfig {
  links: NavLink[];
  style: NavLinkStyle;
}

export interface Service {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  imageUrl: string;
  page: Page;
}

export interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  promoPrice?: number;
  isOnSale?: boolean;
  tvaRate: number;
  imageUrl: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  attributes?: { [key: string]: string | number };
  ribbon?: string;
  reviews?: Review[];
  stock?: number;
  galleryImages?: string[];
  features?: string[];
  isDropshipping?: boolean;
  supplierId?: string;
  supplierPrice?: number;
  weight?: number; // in kg
  dimensions?: string; // e.g., "20x30x10 cm"
  ean?: string; // EAN/UPC code
  isHidden?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface AdminStat {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

export type SupplierStatus = 'En attente' | 'Envoyé au fournisseur' | 'Expédié';

export interface Order {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: 'Complété' | 'En attente' | 'Annulé';
    items: CartItem[];
    shippingAddress: string;
    shippingCity: string;
    shippingZip: string;
    isDropshippingOrder?: boolean;
    supplierStatus?: SupplierStatus;
    trackingNumber?: string;
    customerEmail?: string;
}

export interface SalesDataPoint {
    day: string;
    sales: number;
}

export interface CommunicationEntry {
  id: string;
  date: string; // ISO string
  type: 'Email' | 'Phone Call' | 'Note';
  summary: string;
  author: 'Admin' | 'System'; // Who logged the entry
}

export type UserSegment = 'Nouveau' | 'Fidèle' | 'VIP' | 'Inactif' | 'À Risque';

export interface Address {
    address: string;
    city: string;
    zip: string;
    country: string;
}

export interface UserAccount {
    id: string;
    name: string;
    email: string;
    password: string; // Note: In a real app, this would be a hash.
    createdAt: string; // ISO string
    phone?: string;
    shippingAddress?: Address;
    billingAddress?: Address;
    segment: UserSegment;
    communicationHistory: CommunicationEntry[];
    gdprConsent: {
        marketingEmails: boolean;
        consentDate?: string; // ISO string
    };
}


export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g., 0.21 for 21%
}

export interface InvoiceDiscount {
  type: 'percentage' | 'fixed';
  value: number;
}

export interface Invoice {
  id: string; // e.g., 'FAC/2025/0101'
  status: 'Draft' | 'Sent' | 'Paid' | 'Cancelled';
  customerName: string;
  customerAddress: string;
  invoiceDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  source?: string;
  items: InvoiceItem[];
  discount?: InvoiceDiscount;
}

export type PaymentMethodType = 'button' | 'bank_transfer_details' | 'qr_code';

export interface PaymentMethod {
  id: string; // e.g., 'stripe', 'paypal'
  name: string; // e.g., 'Stripe (Credit Card)'
  type: PaymentMethodType;
  enabled: boolean;
  config: Record<string, any>; // Flexible for API keys, IBANs, etc.
  logoComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  logoUrl?: string;
}

export type EmailTemplateType = 'transactional' | 'marketing' | 'lifecycle';

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string; // Can contain HTML and placeholders like {{customerName}}
  type: EmailTemplateType;
  enabled: boolean;
  placeholders: string[];
}

export interface Notification {
  id: string;
  recipient: string;
  subject: string;
  body: string; // The rendered HTML body of the email
}


export interface HomeCategory {
  label: string;
  imageUrl: string;
  page?: Page;
  categoryFilter?: string;
}

export interface PageWithBackButtonProps {
    goBack: () => void;
    canGoBack: boolean;
}

export interface InfoBannerConfig {
    isVisible: boolean;
    text: string;
    backgroundColor?: string;
}

export interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
  cartItemCount: number;
  wishlistItemCount: number;
  onCartClick: () => void;
  currentUser: UserAccount | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  bannerConfig: InfoBannerConfig;
  menuConfig: MenuConfig;
}

export interface FooterProps {
  navigateTo: (page: Page) => void;
  onOpenRegisterModal: () => void;
}

export interface HomePageProps {
  navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  recentlyViewed: Product[];
  onSelectProduct: (product: Product) => void;
  orders: Order[];
  currentUser: UserAccount | null;
  cart: CartItem[];
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
}

export interface ServicesPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}
export interface ServicesOverviewPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}
export interface RepairsPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}
export interface ConstructionPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}
export interface WaterAnalysisPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}
export interface WinterizationPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}
export interface PortfolioPageProps extends PageWithBackButtonProps {}
export interface BlogPageProps extends PageWithBackButtonProps {}
export interface AboutPageProps extends PageWithBackButtonProps {}
export interface ContactPageProps extends PageWithBackButtonProps {}
export interface FaqPageProps extends PageWithBackButtonProps {}
export interface TermsPageProps extends PageWithBackButtonProps {}
export interface PrivacyPolicyPageProps extends PageWithBackButtonProps {}
export interface CookiesPageProps extends PageWithBackButtonProps {}
export interface LegalNoticePageProps extends PageWithBackButtonProps {}

// FIX: Added missing type definition for CheckoutPage.
export interface CheckoutPageProps extends PageWithBackButtonProps {
    cart: CartItem[];
    onPlaceOrder: (shippingAddressData: { shippingAddress: string; shippingCity: string; shippingZip: string }) => void;
    currentUser: UserAccount | null;
    paymentMethods: PaymentMethod[];
}

// FIX: Added missing type definition for WishlistPage.
export interface WishlistPageProps extends PageWithBackButtonProps {
    wishlist: Product[];
    navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
    onSelectProduct: (product: Product) => void;
    addToCart: (product: Product, quantity: number) => void;
    addToWishlist: (product: Product) => void;
}


export interface WellnessPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
}

export interface ShopPageProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  initialCategoryFilter?: string;
  initialSearchTerm?: string;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
}

export interface ProductDetailPageProps extends PageWithBackButtonProps {
    product: Product;
    navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
    addToCart: (product: Product, quantity: number) => void;
    addToWishlist: (product: Product) => void;
    wishlist: Product[];
    products: Product[];
    onSelectProduct: (product: Product) => void;
}

export interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: string | number, quantity: number) => void;
    onRemoveItem: (productId: string | number) => void;
    onClearCart: () => void;
    navigateTo: (page: Page) => void;
}

export interface ClientLoginModalProps {
    onSuccess: (user: UserAccount) => void;
    onClose: () => void;
    onSwitchToRegister: () => void;
    users: UserAccount[];
}

export interface ClientRegisterModalProps {
    onSuccess: (newUser: Omit<UserAccount, 'id' | 'createdAt' | 'segment' | 'communicationHistory' | 'gdprConsent'> & {gdprConsent: {marketingEmails: boolean}}) => void;
    onClose: () => void;
    onSwitchToLogin: () => void;
    existingUsers: UserAccount[];
}

export interface ClientAreaPageProps extends PageWithBackButtonProps {
    onLogout: () => void;
    user: UserAccount;
    orders: Order[];
    onUpdateUser: (user: UserAccount) => void;
}

export interface OrderConfirmationPageProps {
    order: Order;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface FilterFacet {
    name: string;
    options: { value: string | number; count: number }[];
}

export interface ActiveFilters {
    [key: string]: (string | number)[];
}
export interface AdminPageProps {
    onLogout: () => void;
    products: Product[];
    onUpdateProduct: (product: Product) => void;
    onCreateProduct: (newProductData: Omit<Product, 'id'>) => void;
    onDeleteProduct: (productId: string | number) => void;
    onBulkUpdateProducts: (products: Product[]) => void;
    orders: Order[];
    onUpdateOrder: (order: Order) => void;
    suppliers: Supplier[];
    onCreateSupplier: (newSupplierData: Omit<Supplier, 'id'>) => void;
    onUpdateSupplier: (supplier: Supplier) => void;
    onDeleteSupplier: (supplierId: string) => void;
    invoices: Invoice[];
    onCreateInvoice: (newInvoiceData: Omit<Invoice, 'id'>) => void;
    onUpdateInvoice: (invoice: Invoice) => void;
    onDeleteInvoice: (invoiceId: string) => void;
    paymentMethods: PaymentMethod[];
    onUpdatePaymentMethod: (method: PaymentMethod) => void;
    emailTemplates: EmailTemplate[];
    onUpdateEmailTemplate: (template: EmailTemplate) => void;
    users: UserAccount[];
    onUpdateUser: (user: UserAccount) => void;
    cart: CartItem[];
    purchaseOrders: PurchaseOrder[];
    onUpdatePurchaseOrder: (po: PurchaseOrder) => void;
    infoBanner: InfoBannerConfig;
    onUpdateInfoBanner: (config: InfoBannerConfig) => void;
    popups: PopupConfig[];
    onCreatePopup: (popupData: Omit<PopupConfig, 'id'>) => void;
    onUpdatePopup: (popup: PopupConfig) => void;
    onDeletePopup: (popupId: string) => void;
    menuConfig: MenuConfig;
    onUpdateMenuConfig: (config: MenuConfig) => void;
    onAddCategory: (categoryPath: string) => void;
    onDeleteCategoryAndProducts: (categoryPath: string) => void;
    onRenameCategory: (oldCategoryPath: string, newCategoryName: string) => void;
    onDuplicateCategory: (sourceCategoryPath: string, newCategoryPath: string) => void;
    emailService: any; // Add EmailService instance
}
