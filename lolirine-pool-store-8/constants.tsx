
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


export const ADMIN_PASSWORD = 'adminLolirine03@15@';

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
    { 
        id: 'wellness-all', 
        label: 'Voir tout l\'espace Wellness', 
        page: 'wellness'
    },
    {
      id: 'wellness-spas-residentiels',
      label: 'Spas Résidentiels',
      page: 'shop',
      categoryFilter: 'Wellness - Spas Résidentiels',
      children: [
        { id: 'wellness-spas-residentiels-all', label: 'Voir tous les spas résidentiels', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels' },
        { id: 'wellness-spas-residentiels-collection', label: 'La collection', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - La collection' },
        { id: 'wellness-spas-residentiels-equipements', label: 'Les équipements des spas privés', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Équipements des spas privés' },
        { id: 'wellness-spas-residentiels-apercu', label: '1 spa en 1 coup d\'oeil !', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - 1 spa en 1 coup d\'oeil' },
        {
          id: 'wellness-spas-residentiels-meuble',
          label: 'Spas privés avec meuble',
          page: 'shop',
          categoryFilter: 'Wellness - Spas Résidentiels - Spas privés avec meuble',
          children: [
            { id: 'wellness-spas-residentiels-meuble-all', label: 'Voir tous les spas avec meuble', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas privés avec meuble' },
            { id: 'wellness-spas-residentiels-meuble-ocean', label: 'Ocean Dreams', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas privés avec meuble - Ocean Dreams' },
            { id: 'wellness-spas-residentiels-meuble-essentiels', label: 'Les ESSENTIELS', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas privés avec meuble - Les ESSENTIELS' },
            { id: 'wellness-spas-residentiels-meuble-origins', label: 'ORIGINS', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas privés avec meuble - ORIGINS' },
            { id: 'wellness-spas-residentiels-meuble-classiques', label: 'Les CLASSIQUES', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas privés avec meuble - Les CLASSIQUES' },
          ]
        },
        { id: 'wellness-spas-residentiels-nage', label: 'Spas de nage', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas de nage' },
        { id: 'wellness-spas-residentiels-encastrables', label: 'Spas encastrables', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas encastrables' },
        { id: 'wellness-spas-residentiels-traitement', label: 'Traitement de l\'eau', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Traitement de l\'eau' },
        { id: 'wellness-spas-residentiels-nettoyage', label: 'Nettoyage des spas', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Nettoyage des spas' },
        { id: 'wellness-spas-residentiels-accessoires', label: 'Accessoires pour spas', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Accessoires pour spas' },
      ]
    },
    {
      id: 'wellness-spas-publics',
      label: 'Spas Publics',
      page: 'shop',
      categoryFilter: 'Wellness - Spas Publics',
      children: [
          { id: 'wellness-spas-publics-all', label: 'Voir tous les Spas Publics', page: 'shop', categoryFilter: 'Wellness - Spas Publics' },
          { id: 'wellness-spas-publics-hotels', label: 'Spas pour Hôtels & Gîtes', page: 'shop', categoryFilter: 'Wellness - Spas Publics - Hôtels' },
          { id: 'wellness-spas-publics-normes', label: 'Conformes aux normes ERP', page: 'shop', categoryFilter: 'Wellness - Spas Publics - ERP' },
      ]
    },
    {
      id: 'wellness-equipements',
      label: 'Équipements Wellness',
      page: 'shop',
      categoryFilter: 'Wellness - Équipements Wellness',
      children: [
          { id: 'wellness-equipements-all', label: 'Voir tous les Équipements', page: 'shop', categoryFilter: 'Wellness - Équipements Wellness' },
          { id: 'wellness-equipements-couvertures', label: 'Couvertures & Abris', page: 'shop', categoryFilter: 'Wellness - Équipements Wellness - Couvertures' },
          { id: 'wellness-equipements-chauffage', label: 'Chauffage & Déshumidification', page: 'shop', categoryFilter: 'Wellness - Équipements Wellness - Chauffage' },
          { id: 'wellness-equipements-saunas', label: 'Saunas & Hammams', page: 'shop', categoryFilter: 'Wellness - Équipements Wellness - Saunas' },
          { id: 'wellness-equipements-douches', label: 'Douches sensorielles', page: 'shop', categoryFilter: 'Wellness - Équipements Wellness - Douches' },
      ]
    },
];

export const BOUTIQUE_SUB_CATEGORIES: NavLink[] = [
  {
    id: 'shop-all',
    label: 'Voir toute la boutique',
    page: 'shop',
  },
  {
    id: 'shop-nettoyage',
    label: 'Nettoyage',
    page: 'shop',
    categoryFilter: 'Nettoyage',
    children: [
      { id: 'shop-nettoyage-all', label: 'Voir tout Nettoyage', page: 'shop', categoryFilter: 'Nettoyage' },
      { id: 'shop-nettoyage-robots', label: 'Robots Piscine Privée', page: 'shop', categoryFilter: 'Nettoyage - Robots Piscine Privée' },
    ]
  },
  {
    id: 'shop-filtration',
    label: 'Filtration',
    page: 'shop',
    categoryFilter: 'Filtration',
    children: [
       { id: 'shop-filtration-all', label: 'Voir tout Filtration', page: 'shop', categoryFilter: 'Filtration' }
    ]
  },
  {
    id: 'shop-pompes',
    label: 'Pompes',
    page: 'shop',
    categoryFilter: 'Pompes',
     children: [
       { id: 'shop-pompes-all', label: 'Voir toutes les Pompes', page: 'shop', categoryFilter: 'Pompes' }
    ]
  },
  {
    id: 'shop-traitement-eau',
    label: "Traitement de l'eau",
    page: 'shop',
    categoryFilter: "Traitement de l'eau",
    children: [
      { id: 'shop-traitement-eau-all', label: 'Voir tout Traitement', page: 'shop', categoryFilter: "Traitement de l'eau" },
      { id: 'shop-traitement-eau-desinfection', label: 'Désinfection', page: 'shop', categoryFilter: "Traitement de l'eau - Désinfection" },
      { id: 'shop-traitement-eau-equilibre', label: "Équilibre de l'eau", page: 'shop', categoryFilter: "Traitement de l'eau - Équilibre de l'eau" },
      { id: 'shop-traitement-eau-floculants', label: 'Floculants', page: 'shop', categoryFilter: "Traitement de l'eau - Floculants" },
      { id: 'shop-traitement-eau-prevention', label: 'Prévention', page: 'shop', categoryFilter: "Traitement de l'eau - Prévention" },
    ]
  },
  {
    id: 'shop-instruments-mesure',
    label: 'Instruments de mesure',
    page: 'shop',
    categoryFilter: 'Instruments de mesure',
    children: [
        { id: 'shop-instruments-mesure-all', label: 'Voir tout', page: 'shop', categoryFilter: 'Instruments de mesure' },
        { id: 'shop-instruments-mesure-analyseurs', label: 'Analyseurs Connectés', page: 'shop', categoryFilter: 'Instruments de mesure - Analyseurs Connectés' },
        { id: 'shop-instruments-mesure-bandelettes', label: 'Bandelettes', page: 'shop', categoryFilter: 'Instruments de mesure - Bandelettes' },
    ]
  },
  {
    id: 'shop-materiel-electrique',
    label: 'Matériel Électrique',
    page: 'shop',
    categoryFilter: 'Matériel Électrique',
    children: [
        { id: 'shop-materiel-electrique-all', label: 'Voir tout', page: 'shop', categoryFilter: 'Matériel Électrique' },
        { id: 'shop-materiel-electrique-lampes', label: 'Lampes', page: 'shop', categoryFilter: 'Matériel Électrique - Lampes' },
        { id: 'shop-materiel-electrique-coffrets', label: 'Coffrets Électriques', page: 'shop', categoryFilter: 'Matériel Électrique - Coffrets Électriques' },
        { id: 'shop-materiel-electrique-accessoires', label: 'Accessoires Électriques', page: 'shop', categoryFilter: 'Matériel Électrique - Accessoires Électriques' },
    ]
  },
    {
    id: 'shop-pieces-sceller',
    label: 'Pièces à sceller',
    page: 'shop',
    categoryFilter: 'Pièces à sceller',
    children: [
        { id: 'shop-pieces-sceller-all', label: 'Voir tout', page: 'shop', categoryFilter: 'Pièces à sceller' },
        { id: 'shop-pieces-sceller-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Pièces à sceller - Accessoires' },
        { id: 'shop-pieces-sceller-prestige', label: 'PRESTIGE', page: 'shop', categoryFilter: 'Pièces à sceller - PRESTIGE' },
    ]
  },
  {
    id: 'shop-raccords-pvc',
    label: 'Raccords & PVC',
    page: 'shop',
    categoryFilter: 'Raccords & PVC',
    children: [
        { id: 'shop-raccords-pvc-all', label: 'Voir tout', page: 'shop', categoryFilter: 'Raccords & PVC' },
        { id: 'shop-raccords-pvc-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Raccords & PVC - Accessoires' },
        { id: 'shop-raccords-pvc-colles', label: 'Colles', page: 'shop', categoryFilter: 'Raccords & PVC - Colles' },
    ]
  },
  {
    id: 'shop-chauffage',
    label: 'Chauffage',
    page: 'shop',
    categoryFilter: 'Chauffage',
    children: [
        { id: 'shop-chauffage-all', label: 'Voir tout Chauffage', page: 'shop', categoryFilter: 'Chauffage' },
        { id: 'shop-chauffage-pac', label: 'Pompes à Chaleur', page: 'shop', categoryFilter: 'Chauffage - Pompes à Chaleur' },
    ]
  },
  {
    id: 'shop-liners',
    label: 'Liners',
    page: 'shop',
    categoryFilter: 'Liners',
    children: [
        { id: 'shop-liners-all', label: 'Voir tout Liners', page: 'shop', categoryFilter: 'Liners' },
        { 
            id: 'shop-liners-membrane', 
            label: 'Membrane Armée', 
            page: 'shop', 
            categoryFilter: 'Liners - Membrane Armée',
            children: [
                { id: 'shop-liners-membrane-all', label: 'Voir tout Membrane Armée', page: 'shop', categoryFilter: 'Liners - Membrane Armée' },
                { id: 'shop-liners-membrane-unis', label: 'Unis', page: 'shop', categoryFilter: 'Liners - Membrane Armée - Unis' },
            ]
        },
        { id: 'shop-liners-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Liners - Accessoires' },
    ]
  }
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
    title: 'Rénovation Complète',
    category: 'Rénovation',
    description: "Transformation d'une piscine vieillissante avec un nouveau liner gris anthracite et des margelles modernes.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20avant.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20apre%CC%80s.jpg'
    ],
  },
  {
    id: 2,
    title: 'Construction Complète Piscine',
    category: 'Construction',
    description: "Construction d'une piscine de A à Z, de la conception du plan à la mise en eau, pour un résultat sur-mesure.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20ServBalfr%20avant.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20ServBalfr%20apre%CC%80s.jpg'
    ]
  },
  {
    id: 3,
    title: 'Piscine Miroir Neuve',
    category: 'Construction',
    description: "Création d'une piscine miroir design, parfaitement intégrée dans son environnement.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-08-09-10-51-45.jpg']
  },
  {
    id: 4,
    title: 'Installation Volet Roulant',
    category: 'Équipement',
    description: "Pose d'un volet roulant immergé pour la sécurité et la propreté du bassin.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-05.jpg']
  },
  {
    id: 5,
    title: 'Intégration Paysagère',
    category: 'Construction',
    description: 'Une réalisation harmonieuse où la piscine devient le cœur du jardin.',
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-04-13-16-20-01.jpg']
  },
  {
    id: 6,
    title: 'Ambiance Nocturne',
    category: 'Équipement',
    description: "Installation d'un système d'éclairage LED pour sublimer la piscine à la nuit tombée.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-20-46-29.jpg']
  },
  {
    id: 7,
    title: 'Piscine avec Vue',
    category: 'Construction',
    description: "Une piscine parfaitement positionnée pour profiter d'une vue imprenable.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-06.jpg']
  },
  {
    id: 8,
    title: 'Détails de Finition',
    category: 'Rénovation',
    description: "Zoom sur la qualité des finitions et l'intégration des pièces à sceller.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-07.jpg']
  },
  {
    id: 9,
    title: 'Éclairage Subaquatique',
    category: 'Équipement',
    description: 'Mise en valeur du bassin par un éclairage puissant et économe en énergie.',
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-20-47-46.jpg']
  },
  {
    id: 10,
    title: 'Volet de Sécurité',
    category: 'Équipement',
    description: "Installation d'un volet de sécurité sur une piscine existante.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-16-20-42-31.jpg']
  },
  {
    id: 11,
    title: 'Piscine Élégante avec Volet Roulant',
    category: 'Équipement',
    description: "Installation d'un volet roulant immergé alliant sécurité, esthétique et propreté pour une piscine moderne.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0077.heic']
  },
  {
    id: 12,
    title: 'Piscine Moderne et Épurée',
    category: 'Construction',
    description: "Conception et construction d'une piscine au design contemporain, avec un aménagement paysager soigné pour une intégration parfaite.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/c9070a7c-9721-4668-9746-db57410969b5.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/a612ffdb-0868-4bbc-b462-1dbf76641f60.jpeg'
    ]
  },
  {
    id: 13,
    title: 'Local Technique Optimisé',
    category: 'Équipement',
    description: "Installation et optimisation d'un local technique avec un système de filtration performant pour une eau pure et une maintenance facilitée.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9493.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9492.jpeg'
    ]
  },
  {
    id: 14,
    title: 'Piscine avec Terrasse en Bois',
    category: 'Construction',
    description: "Réalisation d'une piscine entourée d'une terrasse en bois exotique, créant un espace de détente chaleureux et convivial.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/8863880c-9a53-4972-8ce1-23cca8249e0a.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/6c812c42-af2e-46ec-ad09-66d66f8cf82e.jpeg'
    ]
  },
  {
    id: 15,
    title: 'Finitions en Mosaïque',
    category: 'Rénovation',
    description: "Pose d'une mosaïque de haute qualité, apportant une touche d'élégance et de raffinement au bassin.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/04f7b074-8c49-4cf5-9fe2-c07eb4bc6262.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/0201527c-8690-4aa6-a6f0-f02b406ddb8c.jpeg'
    ]
  },
  {
    id: 16,
    title: 'Volet Roulant Intégré',
    category: 'Équipement',
    description: "Installation d'un volet roulant immergé, discret et esthétique, pour assurer la sécurité et maintenir la propreté de l'eau.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0078.heic'
    ]
  },
  {
    id: 17,
    title: 'Couverture de Sécurité sur Mesure',
    category: 'Équipement',
    description: "Mise en place d'une couverture de sécurité robuste et sur mesure pour protéger le bassin durant toutes les saisons.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0129.heic',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0133.heic'
    ]
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
        id: '32474',
        name: 'Spa Evolution Wellness',
        category: 'Wellness - Spa Evolution',
        price: 9990,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/32474/400/400',
        description: 'Dimensions: 233x233x91 cm (+ ou - 2 cm)',
        stock: 5,
        supplierId: 'sup-2'
    },
    {
        id: 'spa-evo-70-e',
        name: 'Spa Evolution 70',
        category: 'Wellness - Spa Evolution',
        price: 9990,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/spa-evo-70-e/400/400',
        description: 'Dimensions: 233x233x91 cm (+ ou - 2 cm)',
        stock: 3,
        supplierId: 'sup-2'
    },
    {
        id: '62399',
        name: 'Spa Atlantida Wellness',
        category: 'Wellness - Spa Atlantida',
        price: 8990,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/62399/400/400',
        description: 'Dimensions: 216x216x91 cm (+ ou - 2 cm)',
        stock: 8,
        supplierId: 'sup-2'
    },
    {
        id: '69130',
        name: 'Spa Pacific 7 Wellness',
        category: 'Wellness - Spa Pacific 7',
        price: 9250,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/69130/400/400',
        description: 'Dimensions: 216x216x91 cm (+ ou - 2 cm)',
        stock: 4,
        supplierId: 'sup-2'
    },
    {
        id: '69863',
        name: 'Spa Océan 7 Wellness',
        category: 'Wellness - Spa Océan 7',
        price: 7500,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/69863/400/400',
        description: 'Dimensions: 216x216x91 cm (+ ou - 2 cm)',
        stock: 10,
        supplierId: 'sup-2'
    },
    {
        id: 'chlore-001-multi',
        name: 'Chlore multi traitement',
        category: 'Traitement de l\'eau - Désinfection',
        price: 39.99,
        promoPrice: 34.99,
        isOnSale: true,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/chlore-001-multi/400/400',
        description: 'Galets de chlore 5 actions pour une désinfection complète de votre piscine.',
        stock: 50
    },
    {
        id: 'robot-001',
        name: 'Robot nettoy.',
        category: 'Nettoyage - Robots',
        price: 799,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/robot-001/400/400',
        description: 'Robot autonome pour le nettoyage du fond de la piscine.',
        stock: 15,
        isDropshipping: true,
        supplierId: 'sup-zodiac'
    },
    {
        id: 'liner-001-75',
        name: 'Liner 75/100',
        category: 'Liners',
        price: 899,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/liner-001-75/400/400',
        description: 'Couleur: Bleu Pâle, Épaisseur: 75/100e.',
        stock: 10
    },
    {
        id: 'SCPAQG-100',
        name: 'Pompe à Viti Filtration',
        category: 'Filtration - Pompes',
        price: 1010,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/SCPAQG-100/400/400',
        description: 'Type: Pompe de filtration, Interface: Standard.',
        stock: 8
    },
    {
        id: 'WR00030',
        name: 'Robot de pis',
        category: 'Nettoyage - Robots',
        price: 1350,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/WR00030/400/400',
        description: 'Marque: Zodiac, Type de piscine: Toutes.',
        stock: 4
    },
    {
        id: 'elec-cof-001-elect',
        name: 'Coffret Élect. Matériel Électrique',
        category: 'Matériel Électrique - Coffrets',
        price: 189.9,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/elec-cof-001-elect/400/400',
        description: 'Type: Coffret de filtration, Intensité: 10A.',
        stock: 15
    },
    {
        id: 'elec-lamp-001-proj',
        name: 'Projecteur LE Matériel Électrique',
        category: 'Matériel Électrique - Lampes',
        price: 149.5,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/elec-lamp-001-proj/400/400',
        description: 'Type: Projecteur LED, Couleur: Multicolore.',
        stock: 20
    },
    {
        id: 'elec-acc-002-boite',
        name: 'Boîte de Con Matériel Électrique',
        category: 'Matériel Électrique - Accessoires',
        price: 22.5,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/elec-acc-002-boite/400/400',
        description: 'Type: Boîte de connexion.',
        stock: 50
    },
    {
        id: 'prod-10055-echelle',
        name: 'Échelle Inox Pièces à sceller',
        category: 'Pièces à sceller - Échelles',
        price: 250,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10055-echelle/400/400',
        description: 'Échelle en acier inoxydable pour un accès facile et sécurisé.',
        stock: 15
    },
    {
        id: 'prod-10055-main',
        name: 'Main couran Pièces à sceller',
        category: 'Pièces à sceller - Mains courantes',
        price: 180,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10055-main/400/400',
        description: 'Pour une sortie de bain sécurisée et élégante.',
        stock: 30
    },
    {
        id: 'prod-10060-skimmer',
        name: 'Skimmer Pièces à sceller',
        category: 'Pièces à sceller - Skimmers',
        price: 90,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10060-skimmer/400/400',
        description: 'Skimmer grande meurtrière de la gamme PRESTIGE.',
        stock: 20
    },
    {
        id: 'prod-10195-brosse',
        name: 'Brosse court Nettoyage',
        category: 'Nettoyage - Brosses',
        price: 12.53,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10195-brosse/400/400',
        description: 'Marque: SHARK.',
        stock: 50
    },
    {
        id: 'prod-10255-complement',
        name: 'Complement Wellness',
        category: 'Wellness - Compléments',
        price: 15.9,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10255-complement/400/400',
        description: 'Type: Bandelettes de test.',
        stock: 100
    },
    {
        id: 'prod-10255-equilibre-d',
        name: 'Équilibre d\'e Wellness',
        category: 'Wellness - Équilibre de l\'eau',
        price: 9.5,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10255-equilibre-d/400/400',
        description: 'Produit: pH +.',
        stock: 80
    },
    {
        id: 'prod-10255-equilibre-d-2',
        name: 'Équilibre d\'e Wellness',
        category: 'Wellness - Équilibre de l\'eau',
        price: 10.2,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10255-equilibre-d-2/400/400',
        description: 'Produit: pH -.',
        stock: 80
    },
    {
        id: 'prod-10255-desinfection',
        name: 'Désinfection Wellness',
        category: 'Wellness - Désinfection',
        price: 15,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10255-desinfection/400/400',
        description: 'Produit: Chlore granulé.',
        stock: 80
    },
    {
        id: 'prod-10330-vanne',
        name: 'Vanne 6 voie Raccords & PVC',
        category: 'Raccords & PVC - Vannes',
        price: 75,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/prod-10330-vanne/400/400',
        description: 'Vanne multivoies pour filtre à sable, facile à installer.',
        stock: 40
    },
    {
        id: 'net-002',
        name: 'Épuisette de Nettoyage',
        category: 'Nettoyage - Épuisettes',
        price: 22.5,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/net-002/400/400',
        description: 'Épuisette de fond robuste pour un nettoyage efficace du fond de votre piscine.',
        stock: 150
    },
    {
        id: 'net-003',
        name: 'Brosse de pa Nettoyage',
        category: 'Nettoyage - Brosses',
        price: 18.9,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/net-003/400/400',
        description: 'Brosse large pour un nettoyage rapide et efficace des parois de votre piscine.',
        stock: 200
    },
    {
        id: 'robot-002',
        name: 'Robot de pis Nettoyage',
        category: 'Nettoyage - Robots',
        price: 649,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/robot-002/400/400',
        description: 'Robot électrique performant pour le nettoyage.',
        isDropshipping: true,
        supplierId: 'sup-zodiac',
        stock: 20
    },
    {
        id: 'filt-001',
        name: 'Cartouche de Filtration',
        category: 'Filtration - Cartouches',
        price: 35,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/filt-001/400/400',
        description: 'Cartouche de rechange pour filtre Weltico, Hauteur 495mm, diamètre 180mm.',
        stock: 80
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
        total: 48.39,
        status: 'Complété',
        items: [
            {...INITIAL_PRODUCTS.find(p => p.id === 'chlore-001-multi')!, quantity: 1},
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
        total: 966.79,
        status: 'En attente',
        items: [
            {...INITIAL_PRODUCTS.find(p => p.id === 'robot-001')!, quantity: 1},
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
    { id: 'sup-2', name: 'Fournisseur Spa', email: 'contact@spa-supplier.com', phone: '+32499887766' },
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
            { id: 'item-1', description: 'Chlore multi traitement', quantity: 1, unitPrice: 39.99, taxRate: 0.21 },
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
    { view: 'emails', label: 'Emails & Notifs', icon: <MailIcon size={20} /> },
    { view: 'infoBanner', label: 'Bannière Info', icon: <Bell size={20} /> },
    { view: 'popups', label: 'Pop-ups', icon: <MessageSquare size={20} /> },
    { view: 'menuManagement', label: 'Gestion du Menu', icon: <Menu size={20} /> },
];
