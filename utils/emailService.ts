import { EmailTemplate, Notification, Order, CartItem, UserAccount, Address, Supplier } from '../types';
import { formatCurrency } from './formatting';

type PlaceholderData = Omit<Partial<Order> & Partial<UserAccount>, 'shippingAddress'> & {
    shippingAddress?: string | Address;
    supplierName?: string;
    [key: string]: any;
};

// This is a public key for a free email sending service (web3forms.com)
// In a real production app, this should be stored more securely if possible,
// but for client-side only apps, this is a common practice.
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace with your actual key from web3forms.com

export class EmailService {
    private templates: EmailTemplate[];
    private addNotification: (notification: Omit<Notification, 'id'>) => void;

    constructor(templates: EmailTemplate[], addNotification: (notification: Omit<Notification, 'id'>) => void) {
        this.templates = templates;
        this.addNotification = addNotification;
    }

    private replacePlaceholders(text: string, data: PlaceholderData): string {
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            switch (key) {
                case 'customerName':
                    return data.customer || 'Client';
                case 'orderId':
                    return data.id || '';
                case 'orderTotal':
                    return data.total ? formatCurrency(data.total) : '';
                case 'shippingAddress': // Legacy for old templates
                    return `${data.shippingAddress}, ${data.shippingZip} ${data.shippingCity}`;
                case 'customerShippingAddress':
                    return `${data.shippingAddress}<br>${data.shippingZip} ${data.shippingCity}`;
                case 'trackingNumber':
                    return data.trackingNumber || 'N/A';
                case 'resetLink':
                    return '#'; // Simulation link
                case 'cartItemsList':
                     return `<table style="width: 100%; border-collapse: collapse;">
                                ${ (data.items as CartItem[] || []).map(item => 
                                    `<tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 10px;">${item.quantity}x ${item.name}</td>
                                        <td style="padding: 10px; text-align: right;">${formatCurrency(item.price * item.quantity)}</td>
                                    </tr>`
                                ).join('')}
                             </table>`;
                case 'supplierName':
                    return data.supplierName || 'Fournisseur';
                case 'invoiceBody':
                    return data.invoiceBody || '<!-- Corps de la facture manquant -->';
                default:
                    return data[key] || match;
            }
        });
    }

    public sendCustomNotification(recipient: string, subject: string, body: string) {
        // This method is now repurposed to also use the direct sending logic.
        const bodyHtml = `<p>${body.replace(/\n/g, '<br>')}</p>`;
        this.sendEmailDirectly(recipient, subject, bodyHtml, "Notification Personnalisée");
    }

    private async sendEmailDirectly(recipient: string, subject: string, bodyHtml: string, from_name: string) {
        if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
             console.warn("Web3Forms Access Key is not set. Email sending is simulated.");
             this.addNotification({
                recipient,
                subject: `[SIMULATION] ${subject}`,
                body: bodyHtml
            });
            return;
        }

        const payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            email: recipient,
            subject: subject,
            from_name: from_name,
            html: bodyHtml,
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            
            if (result.success) {
                console.log("Email sent successfully via Web3Forms:", result);
                this.addNotification({
                    recipient,
                    subject: `Email envoyé: ${subject}`,
                    body: `<p>L'email a été envoyé avec succès à ${recipient}.</p><hr>${bodyHtml}`
                });
            } else {
                throw new Error(result.message || "Failed to send email via Web3Forms");
            }

        } catch (error) {
            console.error("Error sending email directly:", error);
            this.addNotification({
                recipient: 'System Admin',
                subject: `Email Send Failure`,
                body: `Could not send email '${subject}' to ${recipient}. Error: ${(error as Error).message}`
            });
        }
    }

    public send(templateId: string, data: PlaceholderData) {
        const template = this.templates.find(t => t.id === templateId);
        
        if (!template || !template.enabled) {
            console.warn(`Email template "${templateId}" is disabled or does not exist.`);
            return;
        }

        const recipient = data.email || data.customerEmail || '';
        if (!recipient) {
            console.error(`No recipient found for email template "${templateId}".`);
            return;
        }

        const subject = this.replacePlaceholders(template.subject, data);
        const bodyHtml = this.replacePlaceholders(template.body, data);
        
        // Use the new direct sending method
        this.sendEmailDirectly(recipient, subject, bodyHtml, "Lolirine Pool Store");
    }
}
