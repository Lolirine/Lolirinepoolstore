import React from 'react';
import { ShippingPolicyPageProps, Page } from '../types';
import GoBackButton from '../components/GoBackButton';

const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = ({ goBack, canGoBack, navigateTo }) => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Politique de Livraison</h1>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <p>Chez Lolirine Pool Store, nous nous engageons à vous livrer vos produits dans les meilleures conditions et les meilleurs délais. Voici les détails de notre politique de livraison.</p>

                    <h2 className="text-xl font-bold mt-8">1. Zones de livraison</h2>
                    <p>Nous livrons actuellement dans les pays suivants :</p>
                    <ul className="list-disc list-inside">
                        <li>Belgique</li>
                        <li>France</li>
                        <li>Pays-Bas</li>
                        <li>Luxembourg</li>
                        <li>Allemagne</li>
                    </ul>
                    <p>Si vous résidez en dehors de ces zones, n'hésitez pas à nous contacter pour une solution sur mesure.</p>

                    <h2 className="text-xl font-bold mt-8">2. Modes et délais de livraison</h2>
                    <p>Toutes nos commandes sont expédiées via des transporteurs de confiance comme GLS ou France Express pour garantir une livraison rapide et sécurisée.</p>
                    <p>Les délais de livraison sont généralement de <strong>2 à 5 jours ouvrables</strong> après l'expédition de votre commande. Vous recevrez un email de confirmation d'expédition dès que votre colis quittera notre entrepôt.</p>

                    <h2 className="text-xl font-bold mt-8">3. Frais de livraison</h2>
                    <p>Les frais de livraison sont calculés comme suit :</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Belgique :</strong> 6,00 €</li>
                        <li><strong>France, Pays-Bas, Luxembourg, Allemagne :</strong> 11,00 €</li>
                    </ul>
                    <p className="font-bold">🎉 La livraison est OFFERTE pour toute commande d'un montant supérieur à 59,00 € !</p>

                    <h2 className="text-xl font-bold mt-8">4. Suivi de votre commande</h2>
                    <p>Dès l'expédition de votre commande, vous recevrez un email contenant un lien de suivi qui vous permettra de suivre l'acheminement de votre colis en temps réel.</p>

                    <h2 className="text-xl font-bold mt-8">5. Réception de la commande</h2>
                    <p>À la réception de votre colis, nous vous recommandons de vérifier l'état de l'emballage en présence du livreur. Si vous constatez une anomalie (colis endommagé, ouvert), veuillez le notifier sur le bon de livraison et nous contacter immédiatement.</p>
                    <p>Si un produit est manquant ou endommagé à l'intérieur du colis, veuillez prendre des photos et nous contacter dans les 48 heures suivant la réception.</p>
                    
                    <h2 className="text-xl font-bold mt-8">6. Retours</h2>
                    <p>Vous disposez d'un délai de 14 jours pour retourner un produit qui ne vous conviendrait pas. Pour plus d'informations sur les conditions de retour, veuillez consulter nos <button onClick={() => navigateTo('terms')} className="text-cyan-600 hover:underline">Conditions Générales de Vente</button>.</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicyPage;