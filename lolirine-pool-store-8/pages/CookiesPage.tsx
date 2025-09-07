import React from 'react';
import { CookiesPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const CookiesPage: React.FC<CookiesPageProps> = ({ goBack, canGoBack }) => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                 {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Politique de Gestion des Cookies</h1>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <p>Notre site utilise des cookies pour améliorer votre expérience de navigation.</p>
                    
                    <h2 className="text-xl font-bold mt-8">1. Types de Cookies Utilisés</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Cookies essentiels :</strong> Nécessaires au bon fonctionnement du site (par exemple, pour le panier d'achat et la connexion à votre compte).</li>
                        <li><strong>Cookies analytiques :</strong> Aident à comprendre l’utilisation du site afin d'améliorer nos services (via des outils comme Google Analytics).</li>
                        <li><strong>Cookies marketing :</strong> Utilisés pour vous proposer des publicités ciblées et des offres pertinentes.</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8">2. Gestion des Cookies</h2>
                    <p>Vous pouvez gérer vos préférences en matière de cookies à tout moment via notre bannière de consentement lors de votre première visite. Vous pouvez également modifier les paramètres de votre navigateur pour refuser les cookies. Veuillez noter que le blocage de certains cookies peut affecter la fonctionnalité de notre site.</p>
                </div>
            </div>
        </div>
    );
};

export default CookiesPage;