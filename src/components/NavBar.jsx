// src/components/Navbar.jsx
// Barre de navigation latérale principale de l'application
 
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/navbar.css';
 
// Définition des liens de navigation
const NAV_LINKS = [
  { to: '/',         icon: '🏠', label: 'Accueil' },
  { to: '/git',      icon: '🌿', label: 'Git' },
  { to: '/html-css', icon: '🎨', label: 'HTML & CSS' },
  { to: '/js',       icon: '⚡', label: 'JavaScript' },
  { to: '/checklist',icon: '✅', label: 'Checklist projet' },
];
 
/**
 * Navbar — composant de navigation latérale
 * Gère aussi le menu burger sur mobile
 */
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
 
  // Fermer le menu mobile lors d'un clic sur un lien
  const handleLinkClick = () => setMenuOpen(false);
 
  return (
    <>
      {/* Bouton burger (mobile uniquement) */}
      <button
        className="navbar__burger"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Ouvrir le menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
 
      {/* Overlay pour fermer le menu sur mobile */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}
 
      {/* Sidebar principale */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
 
        {/* Logo */}
        <NavLink to="/" className="navbar__logo" onClick={handleLinkClick}>
          <div className="navbar__logo-icon">💡</div>
          <span className="navbar__logo-text">
            Dev<span>Helper</span>
          </span>
        </NavLink>
 
        {/* Liens de navigation */}
        <div className="navbar__nav">
          <span className="navbar__section-title">Navigation</span>
 
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'active' : ''}`
              }
              onClick={handleLinkClick}
            >
              <span className="navbar__link-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </div>
 
        {/* Footer : bouton de changement de thème */}
        <div className="navbar__footer">
          <button className="navbar__link" onClick={toggleTheme}>
            <span className="navbar__link-icon">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </button>
        </div>
      </nav>
    </>
  );
}
 
export default Navbar;
