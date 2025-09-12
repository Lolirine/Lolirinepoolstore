import React, { useState } from 'react';
import { AdminView, AdminPageProps, UserAccount, EmailManagementViewProps } from '../../types';
import AdminLayout from '../components/admin/AdminLayout';
import Sidebar from '../components/admin/Sidebar';
import DashboardView from '../components/admin/DashboardView';
import ProductManagementView from '../components/admin/ProductManagementView';
import InventoryManagementView from '../components/admin/InventoryManagementView';
import SupplierManagementView from '../components/admin/SupplierManagementView';
import DropshippingView from '../components/admin/DropshippingView';
import BillingView from '../components/admin/BillingView';
import PaymentMethodsView from '../components/admin/PaymentMethodsView';
import EmailManagementView from '../components/admin/EmailManagementView';
import ClientManagementView from '../components/admin/ClientManagementView';
import ClientDetailView from '../components/admin/ClientDetailView';
import PurchaseOrderView from '../components/admin/PurchaseOrderView';
import InfoBannerView from '../components/admin/InfoBannerView';
import PopupManagementView from '../components/admin/PopupManagementView';
import MenuManagementView from '../components/admin/MenuManagementView';
import OrderManagementView from '../components/admin/OrderManagementView';


const AdminPage: React.FC<AdminPageProps> = (props) => {
  const { 
      onLogout, products, onUpdateProduct, onCreateProduct, onDeleteProduct, onBulkUpdateProducts, orders, 
      suppliers, onCreateSupplier, onUpdateSupplier, onDeleteSupplier, onUpdateOrder,
      invoices, onCreateInvoice, onUpdateInvoice, onDeleteInvoice,
      paymentMethods, onUpdatePaymentMethod,
      emailTemplates, onUpdateEmailTemplate,
      users, onUpdateUser, cart,
      purchaseOrders, onUpdatePurchaseOrder,
      infoBanner, onUpdateInfoBanner,
      popups, onCreatePopup, onUpdatePopup, onDeletePopup,
      menuConfig, onUpdateMenuConfig,
      onAddCategory, onDeleteCategoryAndProducts, onRenameCategory, onDuplicateCategory,
      emailService
  } = props;
  const [view, setView] = useState<AdminView>('dashboard');
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  const handleSetView = (newView: AdminView) => {
    setSelectedUser(null); // Reset selected user when changing main view
    setView(newView);
  }

  const handleUpdateUserAndReturn = (updatedUser: UserAccount) => {
    onUpdateUser(updatedUser);
    setSelectedUser(null); // Go back to list view after update
  };


  const renderView = () => {
    switch(view) {
      case 'dashboard':
        return <DashboardView products={products} orders={orders} users={users} cart={cart} />;
      case 'products':
        return <ProductManagementView 
                    products={products} 
                    onUpdateProduct={onUpdateProduct} 
                    onCreateProduct={onCreateProduct} 
                    onDeleteProduct={onDeleteProduct}
                    onBulkUpdateProducts={onBulkUpdateProducts} 
                    suppliers={suppliers} 
                    onAddCategory={onAddCategory}
                    onDeleteCategoryAndProducts={onDeleteCategoryAndProducts}
                    onRenameCategory={onRenameCategory}
                    onDuplicateCategory={onDuplicateCategory}
                />;
      case 'orders':
        return <OrderManagementView 
                  orders={orders} 
                  suppliers={suppliers}
                  onUpdateOrder={onUpdateOrder}
                  emailService={emailService}
               />;
      case 'inventory':
        return <InventoryManagementView products={products} onUpdateProduct={onUpdateProduct} />;
      case 'suppliers':
        return <SupplierManagementView suppliers={suppliers} onCreate={onCreateSupplier} onUpdate={onUpdateSupplier} onDelete={onDeleteSupplier} />;
      case 'purchaseOrders':
        return <PurchaseOrderView purchaseOrders={purchaseOrders} onUpdatePurchaseOrder={onUpdatePurchaseOrder} suppliers={suppliers} />;
      case 'dropshipping':
        return <DropshippingView 
          orders={orders} 
          onUpdateOrder={onUpdateOrder} 
          suppliers={suppliers} 
          products={products}
          onBulkUpdateProducts={onBulkUpdateProducts}
        />;
      case 'clients':
        return selectedUser ? (
            <ClientDetailView 
                user={selectedUser}
                orders={orders.filter(o => o.customerEmail === selectedUser.email)}
                onUpdateUser={handleUpdateUserAndReturn}
                onBack={() => setSelectedUser(null)}
            />
        ) : (
            <ClientManagementView 
                users={users} 
                orders={orders} 
                onSelectUser={setSelectedUser} 
            />
        );
      case 'billing':
        return <BillingView invoices={invoices} onCreate={onCreateInvoice} onUpdate={onUpdateInvoice} onDelete={onDeleteInvoice} />;
      case 'paymentMethods':
        return <PaymentMethodsView paymentMethods={paymentMethods} onUpdatePaymentMethod={onUpdatePaymentMethod} />;
      case 'emails':
        return <EmailManagementView 
                    emailTemplates={emailTemplates} 
                    onUpdateEmailTemplate={onUpdateEmailTemplate} 
                    users={users}
                    emailService={emailService}
                />;
      case 'infoBanner':
        return <InfoBannerView infoBanner={infoBanner} onUpdateInfoBanner={onUpdateInfoBanner} />;
      case 'popups':
        return <PopupManagementView popups={popups} onCreate={onCreatePopup} onUpdate={onUpdatePopup} onDelete={onDeletePopup} />;
      case 'menuManagement':
        return <MenuManagementView menuConfig={menuConfig} onUpdateMenuConfig={onUpdateMenuConfig} />;
      default:
        return (
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Section en construction</h2>
            <p className="mt-2 text-gray-600">Cette page sera bientôt disponible.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout
      sidebar={
        <Sidebar 
          currentView={view} 
          setView={handleSetView} 
          onLogout={onLogout} 
        />
      }
    >
      {renderView()}
    </AdminLayout>
  );
};

export default AdminPage;