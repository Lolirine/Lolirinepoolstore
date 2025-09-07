import React, { useState } from 'react';
import { Cookie, X } from 'lucide-react';
import CookiesPage from '../pages/CookiesPage';

interface CookieConsentProps {
    onAccept: () => void;
    onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
    const [isPolicyVisible, setIsPolicyVisible] = useState(false);

    if (isPolicyVisible) {
        return (
            <div className="fixed inset-0 bg-white z-[9999] flex flex-col animate-fade-in">
                 <style>{`
                  @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                  }
                `}</style>
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800">Politique sur les cookies</h2>
                    <button onClick={() => setIsPolicyVisible(false)} className="text-gray-500 hover:text-gray-800">
                        <X size={24}/>
                        <span className="sr-only">Fermer la politique</span>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <CookiesPage goBack={() => setIsPolicyVisible(false)} canGoBack={true} />
                </div>
                <div className="p-4 border-t bg-gray-50 flex-shrink-0 flex justify-end items-center gap-4">
                    <p className="text-sm text-gray-600 mr-auto">Avez-vous fait votre choix ?</p>
                     <button
                        onClick={onDecline}
                        className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                    >
                        Tout refuser
                    </button>
                    <button
                        onClick={onAccept}
                        className="px-6 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
                    >
                        Tout accepter
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-end justify-center p-4 sm:items-center" aria-modal="true" role="dialog" aria-labelledby="cookie-consent-title">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg m-auto relative transform transition-all scale-95 opacity-0 animate-enter">
                 <style>{`
                  @keyframes enter {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  .animate-enter {
                    animation: enter 0.2s ease-out forwards;
                  }
                `}</style>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                         <Cookie className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                        <h2 id="cookie-consent-title" className="text-xl font-bold text-gray-800">Votre vie privée est notre priorité</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Nous utilisons des cookies pour améliorer votre expérience sur notre site. Ils nous aident à analyser notre trafic et à personnaliser le contenu. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies. Vous pouvez en savoir plus en consultant notre{' '}
                            <button onClick={() => setIsPolicyVisible(true)} className="font-medium text-cyan-600 hover:underline">politique sur les cookies</button>.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row-reverse sm:items-center gap-3">
                    <button
                        onClick={onAccept}
                        className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
                    >
                        Tout accepter
                    </button>
                    <button
                        onClick={onDecline}
                        className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                    >
                        Tout refuser
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;