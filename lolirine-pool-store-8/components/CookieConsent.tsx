
import React from 'react';
import { Page } from '../types';
import { Cookie } from 'lucide-react';

interface CookieConsentProps {
    onAccept: () => void;
    onDecline: () => void;
    navigateTo: (page: Page) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline, navigateTo }) => {
    return (
        <div 
            className="fixed bottom-0 inset-x-0 pb-4 sm:pb-5 z-[9999]"
            aria-modal="true"
            role="dialog"
            aria-labelledby="cookie-consent-title"
        >
            <div className="max-w-4xl mx-auto px-4">
                <div className="p-5 rounded-lg bg-white shadow-2xl border border-gray-200 animate-slide-in-up">
                    <style>{`
                        @keyframes slide-in-up {
                            from { transform: translateY(100%); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                        .animate-slide-in-up { animation: slide-in-up 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
                    `}</style>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                            <Cookie className="h-6 w-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                            <h2 id="cookie-consent-title" className="text-lg font-bold text-gray-800">Votre vie privée est notre priorité</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Nous utilisons des cookies pour améliorer votre expérience sur notre site. Ils nous aident à analyser notre trafic et à personnaliser le contenu. En cliquant sur "Accepter", vous consentez à notre utilisation des cookies. Apprenez-en plus en consultant notre{' '}
                                <button onClick={() => navigateTo('cookies')} className="font-medium text-cyan-600 hover:underline">politique sur les cookies</button>.
                            </p>
                        </div>
                        <div className="flex w-full sm:w-auto flex-shrink-0 flex-row gap-3 items-center ml-0 sm:ml-4">
                            <button
                                onClick={onAccept}
                                className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors shadow-sm"
                            >
                                Accepter
                            </button>
                            <button
                                onClick={onDecline}
                                className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                            >
                                Refuser
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
