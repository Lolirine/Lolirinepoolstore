import React, { Suspense, useMemo } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

// charge toutes les vues présentes dans src/admin/**/*.{tsx,jsx}
const modules = import.meta.glob("../admin/**/*.{tsx,jsx}");

type RouteDef = {
  path: string;
  name: string;
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  isIndex?: boolean;
};

function toKebab(s: string) {
  return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
}
function toTitle(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, m => m.toUpperCase());
}
function deriveRoute(path: string): RouteDef | null {
  const rel = path.replace(/^\.\.\/admin\//, "");
  const noExt = rel.replace(/\.(t|j)sx?$/, "");
  const segments = noExt.split("/");
  const file = segments.pop()!;
  const dir = segments.join("/");
  const baseName = file.replace(/View$/, "");
  const isDashboard = /^dashboard$/i.test(baseName);
  const last = isDashboard ? "" : toKebab(baseName);
  const full = [dir, last].filter(Boolean).join("/");
  const routePath = full || "";
  const routeName = isDashboard ? "Dashboard" : toTitle(last || dir || "Home");
  const Component = React.lazy(modules[path] as any);
  return { path: routePath, name: routeName, Component, isIndex: isDashboard || routePath === "" };
}
function useAutoRoutes(): RouteDef[] {
  const list: RouteDef[] = [];
  for (const key of Object.keys(modules)) {
    const r = deriveRoute(key);
    if (r) list.push(r);
  }
  const seen = new Set<string>();
  return list
    .filter(r => {
      const k = r.isIndex ? "__index__" : r.path;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => (a.isIndex === b.isIndex ? a.name.localeCompare(b.name) : a.isIndex ? -1 : 1));
}

function Sidebar({ routes }: { routes: RouteDef[] }) {
  const loc = useLocation();
  const active = (p: string, isIndex?: boolean) => (isIndex ? loc.pathname === "/" : loc.pathname.startsWith("/" + p));
  return (
    <nav style={{ width: 240, padding: 16, borderRight: "1px solid #eee" }}>
      <h3 style={{ marginTop: 0 }}>Admin</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {routes.map(r => (
          <li key={r.isIndex ? "__index__" : r.path} style={{ margin: "6px 0" }}>
            <Link
              to={r.isIndex ? "/" : `/${r.path}`}
              style={{
                textDecoration: "none",
                color: active(r.path, r.isIndex) ? "#0d6efd" : "#222",
                fontWeight: active(r.path, r.isIndex) ? 600 : 400
              }}
            >
              {r.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function App() {
  const autoRoutes = useAutoRoutes();
  const hasIndex = autoRoutes.some(r => r.isIndex);
  const routes = hasIndex
    ? autoRoutes
    : [{ path: "", name: "Dashboard", Component: React.lazy(async () => ({ default: () => <h2>Dashboard</h2> })), isIndex: true }, ...autoRoutes];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Sidebar routes={routes} />
      <main style={{ flex: 1, padding: 24 }}>
        <Suspense fallback={<div>Chargement…</div>}>
          <Routes>
            {routes.map(r => (r.isIndex ? <Route key="__index__" index element={<r.Component />} /> : <Route key={r.path} path={r.path} element={<r.Component />} />))}
            <Route path="*" element={<Navigate to={routes[0].isIndex ? "/" : "/" + routes[0].path} replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

