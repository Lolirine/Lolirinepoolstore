import React from 'react';
import {
  Product,
  Order,
  UserAccount,
  Testimonial,
  PortfolioItem,
  BlogPost,
  Service,
  Supplier,
  Invoice,
  PaymentMethod,
  EmailTemplate,
  NavLink,
  AdminView,
} from './types';
import {
  Truck,
  Wrench,
  Droplets,
  Building,
  BarChart2,
  Package,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  ShoppingCart,
  Bell,
  Mail as MailIcon,
  Menu,
  File as FileIcon,
  GitBranch,
  MessageSquare,
  Contact
} from 'lucide-react';
import MaestroIcon from './components/icons/MaestroIcon';
import PaypalIcon from './components/icons/PaypalIcon';
import MastercardIcon from './components/icons/MastercardIcon';
import StripeIcon from './components/admin/StripeIcon';


export const ADMIN_PASSWORD = 'admin';

export const SERVICES: Service[] = [
  {
    icon: <Wrench />,
    title: 'Entretien & Réparation',
    description: 'Nos techniciens assurent la maintenance et la réparation de votre piscine pour une eau toujours saine.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Entretien%20piscine%202.jpg',
    page: 'repairs',
  },
  {
    icon: <Building />,
    title: 'Construction & Rénovation',
    description: 'Nous concevons et réalisons la piscine de vos rêves, ou modernisons votre bassin existant.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Construction%20piscine.jpeg',
    page: 'construction',
  },
  {
    icon: <Droplets />,
    title: 'Analyse de l\'eau',
    description: 'Profitez de notre expertise pour une analyse précise et un traitement adapté de votre eau.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%203.jpeg',
    page: 'waterAnalysis',
  },
  {
    icon: <Truck />,
    title: 'Hivernage & Estivage',
    description: 'Nous préparons votre piscine pour l\'hiver et la remettons en service pour la belle saison.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Couverture%20hivernage.jpeg',
    page: 'winterization',
  },
];

