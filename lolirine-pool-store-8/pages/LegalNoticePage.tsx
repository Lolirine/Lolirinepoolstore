import React from 'react';
import { LegalNoticePageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const LegalNoticePage: React.FC<LegalNoticePageProps> = ({ goBack, canGoBack }) => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Mentions Légales</h1>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <h2 className="text-xl font-bold mt-8">Informations Éditeur</h2>
                    <p>
                        <strong>Nom de l’entreprise :</strong> Lolirine Pool Store<br/>
                        <strong>Responsable de publication :</strong> La direction<br/>
                        <strong>Siège social :</strong> Rue Bois D'Esneux 110, 5021 Boninne (Namur), Belgique<br/>
                        <strong>Numéro d'entreprise (TVA) :</strong> BE 0650891 279<br/>
                        <strong>Email de contact :</strong> <a href="mailto:info@lolirinepoolstore.be" className="text-cyan-600 hover:underline">info@lolirinepoolstore.be</a><br/>
                        <strong>Téléphone :</strong> <a href="tel:+32497444146" className="text-cyan-600 hover:underline">+32 497 44 41 46</a>
                    </p>

                    <h2 className="text-xl font-bold mt-8">Hébergement du site</h2>
                     <p>
                        <strong>Hébergeur :</strong> Google Cloud Platform<br/>
                        <strong>Adresse :</strong> Gordon House, Barrow Street, Dublin 4, Irlande
                    </p>

                    <h2 className="text-xl font-bold mt-8">Propriété intellectuelle</h2>
                    <p>
                        L'ensemble de ce site relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalNoticePage;