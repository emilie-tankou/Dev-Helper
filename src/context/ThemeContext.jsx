// src/context/ThemeContext.jsx
// Contexte React pour gérer le thème clair/sombre globalement
 
import { createContext, useContext, useState, useEffect } from 'react';
 
// Création du contexte
const ThemeContext = createContext();
 
/**
 * Fournisseur du thème — à entourer autour de l'application
 * Persiste le choix de l'utilisateur dans localStorage
 */
export function ThemeProvider({ children }) {
  // Lire le thème sauvegardé ou utiliser "dark" par défaut
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dh-theme') || 'dark';
  });
 
  // Appliquer l'attribut data-theme sur le HTML lors du changement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dh-theme', theme);
  }, [theme]);
 
  // Basculer entre clair et sombre
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };
 
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
 
/**
 * Hook personnalisé pour utiliser le contexte de thème
 * Usage : const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  return useContext(ThemeContext);
}