export const WELLNESS_SUB_CATEGORIES: NavLink[] = [
    { id: 'wellness-all', label: 'Voir tout l\'espace Wellness', page: 'wellness', categoryFilter: 'Wellness' },
    {
      id: 'wellness-spas',
      label: 'Spas',
      page: 'shop',
      categoryFilter: 'Wellness - Spas',
      children: [
        { id: 'spas-2-3', label: 'Spas 2-3 places', page: 'shop', categoryFilter: 'Wellness - Spas - 2-3 places' },
        { id: 'spas-4-5', label: 'Spas 4-5 places', page: 'shop', categoryFilter: 'Wellness - Spas - 4-5 places' },
        { id: 'spas-6-plus', label: 'Spas 6 places et +', page: 'shop', categoryFilter: 'Wellness - Spas - 6 places et +' },
      ]
    },
    {
      id: 'wellness-saunas',
      label: 'Saunas',
      page: 'shop',
      categoryFilter: 'Wellness - Saunas',
    },
    {
      id: 'wellness-accessories',
      label: 'Accessoires pour Spas',
      page: 'shop',
      categoryFilter: 'Wellness - Accessoires pour Spas',
    },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Un service client impeccable et des produits de grande qualité. Ma piscine n'a jamais été aussi belle !",
    author: 'Jean Dupont',
    location: 'Bordeaux, France',
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    quote: "L'équipe a été très professionnelle lors de la rénovation de notre piscine. Le résultat est au-delà de nos espérances.",
    author: 'Marie Martin',
    location: 'Arcachon, France',
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
  },
  {
    quote: "Leur boutique en ligne est très complète et la livraison est rapide. Je recommande vivement !",
    author: 'Pierre Bernard',
    location: 'Namur, Belgique',
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
        id: 1,
        title: 'Rénovation piscine béton',
        category: 'Rénovation',
        beforeImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-04-13-16-19-58.jpg',
        afterImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-04-13-16-20-01.jpg',
    },
    {
        id: 2,
        title: 'Construction piscine miroir',
        category: 'Construction',
        beforeImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-08-09-10-51-45.jpg',
        afterImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-08-09-10-51-45(1).jpg',
    },
    {
        id: 3,
        title: 'Installation volet roulant',
        category: 'Équipement',
        beforeImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-16-20-42-31.jpg',
        afterImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-05.jpg',
    },
    {
        id: 4,
        title: 'Pose de liner gris anthracite',
        category: 'Rénovation',
        beforeImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-06.jpg',
        afterImageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-20-46-29.jpg',
    }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Comment bien préparer sa piscine pour l\'hiver ?',
    excerpt: 'L\'hivernage est une étape cruciale pour préserver votre bassin et faciliter sa remise en service au printemps. Découvrez nos conseils...',
    author: 'L\'équipe Piscine Pro',
    date: '15 Octobre 2023',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Couverture%20hivernage.jpeg',
  },
  {
    id: 2,
    title: 'Les avantages d\'une pompe à chaleur pour votre piscine',
    excerpt: 'Prolongez la saison de baignade et profitez d\'une eau à température idéale grâce à une pompe à chaleur. Économies, confort...',
    author: 'L\'équipe Piscine Pro',
    date: '28 Septembre 2023',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/pompe%20a%20chaleur.jpeg',
  },
  {
    id: 3,
    title: 'Traitement au sel ou au chlore : que choisir ?',
    excerpt: 'Le choix du traitement de l\'eau est essentiel pour le confort des baigneurs et l\'entretien de la piscine. Avantages et inconvénients...',
    author: 'L\'équipe Piscine Pro',
    date: '10 Septembre 2023',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%203.jpeg',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'chlore-001',
        name: 'Chlore multifonctions galets 250g - 5kg',
        category: 'Traitement de l\'eau - Désinfection',
        price: 39.95,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/chlore-multi-5kg.jpg',
        description: 'Galets de chlore multifonctions pour une désinfection complète de votre piscine. Action désinfectante, anti-algues, floculante et stabilisante.',
        rating: 4.8,
        reviewCount: 124,
        stock: 50,
    },
    {
        id: 'WR00030',
        name: 'Robot piscine électrique Zodiac VORTRAX OV 3505',
        category: 'Nettoyage - Robots Piscine Privée',
        price: 899.00,
        promoPrice: 799.00,
        isOnSale: true,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/robot-zodiac.jpg',
        description: 'Robot nettoyeur électrique pour piscines jusqu\'à 12x6m. Nettoie fond, parois et ligne d\'eau. Aspiration cyclonique puissante.',
        rating: 4.9,
        reviewCount: 45,
        stock: 15,
        ribbon: 'Promo',
    },
    {
        id: 'prod-10195-2',
        name: 'Pompe à chaleur Z400 iQ MD5 - ZODIAC',
        category: 'Chauffage - Pompes à Chaleur',
        price: 2490.00,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/pompe-a-chaleur-zodiac.png',
        description: 'Pompe à chaleur réversible et connectée pour piscines jusqu\'à 75m³. Silencieuse et performante.',
        stock: 5,
        isDropshipping: true,
        supplierId: 'sup-zodiac'
    },
    {
        id: 'prod-10255-22',
        name: 'Blue Connect Plus - Analyseur connecté',
        category: 'Instruments de mesure - Analyseurs Connectés',
        price: 349.00,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/blue-connect.jpg',
        description: 'Analyseur d\'eau intelligent qui mesure le pH, le chlore, la salinité et la température. Notifications en temps réel sur votre smartphone.',
        rating: 4.7,
        reviewCount: 88,
        stock: 30,
    },
    {
        id: 'prod-10255-23',
        name: 'CTX Pro - pH Moins Liquide 20L',
        category: "Traitement de l'eau - Équilibre de l'eau",
        price: 45.50,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/ctx-ph-moins.jpg',
        stock: 100
    },
    {
        id: 'prod-10255-24',
        name: 'CTX Pro - Floculant en cartouches 1kg',
        category: "Traitement de l'eau - Floculants",
        price: 18.90,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/ctx-floculant.jpg',
        stock: 75
    },
    {
        id: 'prod-10255-26',
        name: 'Bandelettes d\'analyse 6 en 1 - AstralPool',
        category: 'Instruments de mesure - Bandelettes',
        price: 12.99,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/bandelettes.jpg',
        stock: 200
    },
     {
        id: 'hivernage-001',
        name: 'Produit d\'hivernage 5L - CTX Pro',
        category: "Traitement de l'eau - Prévention",
        price: 29.90,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/hivernage.jpg',
        stock: 60
    },
     {
        id: 'hivernage-002',
        name: 'Gizzmo anti-gel pour skimmer',
        category: "Pièces à sceller - Accessoires",
        price: 4.50,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/gizzmo.jpg',
        stock: 300
    },
    {
        id: 'hivernage-003',
        name: 'Flotteur d\'hivernage lesté',
        category: "Accessoires",
        price: 6.90,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/flotteur.jpg',
        stock: 400
    },
    {
        id: 'hivernage-004',
        name: 'Bouchon d\'hivernage N°10',
        category: "Raccords & PVC - Accessoires",
        price: 2.50,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/bouchon.jpg',
        stock: 500
    },
    {
        id: 'liner-001',
        name: 'Membrane armée unie 150/100e Bleu clair',
        category: 'Liners - Membrane Armée - Unis',
        price: 35.00,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/liner-bleu-clair.jpg',
        description: 'Membrane armée pour une étanchéité parfaite et durable. Prix au m².',
        stock: 1000,
        supplierId: 'sup-astral',
        isDropshipping: true,
    },
    {
        id: 'SCPAQG-100-0003',
        name: 'Skimmer PRESTIGE 17,5L Béton - ASTRALPOOL',
        category: 'Pièces à sceller - PRESTIGE',
        price: 55.90,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/skimmer-prestige.jpg',
        stock: 40,
        supplierId: 'sup-astral'
    },
    {
        id: 'elec-lamp-001',
        name: 'Projecteur LED extra plat LumiPlus - ASTRALPOOL',
        category: 'Matériel Électrique - Lampes',
        price: 299.00,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/projecteur-led.jpg',
        stock: 25,
        supplierId: 'sup-astral'
    },
     {
        id: 'prod-10060-14',
        name: 'Colle PVC bleue GRIFFON WDF-05 250ml',
        category: 'Raccords & PVC - Colles',
        price: 14.95,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/colle-pvc.jpg',
        stock: 150,
    },
     {
        id: 'prod-10055',
        name: 'Réparation fuite liner - Kit complet',
        category: 'Liners - Accessoires',
        price: 24.90,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/kit-reparation-liner.jpg',
        stock: 80
    },
    {
        id: 'prod-10055-3',
        name: 'Mastic colle étanchéité Pro-Flex - Transparent',
        category: 'Raccords & PVC - Colles',
        price: 19.99,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/mastic-colle.jpg',
        stock: 90
    },
    {
        id: 'elec-cof-001',
        name: 'Coffret électrique Panorama pour filtration',
        category: 'Matériel Électrique - Coffrets Électriques',
        price: 189.00,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/coffret-elec.jpg',
        stock: 35,
        supplierId: 'sup-astral'
    },
     {
        id: 'elec-acc-002',
        name: 'Transformateur 300W pour projecteurs piscine',
        category: 'Matériel Électrique - Accessoires Électriques',
        price: 125.00,
        tvaRate: 0.21,
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PRODUITS/transfo.jpg',
        stock: 50,
        supplierId: 'sup-astral'
    },
];

