import React, { useState, useMemo } from 'react';
import { EmailTemplate } from '../../types';
import { Mail, Edit, Eye, EyeOff } from 'lucide-react';
import EmailEditorModal from './EmailEditorModal';

interface EmailManagementViewProps {
  emailTemplates: EmailTemplate[];
  onUpdateEmailTemplate: (template: EmailTemplate) => void;
}

const EmailManagementView: React.FC<EmailManagementViewProps> = ({ emailTemplates, onUpdateEmailTemplate }) => {
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const handleToggleEnabled = (template: EmailTemplate) => {
    onUpdateEmailTemplate({ ...template, enabled: !template.enabled });
  };
  
  const handleSave = (updatedTemplate: EmailTemplate) => {
    onUpdateEmailTemplate(updatedTemplate);
    setEditingTemplate(null);
  }

  const groupedTemplates = useMemo(() => {
    return emailTemplates.reduce((acc, template) => {
      (acc[template.type] = acc[template.type] || []).push(template);
      return acc;
    }, {} as Record<EmailTemplate['type'], EmailTemplate[]>);
  }, [emailTemplates]);

  const groupTitles = {
    transactional: 'Emails Transactionnels',
    marketing: 'Emails Marketing & Promotion',
    lifecycle: 'Emails de Cycle de Vie Client'
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Mail size={24} className="mr-3" />
          Gestion des Modèles d'Emails
        </h2>
        <p className="mt-2 text-gray-600">Activez, désactivez ou modifiez le contenu des emails automatiques envoyés aux clients.</p>
      </div>
      
      {(Object.keys(groupedTemplates) as (keyof typeof groupedTemplates)[]).map(groupKey => (
        <div key={groupKey} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{groupTitles[groupKey]}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th scope="col" className="px-4 py-3">Nom du modèle</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                    <th scope="col" className="px-4 py-3 text-center">Statut</th>
                    <th scope="col" className="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedTemplates[groupKey].map(template => (
                    <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium text-gray-900">{template.name}</td>
                        <td className="px-4 py-4 text-xs max-w-xs">{template.description}</td>
                        <td className="px-4 py-4 text-center">
                        <button onClick={() => handleToggleEnabled(template)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${template.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {template.enabled ? <><Eye size={14} className="mr-1.5"/> Activé</> : <><EyeOff size={14} className="mr-1.5"/> Désactivé</>}
                        </button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => setEditingTemplate(template)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Modifier le modèle">
                              <Edit size={18} />
                          </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      ))}

      {editingTemplate && (
          <EmailEditorModal 
              template={editingTemplate}
              onSave={handleSave}
              onClose={() => setEditingTemplate(null)}
          />
      )}
    </div>
  );
};

export default EmailManagementView;
