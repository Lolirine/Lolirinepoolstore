import React, { useState, useEffect } from 'react';
import { Page, WinterizationPageProps } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { ArrowRight, Calendar, Sun, Zap, TestTube, Sparkles, Wrench, Search, Clock, Droplet, ShieldAlert, BadgeCheck, Cog, ShieldCheck, CalendarDays, CheckCircle } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

const WinterizationPage: React.FC<WinterizationPageProps> = ({ navigateTo, goBack, canGoBack }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
      'https://storage.googleapis.com/lolirinepoolstoreimage/Hivernage%20pisicne%202.jpg',
      'https://storage.googleapis.com/lolirine_pool_store_photos/Couverture%20hivernage.jpeg',
      'https://storage.googleapis.com/lolirine_pool_store_photos/snow-covered-pool-cover-roller-standing-next-to-frozen-swimming-winter-backyard-surrounded-frost-trees-outdoor-365075471.jpg.webp',
      'https://storage.googleapis.com/lolirine_pool_store_photos/Hivernage%20pisicne%203.jpg'
  ];

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(timer);
  }, [heroImages.length]);

  const maintenanceProducts = INITIAL_PRODUCTS.filter(p => 
    ['hivernage-001', 'hivernage-002', 'hivernage-003', 'hivernage-004'].includes(String(p.id))
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
            ❄️ Préparez votre piscine pour l'hiver... en toute sérénité !
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Et si vous pouviez aborder l'hiver l'esprit tranquille, sans vous soucier de la protection de votre piscine ? Chez nous, nous transformons cette tâche complexe en une simple formalité.
          </p>
        </div>
      </section>

      {/* NEW SECTION: Custom Solutions */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            {canGoBack && <GoBackButton onClick={goBack} className="mb-8 inline-flex" />}
            <h2 className="text-3xl font-bold text-cyan-800 mb-4">
              Hivernage de piscine : des solutions sur mesure pour chaque besoin
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Qu’il s’agisse de votre piscine privée, de celle d’un hôtel ou d’une résidence secondaire, nous adaptons nos formules pour protéger efficacement votre installation durant la saison froide. Nos prestations incluent :
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Nettoyage complet pré-hivernage</h3>
                <p className="text-gray-600 mt-1">Aspiration du bassin, brossage des parois et de la ligne d’eau pour éviter les dépôts.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <Cog size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Mise en sécurité des équipements</h3>
                <p className="text-gray-600 mt-1">Vidange et purge de la pompe, du filtre, des skimmers et des canalisations pour éviter les dégâts du gel.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <TestTube size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Traitement de l'eau longue durée</h3>
                <p className="text-gray-600 mt-1">Analyse et application de produits d'hivernage spécifiques pour maintenir une eau saine jusqu'au printemps.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-cyan-200 text-cyan-700 rounded-xl p-4 mt-1">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Installation des protections</h3>
                <p className="text-gray-600 mt-1">Mise en place de flotteurs anti-gel, gizzmos pour skimmers, et installation de votre couverture d'hiver.</p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-lg text-gray-800 max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-200">
            Grâce à notre savoir-faire et à des produits de qualité, nous assurons une protection optimale de votre bassin pour une remise en service simple et rapide au printemps.
          </p>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nos Formules d'Hivernage</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Choisissez la formule qui vous convient pour une protection optimale et une remise en service facilitée.
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
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Hivernage Actif</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Pour maintenir une filtration légère durant l'hiver et faciliter la remise en route.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Nettoyage</strong> du bassin et ligne d’eau</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Traitement choc</strong> et produit d'hivernage</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Ajustement</strong> des cycles de filtration</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Mise en place des protections (gizzmos, flotteurs)</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">À partir de 150 € à 220 €</p>
                <p className="text-xs text-gray-500">(prestation unique, hors produits)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Une solution simple pour les hivers doux et les propriétaires vigilants.</p>
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
              <h3 className="text-2xl font-bold text-white mb-2">🔹 Formule Hivernage Passif</h3>
              <p className="text-cyan-100 mb-6 italic min-h-[3rem]">La solution la plus complète pour une tranquillité d'esprit totale durant les grands froids.</p>
              <ul className="space-y-3 text-cyan-50 mb-8 flex-grow">
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Prestations de l'hivernage actif</strong> incluses</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Abaissement</strong> du niveau de l'eau</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Vidange et purge complètes</strong> des canalisations et équipements</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Démontage partiel</strong> de la filtration si nécessaire</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Installation de la couverture d'hivernage</span></li>
              </ul>
              <div className="bg-cyan-700 border border-cyan-500 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-white">À partir de 250 € à 350 €</p>
                <p className="text-xs text-cyan-200">(prestation unique, hors produits)</p>
              </div>
              <p className="text-sm text-center text-cyan-100">👉 Votre piscine entièrement protégée, même contre le gel intense.</p>
            </div>

            {/* Card Sur-Mesure */}
            <div
              onClick={() => navigateTo('contact')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('contact'); }}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Hivernage + Entretien</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Combinez l'hivernage et des visites de contrôle durant l'hiver.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Hivernage complet</strong> (Actif ou Passif)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Visites de contrôle</strong> mensuelles ou bimensuelles</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Vérification</strong> du niveau d'eau et de la couverture</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Ajustement du traitement</strong> si nécessaire</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">Sur devis</p>
                <p className="text-xs text-gray-500">Généralement entre 400 € et 550 € pour la saison</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Une formule à la carte pour une tranquillité absolue tout l'hiver.</p>
            </div>
          </div>
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <p className="text-xl text-gray-700">
                ✨ Quelle que soit la formule choisie, nos équipes vous garantissent un service fiable, transparent et sans surprise pour protéger votre investissement.
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
                    Hivernage Actif<br/><span className="font-normal text-cyan-200">150 € – 220 €</span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold bg-cyan-800">
                    Hivernage Passif<br/><span className="font-normal text-cyan-200">250 € – 350 €</span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">
                    Hivernage + Entretien<br/><span className="font-normal text-cyan-200">400 € – 550 €*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Nettoyage complet du bassin</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Traitement & produit d'hivernage</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Ajustement du cycle de filtration</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Installation des protections (gizzmos, flotteurs)</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Abaissement du niveau d'eau</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Vidange et purge complète des équipements</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Installation de la couverture d'hivernage</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Visites de contrôle hivernales</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50 text-gray-400">–</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Remise en service incluse</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50 text-gray-400">–</td>
                  <td className="px-6 py-4 text-center">Option</td>
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
          <h2 className="text-3xl font-bold text-center mb-12">✨ Un service complet pour une protection optimale</h2>
          <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">Nos techniciens qualifiés prennent soin de votre bassin avec rigueur et passion :</p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><TestTube size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Analyse et traitement de l’eau</h4>
                <p className="text-gray-600">Application d'un produit d'hivernage longue durée pour éviter la prolifération d'algues et de calcaire.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><Sparkles size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Nettoyage intégral</h4>
                <p className="text-gray-600">Nettoyage méticuleux du fond, des parois, de la ligne d'eau et des paniers de skimmers avant la mise en sommeil.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><Wrench size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Sécurisation des équipements</h4>
                <p className="text-gray-600">Purge complète du circuit de filtration pour protéger vos canalisations et vos équipements du gel.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-3 mt-1"><Search size={24} /></div>
              <div>
                <h4 className="font-semibold text-lg">Diagnostic préventif</h4>
                <p className="text-gray-600">Contrôle de l'ensemble de l'installation pour détecter d'éventuelles anomalies avant l'hiver.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

       {/* Products Section */}
       <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Les produits que nous utilisons</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">💡 Pourquoi nous confier l’hivernage de votre piscine ?</h2>
          <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">En nous choisissant, vous optez pour bien plus qu’un simple service :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><Clock size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Gagnez du temps et de l’énergie</h4>
              <p className="text-gray-600">Évitez une tâche longue et technique, et soyez assuré d'un travail bien fait.</p>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><Droplet size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Une remise en route facilitée</h4>
              <p className="text-gray-600">Un bon hivernage signifie moins de nettoyage et de traitements au printemps.</p>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><ShieldAlert size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Prévention des pannes coûteuses</h4>
              <p className="text-gray-600">Protégez vos canalisations et équipements du gel et de l'usure prématurée.</p>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><BadgeCheck size={40} /></div>
              <h4 className="font-bold text-lg mb-1">La garantie d'un expert</h4>
              <p className="text-gray-600">Profitez de notre expertise pour un hivernage réalisé dans les règles de l'art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cyan-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🛡️ Votre piscine mérite le meilleur — et vous aussi.</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">Contactez-nous dès aujourd’hui pour planifier l'hivernage de votre piscine.</p>
            <button
                onClick={() => navigateTo('contact')}
                className="bg-white hover:bg-cyan-50 text-cyan-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Planifier mon hivernage <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>
    </div>
  );
};

export default WinterizationPage;