export const INITIAL_USERS: UserAccount[] = [
    {
        id: 'user-1',
        name: 'Alice Dubois',
        email: 'alice.dubois@example.com',
        password: 'password123',
        createdAt: '2023-10-20T10:00:00Z',
        phone: '0612345678',
        shippingAddress: { address: '12 Rue de la Paix', city: 'Paris', zip: '75001', country: 'France' },
        segment: 'Nouveau',
        communicationHistory: [],
        gdprConsent: { marketingEmails: true, consentDate: '2023-10-20T10:00:00Z' },
    },
    {
        id: 'user-2',
        name: 'Bob Leclerc',
        email: 'bob.leclerc@example.com',
        password: 'password123',
        createdAt: '2023-05-15T14:30:00Z',
        phone: '0475123456',
        shippingAddress: { address: 'Avenue Louise 255', city: 'Bruxelles', zip: '1050', country: 'Belgique' },
        segment: 'Fidèle',
        communicationHistory: [],
        gdprConsent: { marketingEmails: false },
    },
];

export const INITIAL_ORDERS: Order[] = [
    {
        id: '#10521',
        customer: 'Alice Dubois',
        customerEmail: 'alice.dubois@example.com',
        date: '2023-10-20',
        total: 159.80,
        status: 'Complété',
        items: [
            {...INITIAL_PRODUCTS.find(p => p.id === 'chlore-001')!, quantity: 2},
        ],
        shippingAddress: '12 Rue de la Paix',
        shippingCity: 'Paris',
        shippingZip: '75001',
    },
     {
        id: '#10522',
        customer: 'Bob Leclerc',
        customerEmail: 'bob.leclerc@example.com',
        date: '2023-10-22',
        total: 899.00,
        status: 'En attente',
        items: [
            {...INITIAL_PRODUCTS.find(p => p.id === 'WR00030')!, quantity: 1},
        ],
        shippingAddress: 'Avenue Louise 255',
        shippingCity: 'Bruxelles',
        shippingZip: '1050',
    },
];


