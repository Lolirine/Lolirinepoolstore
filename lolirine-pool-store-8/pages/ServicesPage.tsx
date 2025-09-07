import React, { useState, useEffect } from 'react';
import { Page, PageWithBackButtonProps } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { ArrowRight, Calendar, Sun, Zap, TestTube, Sparkles, Wrench, Search, Clock, Droplet, ShieldAlert, BadgeCheck, Cog, ShieldCheck, CalendarDays, CheckCircle } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

interface ServicesPageProps extends PageWithBackButtonProps {
  navigateTo: (page: Page) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ navigateTo, goBack, canGoBack }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
      'https://storage.googleapis.com/lolirine_pool_store_photos/Entretien%20piscine1.jpg',
      'https://storage.googleapis.com/lolirine_pool_store_photos/Entretien%20piscine2.jpg',
      'https://storage.googleapis.com/lolirine_pool_store_photos/Entretien%20piscine3.jpg.webp',
      'https://storage.googleapis.com/lolirine_pool_store_photos/Analyse%20de%20l\'eau3.jpg.webp'
  ];

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(timer);
  }, [heroImages.length]);

  const maintenanceProducts = INITIAL_PRODUCTS.filter(p => 
    ['chlore-001', 'WR00030', 'prod-10195-2', 'prod-10255-22'].includes(String(p.id))
  ).slice(0, 4);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden text-white">
        {heroImages.map((src, index) => (
            <div
                key={src}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${src})` }}
            />
        ))}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            🌊 Profitez d’une piscine impeccable… sans lever le petit doigt !
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Et si vous pouviez simplement vous baigner et vous détendre, sans jamais vous soucier de l’entretien ? Chez nous, nous transformons la corvée en confort.
          </p>
        </div>
      </section>

      {/* NEW SECTION: Custom Solutions */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            {canGoBack && <GoBackButton onClick={goBack} className="mb-8 inline-flex" />}
            <h2 className="text-3xl font-bold text-cyan-800 mb-4">
              Entretien de piscine : des solutions sur mesure pour chaque besoin
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Qu’il s’agisse de votre piscine privée, de celle d’un hôtel ou d’une résidence secondaire, nous adaptons nos contrats à vos besoins pour vous offrir une sérénité absolue. Nos prestations incluent :
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Nettoyage régulier</h3>
                <p className="text-gray-600 mt-1">Aspiration du bassin, brossage des parois et ligne d’eau, entretien des margelles et plages.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <Cog size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Contrôle et maintenance des équipements</h3>
                <p className="text-gray-600 mt-1">Pompe, filtre, skimmers, robots et systèmes de traitement automatisés.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <TestTube size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Suivi de la qualité de l’eau</h3>
                <p className="text-gray-600 mt-1">Analyse précise, équilibrage du pH, ajustement du taux de chlore ou de sel, ajout de produits spécifiques si nécessaire.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Prévention des pannes</h3>
                <p className="text-gray-600 mt-1">Détection des anomalies et interventions rapides pour prolonger la durée de vie de vos installations.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 md:col-span-2 md:max-w-xl mx-auto">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <CalendarDays size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Flexibilité des visites</h3>
                <p className="text-gray-600 mt-1">Hebdomadaires, mensuelles ou ponctuelles selon l’utilisation de votre piscine et vos attentes.</p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-lg text-gray-800 max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-200">
            Grâce à notre savoir-faire et à des produits de qualité, nous vous assurons une eau claire, saine et agréable, ainsi qu’un bassin toujours prêt à accueillir vos moments de détente et de convivialité.
          </p>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nos Formules d'Entretien</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Choisissez la formule qui vous convient pour une piscine toujours parfaite, sans effort.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card Standard */}
            <div
              onClick={() => navigateTo('contact')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('contact'); }}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Standard</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Idéale pour les piscines privées utilisées régulièrement.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Nettoyage</strong> du bassin et de la ligne d’eau</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Vérification</strong> du système de filtration</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Contrôle et ajustement</strong> des paramètres de l’eau (pH, chlore, sel)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Intervention <strong>1 à 2 fois par mois</strong></span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">À partir de 80 € à 120 € / mois</p>
                <p className="text-xs text-gray-500">(hors produits de traitement)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Un suivi simple et efficace pour garder une eau claire et équilibrée.</p>
            </div>
            
            {/* Card Premium */}
            <div
              onClick={() => navigateTo('contact')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('contact'); }}
              role="button"
              tabIndex={0}
              className="bg-cyan-600 text-white rounded-xl shadow-2xl border-4 border-cyan-400 p-8 flex flex-col transform lg:scale-105 relative z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/40 cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">Populaire</div>
              <h3 className="text-2xl font-bold text-white mb-2">🔹 Formule Premium</h3>
              <p className="text-cyan-100 mb-6 italic min-h-[3rem]">Parfaite pour les résidences secondaires ou piscines d’hôtels nécessitant un suivi renforcé.</p>
              <ul className="space-y-3 text-cyan-50 mb-8 flex-grow">
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Entretien complet</strong> du bassin et des abords</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Analyse approfondie</strong> et traitement complet de l’eau</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Vérification et réglage</strong> des équipements (pompe, filtre, chauffage, robot…)</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Détection préventive</strong> des anomalies</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Interventions <strong>hebdomadaires</strong></span></li>
              </ul>
              <div className="bg-cyan-700 border border-cyan-500 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-white">À partir de 200 € à 350 € / mois</p>
                <p className="text-xs text-cyan-200">(hors produits de traitement)</p>
              </div>
              <p className="text-sm text-center text-cyan-100">👉 Votre piscine toujours prête, sans souci, en toutes circonstances.</p>
            </div>

            {/* Card Sur-Mesure */}
            <div
              onClick={() => navigateTo('contact')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('contact'); }}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Sur-Mesure</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Une solution personnalisée selon vos attentes.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Choix libre</strong> de la fréquence des visites</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Services complémentaires</strong> : hivernage, remise en service, dépannage prioritaire</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Produits de traitement</strong> au choix (sel, chlore, brome, solutions écologiques)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Suivi privilégié</strong> avec interlocuteur dédié</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">Sur devis</p>
                <p className="text-xs text-gray-500">Généralement entre 400 € et 600 € / mois</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Un contrat à la carte, conçu pour votre tranquillité totale.</p>
            </div>
          </div>
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <p className="text-xl text-gray-700">
                ✨ Que vous soyez particulier, gestionnaire hôtelier ou propriétaire d’une résidence secondaire, nos équipes vous garantissent un service fiable, transparent et sans surprise.
            </p>
          </div>
        </div>
      </section>

      {/* NEW Table Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tableau Comparatif des Formules</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Visualisez rapidement les prestations incluses dans chaque formule pour faire le meilleur choix.
          </p>
          <div className="shadow-lg rounded-lg overflow-x-auto border">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-cyan-700">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Prestations incluses</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">
                    Standard<br/><span className="font-normal text-cyan-200">80 € – 120 €/mois</span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold bg-cyan-800">
                    Premium<br/><span className="font-normal text-cyan-200">200 € – 350 €/mois</span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">
                    Sur-Mesure<br/><span className="font-normal text-cyan-200">400 € – 600 €/mois*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Nettoyage du bassin & ligne d’eau</td>
                  <td className="px-6 py-4 text-center">✔ 1 à 2 fois / mois</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔ Hebdomadaire</td>
                  <td className="px-6 py-4 text-center">✔ Fréquence au choix</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Vérification du système de filtration</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Analyse & ajustement du pH / chlore / sel</td>
                  <td className="px-6 py-4 text-center">✔ Contrôle de base</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔ Analyse approfondie</td>
                  <td className="px-6 py-4 text-center">✔ Produits au choix (sel, brome, bio…)</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Entretien des abords & margelles</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Vérification & réglage des équipements</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔ Pompe, filtre, chauffage, robot</td>
                  <td className="px-6 py-4 text-center">✔ Suivi complet et personnalisé</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Détection préventive des anomalies</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Hivernage & remise en service</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">Option</td>
                  <td className="px-6 py-4 text-center">✔ Inclus (si souhaité)</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Dépannage prioritaire</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50 text-gray-400">–</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Interlocuteur dédié</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50 text-gray-400">–</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
              * Tarifs moyens indicatifs, ajustés selon la taille de la piscine, la fréquence des visites et les prestations choisies.
          </p>
          <div className="text-center mt-8">
            <p className="text-lg text-gray-800">
              👉 Besoin d’un devis personnalisé ? 
              <button onClick={() => navigateTo('contact')} className="text-cyan-600 font-semibold hover:underline ml-2">
                  Contactez-nous dès aujourd’hui
              </button> 
              pour une offre claire et adaptée à votre piscine.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">✨ Un service complet pour une piscine toujours parfaite</h2>
          <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">Nos techniciens qualifiés prennent soin de votre bassin avec rigueur et passion :</p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><TestTube size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Analyse et traitement de l’eau</h4>
                <p className="text-gray-600">Ajustement précis du pH, du chlore, de l’alcalinité et du stabilisant pour une eau saine et équilibrée.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><Sparkles size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Nettoyage intégral</h4>
                <p className="text-gray-600">Ligne d’eau, parois, paniers de skimmers, préfiltre de pompe, aspiration du fond et retrait des débris en surface.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><Wrench size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Maintenance des équipements</h4>
                <p className="text-gray-600">Lavage/rinçage du filtre, réglages et programmation du système de filtration et autres appareils.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><Search size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Diagnostic technique</h4>
                <p className="text-gray-600">Contrôle préventif pour éviter les pannes et prolonger la durée de vie de vos installations.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

       {/* Products Section */}
       <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Le matériel que nous utilisons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {maintenanceProducts.map((product) => (
              <div key={product.id} className="text-center group">
                <div className="bg-gray-100 rounded-lg p-4 mb-2 overflow-hidden aspect-square flex items-center justify-center">
                    <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <h4 className="font-semibold text-sm text-gray-700">{product.name}</h4>
              </div>
            ))}
          </div>
        </div>
       </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">💡 Pourquoi nous confier l’entretien de votre piscine ?</h2>
          <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">En nous choisissant, vous optez pour bien plus qu’un simple service :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><Clock size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Gagnez du temps et de l’énergie</h4>
              <p className="text-gray-600">Oubliez les contraintes, profitez de chaque instant dans l’eau.</p>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><Droplet size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Une eau toujours parfaite</h4>
              <p className="text-gray-600">Gage de confort, de sécurité et de santé pour tous les baigneurs.</p>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><ShieldAlert size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Prévention des pannes</h4>
              <p className="text-gray-600">Intervention proactive pour éviter les réparations coûteuses.</p>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><BadgeCheck size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Longévité garantie</h4>
              <p className="text-gray-600">Un entretien régulier prolonge la vie de votre bassin et de ses équipements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cyan-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">💦 Votre piscine mérite le meilleur — et vous aussi.</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">Contactez-nous dès aujourd’hui pour trouver la formule qui vous conviendra le mieux.</p>
            <button
                onClick={() => navigateTo('contact')}
                className="bg-white hover:bg-cyan-50 text-cyan-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Trouver ma formule <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;