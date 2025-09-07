import React, { useState } from 'react';
import { Order, Supplier, CartItem } from '../../types';
import { X, User, MapPin, Package, DollarSign, Truck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { EmailService } from '../../utils/emailService';
import SupplierInvoiceModal from './SupplierInvoiceModal';

interface OrderDetailModalProps {
    order: Order;
    suppliers: Supplier[];
    onClose: () => void;
    onUpdateOrder: (order: Order) => void;
    emailService: EmailService;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, suppliers, onClose, onUpdateOrder, emailService }) => {
    const [generatingInvoiceFor, setGeneratingInvoiceFor] = useState<{ supplier: Supplier, items: CartItem[] } | null>(null);

    const dropshippingItemsBySupplier = order.items
        .filter(item => item.isDropshipping && item.supplierId)
        .reduce((acc, item) => {
            const supplierId = item.supplierId!;
            if (!acc[supplierId]) {
                acc[supplierId] = [];
            }
            acc[supplierId].push(item);
            return acc;
        }, {} as Record<string, CartItem[]>);

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Détails de la commande {order.id}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><User size={16} className="mr-2"/> Client</h3>
                                <p className="font-bold">{order.customer}</p>
                                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                            </div>
                            {/* Shipping Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><MapPin size={16} className="mr-2"/> Adresse de livraison</h3>
                                <p className="font-bold">{order.shippingAddress}</p>
                                <p className="text-sm text-gray-600">{order.shippingZip} {order.shippingCity}</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><Package size={16} className="mr-2"/> Articles</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 text-left">Produit</th>
                                            <th className="p-2 text-center">Qté</th>
                                            <th className="p-2 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map(item => (
                                            <tr key={item.id} className="border-b">
                                                <td className="p-2 flex items-center gap-2">
                                                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded"/>
                                                    <span>{item.name}</span>
                                                </td>
                                                <td className="p-2 text-center">{item.quantity}</td>
                                                <td className="p-2 text-right font-medium text-cyan-600">{formatCurrency(item.price * item.quantity * (1 + item.tvaRate))}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Totals */}
                         <div className="flex justify-end">
                            <div className="w-full max-w-xs space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sous-total</span>
                                    <span className="font-semibold text-cyan-600">{formatCurrency(order.total / 1.21)}</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-gray-600">TVA (21%)</span>
                                    <span className="font-semibold text-cyan-600">{formatCurrency(order.total - (order.total / 1.21))}</span>
                                </div>
                                 <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total</span>
                                    <span className="text-cyan-600">{formatCurrency(order.total)}</span>
                                </div>
                            </div>
                         </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                            Fermer
                        </button>
                        {order.isDropshippingOrder && Object.keys(dropshippingItemsBySupplier).length > 0 && order.supplierStatus === 'En attente' && (
                            <div className="flex items-center gap-2">
                                {Object.entries(dropshippingItemsBySupplier).map(([supplierId, items]) => {
                                    const supplier = suppliers.find(s => s.id === supplierId);
                                    if (!supplier) return null;
                                    return (
                                        <button 
                                            key={supplierId}
                                            onClick={() => setGeneratingInvoiceFor({ supplier, items })}
                                            className="px-3 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md shadow-sm hover:bg-cyan-700 flex items-center gap-2"
                                        >
                                           <Truck size={16}/> Générer la commande pour {supplier.name}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {generatingInvoiceFor && (
                <SupplierInvoiceModal
                    order={order}
                    supplier={generatingInvoiceFor.supplier}
                    items={generatingInvoiceFor.items}
                    onClose={() => setGeneratingInvoiceFor(null)}
                    onUpdateOrder={(updatedOrder) => {
                        onUpdateOrder(updatedOrder);
                        // Potentially close the main modal as well or update its state
                        // For now, let's assume we keep it open to see status change
                    }}
                    emailService={emailService}
                />
            )}
        </>
    );
};

export default OrderDetailModal;