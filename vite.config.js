// vite.config.js
// Configuration de Vite pour le projet React DevHelper
 
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  plugins: [react()],
  // Base URL pour le déploiement sur GitHub Pages
  // Remplace 'devhelper' par le nom exact de ton repo GitHub si tu utilises GitHub Pages
  // base: '/devhelper/',
});
 
