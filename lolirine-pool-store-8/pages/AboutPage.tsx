import React from 'react';
import { Users, Target, Heart } from 'lucide-react';
import { AboutPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const AboutPage: React.FC<AboutPageProps> = ({ goBack, canGoBack }) => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Qui sommes-nous ?</h1>
          <p className="mt-2 text-lg text-gray-300">L'histoire et les valeurs derrière Piscine Pro Services.</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Histoire</h2>
            <p className="text-gray-600 mb-4">
              Fondée il y a plus de 10 ans par des passionnés de l'univers de la piscine, Piscine Pro Services est née d'une ambition simple : offrir un service complet et irréprochable aux propriétaires de piscines de la région.
            </p>
            <p className="text-gray-600">
              Nous avons commencé comme une petite équipe d'entretien et, grâce à la confiance de nos clients, nous avons grandi pour devenir un acteur incontournable, proposant la construction, la rénovation, la réparation et la vente de matériel de pointe.
            </p>
          </div>
          <div>
            <img src="https://picsum.photos/seed/team/600/400" alt="L'équipe Piscine Pro Services" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="inline-block bg-cyan-100 text-cyan-600 rounded-full p-4 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p className="text-gray-600">Notre équipe est composée de techniciens qualifiés et formés en continu aux dernières innovations du secteur.</p>
            </div>
            <div className="p-6">
              <div className="inline-block bg-cyan-100 text-cyan-600 rounded-full p-4 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Réactivité</h3>
              <p className="text-gray-600">Nous savons qu'une panne ne peut pas attendre. Notre engagement est d'intervenir dans les plus brefs délais.</p>
            </div>
            <div className="p-6">
              <div className="inline-block bg-cyan-100 text-cyan-600 rounded-full p-4 mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Satisfaction Client</h3>
              <p className="text-gray-600">Votre satisfaction est notre plus grande récompense. Nous construisons des relations de confiance sur le long terme.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;