export const INITIAL_SUPPLIERS: Supplier[] = [
    { id: 'sup-zodiac', name: 'Zodiac', email: 'contact@zodiac-poolcare.com', phone: '+33123456789' },
    { id: 'sup-astral', name: 'AstralPool', email: 'info@astralpool.com', phone: '+34937135000' },
    { id: 'sup-ctx', name: 'CTX Pro', email: 'pro@ctx.es', phone: '+34902100123' },
    { id: 'sup-griffon', name: 'Griffon', email: 'contact@griffon.eu', phone: '+31883235700' },
];

export const INITIAL_INVOICES: Invoice[] = [
    {
        id: 'FAC/2023/0001',
        status: 'Paid',
        customerName: 'Alice Dubois',
        customerAddress: '12 Rue de la Paix\n75001 Paris\nFrance',
        invoiceDate: '2023-10-20',
        dueDate: '2023-11-20',
        source: 'Commande #10521',
        items: [
            { id: 'item-1', description: 'Chlore multifonctions galets 250g - 5kg', quantity: 2, unitPrice: 39.95, taxRate: 0.21 },
        ],
    },
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 'stripe',
        name: 'Stripe (Carte de crédit)',
        type: 'button',
        enabled: true,
        config: { apiKey: 'pk_test_..._STRIPE', secretKey: 'sk_test_..._STRIPE' },
        logoComponent: StripeIcon,
    },
    {
        id: 'paypal',
        name: 'PayPal',
        type: 'button',
        enabled: true,
        config: { clientId: '...', clientSecret: '...' },
        logoComponent: PaypalIcon,
    },
    {
        id: 'mastercard',
        name: 'Mastercard',
        type: 'button',
        enabled: true,
        config: {},
        logoComponent: MastercardIcon
    },
    {
        id: 'maestro',
        name: 'Maestro',
        type: 'button',
        enabled: true,
        config: {},
        logoComponent: MaestroIcon
    },
    {
        id: 'bank_transfer',
        name: 'Virement Bancaire',
        type: 'bank_transfer_details',
        enabled: true,
        config: {
            beneficiary: 'Lolirine Pool Store',
            iban: 'BE07 7320 5208 0866',
            bic: 'CREGBEBB'
        }
    }
];

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
    {
        id: 'order_confirmation',
        name: 'Confirmation de commande',
        description: 'Envoyé au client après qu\'il ait passé une commande.',
        subject: 'Votre commande {{orderId}} a bien été reçue !',
        body: '<h1>Bonjour {{customerName}},</h1><p>Merci pour votre commande !</p><div>{{cartItemsList}}</div><p>Total: {{orderTotal}}</p><p>Elle sera expédiée à :<br/>{{customerShippingAddress}}</p>',
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}', '{{orderId}}', '{{orderTotal}}', '{{cartItemsList}}', '{{customerShippingAddress}}'],
    },
    {
        id: 'registration_confirmation',
        name: 'Confirmation d\'inscription',
        description: 'Envoyé au client après la création de son compte.',
        subject: 'Bienvenue chez Lolirine Pool Store !',
        body: '<h1>Bonjour {{customerName}},</h1><p>Bienvenue ! Votre compte a bien été créé. Vous pouvez maintenant vous connecter et profiter de nos offres.</p>',
        type: 'lifecycle',
        enabled: true,
        placeholders: ['{{customerName}}', '{{customerEmail}}'],
    },
    {
        id: 'supplier_invoice_order',
        name: 'Commande fournisseur (Dropshipping)',
        description: 'Envoyé au fournisseur pour une commande en dropshipping.',
        subject: 'Nouvelle commande à expédier - Réf: {{orderId}}',
        body: '<h1>Bonjour {{supplierName}},</h1><p>Veuillez trouver ci-joint les détails de la commande {{orderId}} à expédier directement à notre client.</p><div>{{invoiceBody}}</div>',
        type: 'transactional',
        enabled: true,
        placeholders: ['{{supplierName}}', '{{orderId}}', '{{invoiceBody}}'],
    },
    {
        id: 'winterization_quote',
        name: 'Devis Hivernage Piscine',
        description: 'Envoyé pour proposer un devis détaillé pour l\'hivernage d\'une piscine.',
        subject: 'Informations sur l’hivernage de votre piscine et choix de couverture',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Merci pour votre demande d’informations concernant l’hivernage de votre piscine.</p>
<p>Vous trouverez ci-dessous le détail complet de nos prestations ainsi qu’une comparaison entre les différents types de bâches adaptées à l’hivernage.</p>
<h2>🔹 1. Prix de l’hivernage</h2>
<p>Notre forfait hivernage piscine comprend :</p>
<ul>
    <li>Vidange partielle et mise au niveau d’eau,</li>
    <li>Nettoyage complet du bassin,</li>
    <li>Mise en place des produits d’hivernage,</li>
    <li>Installation des accessoires (flotteurs, gizzmos, bouchons, etc.),</li>
    <li>Contrôle du système de filtration.</li>
</ul>
<p>👉 <strong>Tarif :</strong> à partir de 250 € TTC (variable selon la taille du bassin).</p>
<h2>🔹 2. Choix de couverture pour l’hivernage</h2>
<p>Il existe principalement deux solutions :</p>
<h3>✅ Bâche à barres</h3>
<ul>
    <li><strong>Fonction :</strong> couverture 4 saisons, utilisable toute l’année (été comme hiver).</li>
    <li><strong>Sécurité :</strong> conforme à la norme NF P90-308 (protège les enfants et animaux).</li>
    <li><strong>Durabilité :</strong> 7 à 10 ans en moyenne.</li>
    <li><strong>Manipulation :</strong> facile grâce aux barres rigides ; possibilité d’ajouter un enrouleur/dérouleur pour plus de confort.</li>
    <li><strong>Prix :</strong>
        <ul>
            <li>Bâche à barres : 30 à 50 €/m²</li>
            <li>Dérouleur manuel (optionnel) : 200 à 400 €</li>
            <li>Fixations incluses</li>
        </ul>
    </li>
</ul>
<h3>✅ Bâche tendue (hivernage classique)</h3>
<ul>
    <li><strong>Fonction :</strong> conçue uniquement pour l’hivernage, protège des impuretés et réduit la photosynthèse (moins d’algues).</li>
    <li><strong>Sécurité :</strong> ne remplace pas un dispositif de sécurité, doit être combinée avec une alarme ou une barrière.</li>
    <li><strong>Durabilité :</strong> 5 à 7 ans en moyenne.</li>
    <li><strong>Manipulation :</strong> nécessite tendeurs + pitons fixés autour du bassin.</li>
    <li><strong>Prix :</strong>
        <ul>
            <li>Bâche tendue : 15 à 25 €/m²</li>
            <li>Accessoires (tendeurs, pitons) : 50 à 100 €</li>
        </ul>
    </li>
</ul>
<h2>🔹 3. Comparatif rapide</h2>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background-color:#f2f2f2;">
<th style="padding: 8px; border: 1px solid #ddd;">Critère</th>
<th style="padding: 8px; border: 1px solid #ddd;">Bâche à barres</th>
<th style="padding: 8px; border: 1px solid #ddd;">Bâche tendue</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Prix</td><td style="padding: 8px; border: 1px solid #ddd;">+ élevé (30–50 €/m²)</td><td style="padding: 8px; border: 1px solid #ddd;">+ abordable (15–25 €/m²)</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Sécurité</td><td style="padding: 8px; border: 1px solid #ddd;">Conforme norme NF P90-308</td><td style="padding: 8px; border: 1px solid #ddd;">Non sécuritaire</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Durée de vie</td><td style="padding: 8px; border: 1px solid #ddd;">7–10 ans</td><td style="padding: 8px; border: 1px solid #ddd;">5–7 ans</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Utilisation</td><td style="padding: 8px; border: 1px solid #ddd;">4 saisons</td><td style="padding: 8px; border: 1px solid #ddd;">Hiver uniquement</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Entretien</td><td style="padding: 8px; border: 1px solid #ddd;">Facile, manipulation rapide</td><td style="padding: 8px; border: 1px solid #ddd;">Mise en place plus longue</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Accessoires</td><td style="padding: 8px; border: 1px solid #ddd;">Dérouleur conseillé (200–400 €)</td><td style="padding: 8px; border: 1px solid #ddd;">Tendeurs + pitons (50–100 €)</td></tr>
</tbody>
</table>
<h2>🔹 4. Notre recommandation</h2>
<p>Si vous recherchez une couverture pratique, sécurisée et utilisable toute l’année, la <strong>bâche à barres</strong> est l’investissement le plus intéressant.</p>
<p>Si votre besoin est uniquement saisonnier et économique, la <strong>bâche tendue</strong> est suffisante pour protéger la piscine durant l’hiver.</p>
<p>Nous restons à votre disposition pour vous établir un devis personnalisé en fonction des dimensions exactes de votre bassin et de la solution choisie.</p>
<p>Dans l’attente de votre retour,</p>
<p>Bien cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'maintenance_quote',
        name: 'Devis Entretien Piscine',
        description: 'Envoyé pour proposer un devis pour un contrat d\'entretien de piscine.',
        subject: 'Votre devis pour l\'entretien de votre piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Suite à votre demande, voici notre proposition pour l'entretien de votre piscine.</p>
<h3>Formule Standard (à partir de 80 €/mois)</h3>
<ul>
    <li>Nettoyage bassin & ligne d’eau</li>
    <li>Vérification filtration</li>
    <li>Contrôle pH/chlore</li>
</ul>
<h3>Formule Premium (à partir de 200 €/mois)</h3>
<ul>
    <li>Tout inclus dans la formule Standard</li>
    <li>Entretien des abords</li>
    <li>Analyse approfondie de l'eau</li>
    <li>Vérification complète des équipements</li>
</ul>
<p>Nous pouvons bien sûr adapter nos services à vos besoins spécifiques. N'hésitez pas à nous contacter pour en discuter.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'construction_quote',
        name: 'Devis Construction / Rénovation Piscine',
        description: 'Envoyé pour proposer un devis pour un projet de construction ou de rénovation.',
        subject: 'Votre devis pour votre projet de piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Merci de l'intérêt que vous portez à nos services de construction et rénovation.</p>
<p>Nos projets étant entièrement sur-mesure, nous vous proposons de convenir d'un rendez-vous pour discuter de votre projet et vous établir un devis précis. Voici quelques exemples de budgets pour vous donner une idée :</p>
<ul>
    <li><strong>Formule Rénovation Éclat :</strong> à partir de 5 000 €</li>
    <li><strong>Formule Construction Signature (8x4m) :</strong> à partir de 30 000 €</li>
    <li><strong>Formule Prestige & Paysage :</strong> sur devis (à partir de 60 000 €)</li>
</ul>
<p>Nous sommes à votre disposition pour discuter de votre rêve de piscine.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'water_analysis_quote',
        name: 'Devis Analyse de l\'eau',
        description: 'Envoyé pour proposer un service d\'analyse d\'eau à domicile.',
        subject: 'Votre devis pour l\'analyse de l\'eau de votre piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Une eau saine et limpide est essentielle pour profiter pleinement de votre piscine. Voici nos offres pour une analyse complète.</p>
<h3>Analyse Express en Magasin (Gratuit)</h3>
<p>Apportez-nous un échantillon de votre eau, et nous l'analysons instantanément.</p>
<h3>Diagnostic Complet à Domicile (à partir de 75 €)</h3>
<ul>
    <li>Analyse de 10 paramètres essentiels.</li>
    <li>Inspection visuelle de vos équipements.</li>
    <li>Remise d'un plan de traitement détaillé et chiffré.</li>
</ul>
<p>N'hésitez pas à prendre rendez-vous.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'repair_quote',
        name: 'Devis Réparation & Dépannage',
        description: 'Envoyé pour proposer un devis pour une intervention de dépannage ou de réparation.',
        subject: 'Votre devis de réparation pour votre piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Suite à votre demande de dépannage, voici notre proposition d'intervention.</p>
<h3>Forfait Diagnostic (à partir de 150 €)</h3>
<p>Ce forfait inclut le déplacement d'un technicien et 1h d'analyse pour identifier l'origine de la panne. Un devis détaillé pour la réparation vous sera ensuite fourni. Le coût du diagnostic est déduit si vous acceptez la réparation.</p>
<h3>Forfait Réparation (à partir de 250 €)</h3>
<p>Ce forfait inclut le diagnostic et jusqu'à 2h de main d'œuvre pour les pannes courantes (hors pièces détachées majeures).</p>
<p>Nous nous efforçons d'intervenir rapidement pour que vous puissiez de nouveau profiter de votre piscine au plus vite.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
];

