import React from 'react';
import { Users, Target, Heart, Building, Award, Wrench, Smile, ArrowRight } from 'lucide-react';
import { AboutPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const AboutPage: React.FC<AboutPageProps> = ({ goBack, canGoBack }) => {
  const teamMembers = [
    {
      name: "Le Fondateur",
      role: "Vision & Expertise",
      bio: "Passionné par l'univers de la piscine depuis plus de 15 ans, il a créé l'entreprise avec l'ambition d'offrir un service inégalé.",
      icon: <Award className="h-8 w-8 text-cyan-600" />
    },
    {
      name: "Chef de Chantier",
      role: "Technique & Réalisation",
      bio: "Notre expert technique qui supervise chaque projet, garantissant une construction et une rénovation dans les règles de l'art.",
      icon: <Wrench className="h-8 w-8 text-cyan-600" />
    },
    {
      name: "Service Client",
      role: "Conseil & Accompagnement",
      bio: "Votre interlocuteur privilégié pour répondre à toutes vos questions et vous guider dans vos choix.",
      icon: <Smile className="h-8 w-8 text-cyan-600" />
    }
  ];
  
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center" 
        style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan19.avif')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>Notre Passion, Votre Piscine</h1>
            <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                Bien plus qu'un métier, la conception et l'entretien de piscines est pour nous une véritable passion que nous partageons avec vous depuis plus de 10 ans.
            </p>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
           {canGoBack && <GoBackButton onClick={goBack} className="mb-12" />}
           <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Engagement</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chez Lolirine Pool Store, nous croyons qu'une piscine est un lieu de vie, de partage et de bien-être. C'est pourquoi nous nous engageons à fournir non seulement des produits de qualité, mais aussi un service d'expert, réactif et entièrement tourné vers votre satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
            <div className="p-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="inline-block bg-cyan-100 text-cyan-600 rounded-full p-4 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expertise Technique</h3>
              <p className="text-gray-600">Notre équipe est composée de techniciens qualifiés, formés en continu pour maîtriser chaque aspect de votre installation, des plus traditionnelles aux plus innovantes.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="inline-block bg-cyan-100 text-cyan-600 rounded-full p-4 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Conseil & Réactivité</h3>
              <p className="text-gray-600">Nous sommes à votre écoute pour vous conseiller et intervenons rapidement en cas de besoin, car nous savons que votre tranquillité n'attend pas.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="inline-block bg-cyan-100 text-cyan-600 rounded-full p-4 mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Satisfaction Client</h3>
              <p className="text-gray-600">Votre satisfaction est notre plus grande récompense. Nous bâtissons des relations de confiance durables, fondées sur la transparence et la qualité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <img src="https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_3662.heic" alt="Notre expert au travail" className="rounded-lg shadow-xl" />
                </div>
                 <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
                    <div className="relative border-l-2 border-cyan-200 pl-8 space-y-10">
                        <div className="absolute -left-[11px] top-1 w-5 h-5 bg-cyan-500 rounded-full border-4 border-white"></div>
                        <div>
                            <h4 className="font-bold text-lg">La Fondation</h4>
                            <p className="text-sm text-gray-500 mb-1">Il y a plus de 10 ans</p>
                            <p className="text-gray-600">L'aventure commence avec une ambition simple : offrir un service complet et irréprochable aux propriétaires de piscines de la région.</p>
                        </div>
                         <div className="absolute -left-[11px] top-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-500 rounded-full border-4 border-white"></div>
                        <div>
                            <h4 className="font-bold text-lg">L'Expansion</h4>
                            <p className="text-sm text-gray-500 mb-1">5 ans plus tard</p>
                            <p className="text-gray-600">Grâce à la confiance de nos clients, nous devenons un acteur incontournable, élargissant nos services à la construction et à la vente de matériel de pointe.</p>
                        </div>
                        <div className="absolute -left-[11px] bottom-1 w-5 h-5 bg-cyan-500 rounded-full border-4 border-white"></div>
                        <div>
                            <h4 className="font-bold text-lg">Aujourd'hui</h4>
                            <p className="text-gray-600">Nous continuons d'innover pour vous proposer les meilleures solutions, alliant technologie, esthétique et respect de l'environnement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Une Équipe à Votre Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map(member => (
                    <div key={member.name} className="bg-slate-50 text-center p-8 rounded-lg border border-slate-200">
                        <div className="inline-block bg-white p-4 rounded-full mb-4 shadow-sm">
                          {member.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-cyan-600 font-semibold mb-3">{member.role}</p>
                        <p className="text-gray-600">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Our Presence Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Notre Présence sur le Terrain</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Store Column */}
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
              <img src="https://storage.googleapis.com/lolirinepoolstoreimage/magasin-piscine-aquilus-640x420.jpg" alt="Notre magasin" className="rounded-lg shadow-lg mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Venez nous rencontrer en magasin</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Notre magasin est plus qu'une boutique, c'est un lieu de conseil et d'échange. Venez découvrir nos produits, discuter de votre projet ou simplement demander une analyse d'eau. Notre équipe sera ravie de vous accueillir.
              </p>
              <div className="flex items-start gap-3 mt-6">
                <Building className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Lolirine Pool Store</p>
                  <p className="text-gray-600">Rue Bois D'Esneux 110, 5021 Boninne (Namur), Belgique</p>
                </div>
              </div>
            </div>

            {/* Mobile Service Column */}
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
              <img src="https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_8452.png" alt="Notre service mobile" className="rounded-lg shadow-lg mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nos techniciens sur la route</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Parce que votre piscine a besoin d'une expertise directement sur place, nos équipes se déplacent chez vous pour l'entretien, le dépannage et la supervision de vos chantiers. Équipés et formés, ils sont le prolongement de notre engagement qualité, directement dans votre jardin.
              </p>
              <div className="flex items-start gap-3 mt-6">
                <Wrench className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Un service à domicile</p>
                  <p className="text-gray-600">Entretien, réparation, diagnostic et suivi de chantier partout dans la région.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à Plonger dans Votre Projet ?</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">Que ce soit pour une nouvelle construction, une rénovation ou un simple conseil, notre équipe est là pour vous accompagner.</p>
            <button
                onClick={() => { /* This should navigate to contact page */ }}
                className="bg-white hover:bg-cyan-50 text-cyan-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Contactez-nous <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;