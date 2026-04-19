// src/pages/Home.jsx
// Page d'accueil de DevHelper
 
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
 
// Données des cartes de navigation rapide
const QUICK_CARDS = [
  {
    to: '/git',
    icon: '🌿',
    title: 'Git',
    count: '24 commandes',
    color: 'var(--accent-pink)',
  },
  {
    to: '/html-css',
    icon: '🎨',
    title: 'HTML & CSS',
    count: '24 commandes',
    color: 'var(--accent-cyan)',
  },
  {
    to: '/js',
    icon: '⚡',
    title: 'JavaScript',
    count: '24 commandes',
    color: 'var(--accent-violet)',
  },
  {
    to: '/checklist',
    icon: '✅',
    title: 'Checklist projet',
    count: '19 étapes',
    color: '#fbbf24',
  },
];
 
/**
 * Home — page d'accueil avec présentation et accès rapide aux sections
 */
function Home() {
  const navigate = useNavigate();
 
  return (
    <div className="home fade-in">
 
      {/* --- Section héro --- */}
      <div className="home__hero">
        {/* Indicateur de statut en ligne */}
        <div className="home__eyebrow">
          <div className="home__status" />
          <span className="home__eyebrow-text">Ton compagnon de formation</span>
        </div>
 
        <h1 className="home__title">
          Tout ce dont tu as besoin,{' '}
          <span className="home__title-accent">en un seul endroit.</span>
        </h1>
 
        <p className="home__subtitle">
          DevHelper centralise les commandes essentielles, les syntaxes clés et
          les checklists pour t'aider tout au long de ta formation en développement web.
        </p>
      </div>
 
      {/* --- Accès rapide aux sections --- */}
      <div className="home__cards">
        {QUICK_CARDS.map(card => (
          <div
            key={card.to}
            className="quick-card"
            onClick={() => navigate(card.to)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(card.to)}
          >
            <span className="quick-card__icon" style={{ color: card.color }}>
              {card.icon}
            </span>
            <span className="quick-card__title">{card.title}</span>
            <span className="quick-card__count">{card.count}</span>
          </div>
        ))}
      </div>
 
      {/* --- Statistiques globales --- */}
      <div className="home__stats">
        <div className="stat">
          <span className="stat__number">72+</span>
          <span className="stat__label">Commandes</span>
        </div>
        <div className="stat">
          <span className="stat__number">5</span>
          <span className="stat__label">Catégories</span>
        </div>
        <div className="stat">
          <span className="stat__number">19</span>
          <span className="stat__label">Étapes checklist</span>
        </div>
      </div>
    </div>
  );
}
 
export default Home;
 