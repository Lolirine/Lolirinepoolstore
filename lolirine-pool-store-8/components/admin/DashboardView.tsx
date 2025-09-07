import React, { useMemo } from 'react';
import { Product, Order, UserAccount } from '../../types';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import { ShoppingCart, DollarSign, Users, TrendingUp, Package, Star, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  users: UserAccount[];
  cart: any; // cart prop is maintained for consistency but not used in this new view
}

const RecentOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  
  const getStatusClass = (status: Order['status']) => {
    switch(status) {
      case 'Complété': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><ShoppingCart className="mr-2"/> Commandes Récentes</h3>
      <div className="space-y-3">
        {recentOrders.map(order => (
          <div key={order.id} className="flex justify-between items-center text-sm">
            <div>
              <p className="font-semibold">{order.customer}</p>
              <p className="text-xs text-gray-500">{order.id}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-cyan-600">{formatCurrency(order.total)}</p>
                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusClass(order.status)}`}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopProducts: React.FC<{ orders: Order[] }> = ({ orders }) => {
    const productSales = useMemo(() => {
        const sales: { [key: string]: { name: string; quantity: number; imageUrl: string } } = {};
        orders.forEach(order => {
            if (order.status === 'Complété') {
                order.items.forEach(item => {
                    if (!sales[item.id]) {
                        sales[item.id] = { name: item.name, quantity: 0, imageUrl: item.imageUrl };
                    }
                    sales[item.id].quantity += item.quantity;
                });
            }
        });
        return Object.values(sales).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    }, [orders]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Star className="mr-2"/> Produits Populaires</h3>
            <div className="space-y-3">
                {productSales.map(product => (
                    <div key={product.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md"/>
                            <p className="font-semibold">{product.name}</p>
                        </div>
                        <p className="font-bold text-gray-800">{product.quantity} <span className="font-normal text-gray-500">vendus</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LowStockAlerts: React.FC<{ products: Product[] }> = ({ products }) => {
  const lowStockProducts = products.filter(p => p.stock !== undefined && p.stock <= 5 && !p.isDropshipping).sort((a,b) => a.stock! - b.stock!);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><AlertTriangle className="mr-2 text-red-500"/> Alertes de Stock Faible</h3>
      <div className="space-y-3">
        {lowStockProducts.length > 0 ? lowStockProducts.map(product => (
          <div key={product.id} className="flex items-center justify-between text-sm">
            <p className="font-semibold">{product.name}</p>
            <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-xs">{product.stock} restants</span>
          </div>
        )) : <p className="text-sm text-gray-500 text-center py-4">Aucun produit en stock faible.</p>}
      </div>
    </div>
  );
};


const DashboardView: React.FC<DashboardViewProps> = ({ products, orders, users }) => {
  const totalRevenue = useMemo(() => orders.reduce((sum, order) => order.status === 'Complété' ? sum + order.total : sum, 0), [orders]);
  const totalOrders = useMemo(() => orders.length, [orders]);
  const averageOrderValue = useMemo(() => totalOrders > 0 ? totalRevenue / totalOrders : 0, [totalRevenue, totalOrders]);
  
  const newCustomersThisMonth = useMemo(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return users.filter(user => new Date(user.createdAt) >= firstDayOfMonth).length;
  }, [users]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
            <StatCard title="Revenu Total" value={formatCurrency(totalRevenue)} icon={<DollarSign />} />
        </div>
        <div className="lg:col-span-1">
            <StatCard title="Commandes" value={totalOrders} icon={<ShoppingCart />} />
        </div>
        <div className="lg:col-span-1">
            <StatCard title="Nouveaux Clients (Mois)" value={newCustomersThisMonth} icon={<Users />} />
        </div>
        <div className="lg:col-span-1">
            <StatCard title="Panier Moyen" value={formatCurrency(averageOrderValue)} icon={<TrendingUp />} />
        </div>

        <div className="lg:col-span-4">
            <SalesChart orders={orders} />
        </div>

        <div className="lg:col-span-2">
            <RecentOrders orders={orders} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
            <TopProducts orders={orders} />
            <LowStockAlerts products={products} />
        </div>
    </div>
  );
};

export default DashboardView;