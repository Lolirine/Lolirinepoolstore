import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base '/admin/' pour que les assets se résolvent bien quand on sert sous /admin
export default defineConfig({
  plugins: [react()],
  base: "/admin/",
  server: {
    host: "127.0.0.1",
    port: 5180
  },
  resolve: {
    alias: {
      "@admin": "/src/admin"
    }
  }
});

