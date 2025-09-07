import React from 'react';
import { TermsPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const TermsPage: React.FC<TermsPageProps> = ({ goBack, canGoBack }) => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Conditions Générales de Vente</h1>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <h2 className="text-xl font-bold mt-8">ARTICLE 1 - Préambule</h2>
                    <p>Les présentes conditions générales de vente ont pour objet de définir les modalités de vente à distance entre l'entreprise Lolirine Pool Store, dont le siège social est situé à Rue Bois D'Esneux 110, 5021 Boninne (Namur), Belgique, immatriculée sous le numéro de TVA BE 0650891 279, et toute personne physique non commerçante effectuant un achat sur le site internet de l'entreprise (ci-après le "Client").</p>
                    <p>Le présent site permet à Lolirine Pool Store de proposer à la vente du matériel et des accessoires pour piscine (ci-après les "Produits") à des internautes naviguant sur le Site (l'"Utilisateur"). L'Utilisateur ayant validé une commande sera dénommé "Client".</p>
                    <p>Toute commande d'un Produit proposé sur le Site suppose la consultation préalable et l'acceptation expresse et sans réserve des présentes conditions générales de vente, manifestée par le fait de cocher la case "Je déclare avoir pris connaissance et accepter les conditions générales de vente".</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 2 - Commandes</h2>
                    <p>La navigation sur le site est libre et n'engage en rien l'Utilisateur.</p>
                    <p>Toute commande implique l'acceptation des prix et des descriptions des Produits disponibles à la vente. Lolirine Pool Store s'engage à honorer les commandes reçues dans la limite des stocks disponibles.</p>
                    <p>La validation de la commande par le Client vaut acceptation sans réserve des présentes Conditions Générales de Vente.</p>
                    <p>Le processus de commande suit les étapes suivantes :</p>
                    <ol className="list-decimal list-inside">
                        <li>Prendre connaissance des caractéristiques du Produit et le sélectionner.</li>
                        <li>Ajouter le(s) Produit(s) dans le panier.</li>
                        <li>Accéder au panier pour vérifier ou modifier la sélection.</li>
                        <li>Accepter les Conditions Générales de Vente avant de passer commande.</li>
                        <li>Choisir une option de paiement et valider la commande.</li>
                        <li>Recevoir un email de confirmation de commande.</li>
                    </ol>
                    <p>Toute commande est considérée comme définitive après confirmation par email et réception du paiement complet.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 3 - Produits</h2>
                    <p>Les Produits vendus par Lolirine Pool Store sont ceux figurant sur le site, dans la limite des stocks disponibles. Chaque Produit dispose d'une fiche descriptive précise comprenant une photographie, un libellé, les caractéristiques principales, le prix et les modalités d'utilisation.</p>
                    <p>En cas d'indisponibilité d'un Produit, l'Utilisateur en sera informé avant la validation de sa commande.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 4 - Prix</h2>
                    <p>Les prix des Produits sont indiqués en euros (€) toutes taxes comprises (TTC), hors frais de livraison. Lolirine Pool Store se réserve le droit de modifier ses prix à tout moment, mais les prix applicables sont ceux en vigueur au moment de la validation de la commande.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 5 - Modalités de paiement</h2>
                    <p>Le paiement des commandes s'effectue exclusivement en euros (€) via les moyens suivants :</p>
                    <ul className="list-disc list-inside">
                        <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                        <li>Bancontact</li>
                        <li>Apple Pay, Google Pay</li>
                        <li>Virement bancaire</li>
                        <li>PayPal</li>
                    </ul>
                    <p>Toutes les transactions sont sécurisées via une plateforme de paiement sécurisée. Lolirine Pool Store n'a pas accès aux informations bancaires des Clients.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 6 - Livraison</h2>
                    <p>Lolirine Pool Store livre en Belgique, en France, aux Pays-Bas, au Luxembourg et en Allemagne. Les frais de livraison sont de :</p>
                    <ul className="list-disc list-inside">
                        <li>6€ pour la Belgique</li>
                        <li>11€ pour les autres pays desservis</li>
                    </ul>
                    <p>La livraison est gratuite pour toute commande supérieure à 59€. Les délais de livraison sont de 2 à 5 jours ouvrables en fonction de la destination et des contraintes logistiques.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 7 - Droit de rétractation</h2>
                    <p>Le Client dispose de 14 jours pour exercer son droit de rétractation et retourner les Produits non utilisés et en parfait état. Les frais de retour sont à la charge du Client.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 8 - Garanties légales</h2>
                    <p>Lolirine Pool Store applique la garantie légale de conformité et la garantie contre les vices cachés. En cas de produit défectueux, le Client peut demander un remboursement ou un remplacement dans un délai de 2 ans après la réception.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 9 - Résolution des litiges</h2>
                    <p>Les présentes Conditions Générales de Vente sont soumises au droit belge. En cas de litige, les parties s'efforceront de trouver une solution amiable avant de saisir les tribunaux belges compétents.</p>
                    <p>Le Client peut également recourir à la plateforme de résolution des litiges en ligne de la Commission Européenne : <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">https://ec.europa.eu/consumers/odr/</a>.</p>
                    
                    <h2 className="text-xl font-bold mt-8">ARTICLE 10 - Modification des conditions générales de vente</h2>
                    <p>Lolirine Pool Store se réserve le droit de modifier les présentes conditions à tout moment. Les conditions applicables sont celles en vigueur au moment de la commande.</p>

                    <h2 className="text-xl font-bold mt-8">ARTICLE 11 - Accord contractuel</h2>
                    <p>Les présentes Conditions Générales de Vente constituent l'accord contractuel entre Lolirine Pool Store et le Client. En cas de contradiction, les Conditions Générales de Vente prévaudront.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;