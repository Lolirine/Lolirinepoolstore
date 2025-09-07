import React from 'react';
import { PrivacyPolicyPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ goBack, canGoBack }) => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Politique de Confidentialité</h1>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <h2 className="text-xl font-bold mt-8">1. Collecte des Données Personnelles</h2>
                    <p>Nous collectons certaines informations personnelles lorsque vous naviguez sur notre site ou effectuez un achat, notamment :</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Informations d’identification :</strong> Nom, prénom, adresse email, numéro de téléphone.</li>
                        <li><strong>Informations de paiement :</strong> Coordonnées bancaires (via des prestataires sécurisés).</li>
                        <li><strong>Informations de navigation :</strong> Adresse IP, type d’appareil, préférences de navigation.</li>
                        <li><strong>Informations liées aux commandes :</strong> Produits achetés, historique d’achats, adresse de livraison.</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8">2. Finalités de la Collecte des Données</h2>
                    <p>Vos données sont utilisées pour :</p>
                    <ul className="list-disc list-inside">
                        <li>Traiter et expédier vos commandes.</li>
                        <li>Gérer votre compte et vous offrir un service client personnalisé.</li>
                        <li>Vous envoyer des offres promotionnelles et newsletters (avec votre consentement).</li>
                        <li>Améliorer notre site et votre expérience utilisateur.</li>
                        <li>Sécuriser les paiements et prévenir la fraude.</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8">3. Partage des Données</h2>
                    <p>Vos données peuvent être partagées avec des tiers uniquement dans les cas suivants :</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Prestataires de services :</strong> Transporteurs, fournisseurs de paiement, prestataires marketing.</li>
                        <li><strong>Autorités légales :</strong> Si requis par la loi.</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8">4. Droits des Utilisateurs</h2>
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Accès et rectification :</strong> Modifier vos informations personnelles.</li>
                        <li><strong>Suppression :</strong> Demander l’effacement de vos données.</li>
                        <li><strong>Opposition :</strong> Refuser l’utilisation de vos données à des fins commerciales.</li>
                        <li><strong>Portabilité :</strong> Recevoir vos données dans un format structuré.</li>
                        <li><strong>Réclamation :</strong> Contacter la CNIL ou une autorité compétente.</li>
                    </ul>
                    <p>Pour exercer vos droits, contactez-nous à <a href="mailto:info@lolirine-pool.odoo.com" className="text-cyan-600 hover:underline">info@lolirine-pool.odoo.com</a>.</p>
                
                    <h2 className="text-xl font-bold mt-8">5. Politique de Sécurité des Paiements</h2>
                    <p>Nous utilisons des protocoles de sécurité avancés (SSL, 3D Secure) pour protéger vos paiements en ligne. Toutes les transactions sont traitées via des prestataires certifiés garantissant une protection optimale de vos données bancaires.</p>

                    <h2 className="text-xl font-bold mt-8">6. Politique d’Utilisation des Données Marketing</h2>
                    <p>Nous utilisons vos informations pour vous envoyer des offres personnalisées et des conseils d’entretien pour votre piscine.</p>
                    <ul className="list-disc list-inside">
                        <li>Vous pouvez vous désinscrire à tout moment via le lien présent dans nos emails.</li>
                        <li>Nous ne partageons pas vos données avec des tiers à des fins publicitaires sans votre consentement.</li>
                    </ul>
                    <p>Pour toute question, contactez-nous à <a href="mailto:info@lolirine-pool.odoo.com" className="text-cyan-600 hover:underline">info@lolirine-pool.odoo.com</a> ou au <a href="tel:+32497444146" className="text-cyan-600 hover:underline">+32 497 44 41 46</a>.</p>

                    <div className="mt-10 p-6 bg-gray-50 rounded-lg border">
                        <h3 className="text-xl font-bold">Protection des Données Personnelles et Vente en Ligne</h3>
                        <p className="mt-4">Dans le cadre de nos activités de vente en ligne, nous nous engageons à respecter la réglementation générale sur la protection des données (RGPD). Cette législation européenne vise à protéger la vie privée des citoyens et à garantir la sécurité de leurs données personnelles.</p>
                        <p>Nous collectons et traitons vos données uniquement dans le but de vous offrir une expérience d'achat optimale. Cela inclut la gestion de vos commandes, le traitement des paiements, et l'amélioration de nos services. Nous veillons à ce que vos informations soient traitées de manière transparente, sécurisée et conformément à vos droits.</p>
                        <p>Pour en savoir plus sur la manière dont nous protégeons vos données personnelles et sur vos droits en tant qu'utilisateur, nous vous invitions à consulter notre Politique de Confidentialité et à lire la <a href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">RGPD sur la vente en ligne</a>.</p>
                        <p>Votre confiance est notre priorité, et nous nous engageons à protéger vos informations personnelles à chaque étape de votre expérience d'achat.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;