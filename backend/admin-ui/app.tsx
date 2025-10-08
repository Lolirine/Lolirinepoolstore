import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

// Exemple: on câble quelques vues de ton dossier admin
import DashboardView from "@admin/DashboardView";              // si présent
import InventoryManagementView from "@admin/InventoryManagementView";
import ProductManagementView from "@admin/ProductManagementView";
import OrdersView from "@admin/OrderManagementView";

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={{ width: 220, padding: 16, borderRight: "1px solid #eee" }}>
        <h3>Admin</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/">Tableau de bord</Link></li>
          <li><Link to="/inventory">Inventaire</Link></li>
          <li><Link to="/products">Produits</Link></li>
          <li><Link to="/orders">Commandes</Link></li>
        </ul>
      </nav>

      <main style={{ flex: 1, padding: 24 }}>
        <Routes>
          <Route index element={<Maybe component={DashboardView} fallback={<h2>Dashboard</h2>} />} />
          <Route path="inventory" element={<InventoryManagementView />} />
          <Route path="products" element={<ProductManagementView />} />
          <Route path="orders" element={<OrdersView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Certain(e)s .tsx peuvent ne pas exister; ce wrapper évite une erreur au build
function Maybe({ component: C, fallback }: { component?: React.ComponentType; fallback: React.ReactNode }) {
  return C ? <C /> : <>{fallback}</>;
}