export const ADMIN_SIDEBAR_LINKS: { view: AdminView; label: string; icon: React.ReactElement }[] = [
    { view: 'dashboard', label: 'Tableau de Bord', icon: <BarChart2 size={20} /> },
    { view: 'orders', label: 'Commandes', icon: <ShoppingCart size={20} /> },
    { view: 'products', label: 'Produits', icon: <Package size={20} /> },
    { view: 'inventory', label: 'Inventaire', icon: <FileText size={20} /> },
    { view: 'clients', label: 'Clients', icon: <Users size={20} /> },
    { view: 'billing', label: 'Facturation', icon: <CreditCard size={20} /> },
    { view: 'suppliers', label: 'Fournisseurs', icon: <Contact size={20} /> },
    { view: 'purchaseOrders', label: 'Bons de Commande', icon: <FileIcon size={20} /> },
    { view: 'dropshipping', label: 'Dropshipping', icon: <GitBranch size={20} /> },
    { view: 'paymentMethods', label: 'Paiements', icon: <DollarSign size={20} /> },
    { view: 'emails', label: 'Emails', icon: <MailIcon size={20} /> },
    { view: 'infoBanner', label: 'Bannière Info', icon: <Bell size={20} /> },
    { view: 'popups', label: 'Pop-ups', icon: <MessageSquare size={20} /> },
    { view: 'menuManagement', label: 'Gestion du Menu', icon: <Menu size={20} /> },
];