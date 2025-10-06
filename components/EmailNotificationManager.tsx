import React, { useState, useEffect } from 'react';
import { Notification } from '../types';
import { Mail, X, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface EmailNotificationManagerProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
}

const EmailNotificationManager: React.FC<EmailNotificationManagerProps> = ({ notifications, onDismiss }) => {
    const [showPreview, setShowPreview] = useState(false);

    // We only show one modal at a time, for the first notification in the queue.
    const activeNotification = notifications.length > 0 ? notifications[0] : null;

    // Reset preview state when notification changes
    useEffect(() => {
        setShowPreview(false);
    }, [activeNotification?.id]);


    if (!activeNotification) {
        return null;
    }

    const handleClose = () => {
        onDismiss(activeNotification.id);
    };

    const isSimulation = activeNotification.subject.startsWith('[SIMULATION]');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center p-4" aria-modal="true" role="dialog">
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <h2 className="text-xl font-bold text-gray-800">
                           {isSimulation ? "Email Simulé" : "Email Envoyé"}
                        </h2>
                    </div>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className={`${isSimulation ? 'bg-yellow-50 border-yellow-400 text-yellow-800' : 'bg-green-50 border-green-400 text-green-800'} border-l-4 p-4 rounded-r-md mb-6`}>
                        <p className="font-semibold">{isSimulation ? "Simulation d'envoi" : "Envoi réussi !"}</p>
                        <p className="text-sm mt-1">
                           {isSimulation 
                                ? "L'envoi d'email est simulé car aucune clé d'accès n'est configurée. L'email n'a pas été réellement envoyé." 
                                : "L'email a été envoyé avec succès en arrière-plan."
                           }
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-gray-50 text-sm">
                            <div className="flex justify-between items-center">
                                <p><strong className="font-medium text-gray-600">Destinataire :</strong> {activeNotification.recipient}</p>
                            </div>
                            <p className="mt-1"><strong className="font-medium text-gray-600">Sujet :</strong> {activeNotification.subject}</p>
                        </div>

                        <button 
                            onClick={() => setShowPreview(!showPreview)} 
                            className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline text-sm"
                        >
                            {showPreview ? <><EyeOff size={16}/> Cacher l'aperçu</> : <><Eye size={16}/> Voir l'aperçu de l'email</>}
                        </button>

                        {showPreview && (
                            <div className="border rounded-md p-4 bg-white max-h-[40vh] overflow-y-auto">
                                <div className="prose max-w-none prose-sm" dangerouslySetInnerHTML={{ __html: activeNotification.body }} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 text-right rounded-b-lg">
                     <button onClick={handleClose} className="px-6 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailNotificationManager;