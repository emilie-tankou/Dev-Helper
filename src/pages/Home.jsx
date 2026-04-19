// src/pages/Home.jsx
// Page d'accueil de DevHelper
// Les compteurs sont dynamiques : ils lisent les données JSON + localStorage
 
import { useNavigate } from 'react-router-dom';
import gitData  from '../data/git.json';
import htmlData from '../data/html.json';
import jsData   from '../data/javascript.json';
import '../styles/home.css';
 
/**
 * Compte le total d'items dans un tableau de catégories JSON
 * @param {Array} data - Tableau de catégories avec leurs items
 * @returns {number}
 */
function countBase(data) {
  return data.reduce((acc, cat) => acc + cat.items.length, 0);
}
 
/**
 * Compte les commandes personnalisées sauvegardées dans localStorage
 * @param {string} storageKey - Clé localStorage
 * @returns {number}
 */
function countCustom(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).length : 0;
  } catch { return 0; }
}
 
/**
 * Compte les étapes dans les groupes perso de la checklist
 * @returns {number}
 */
function countChecklistItems() {
  try {
    const saved = localStorage.getItem('dh-checklist-custom');
    if (!saved) return 0;
    const groups = JSON.parse(saved);
    return groups.reduce((acc, g) => acc + g.items.length, 0);
  } catch { return 0; }
}
 
function Home() {
  const navigate = useNavigate();
 
  // Calcul dynamique des compteurs
  const gitCount       = countBase(gitData)  + countCustom('dh-custom-git');
  const htmlCount      = countBase(htmlData) + countCustom('dh-custom-html');
  const jsCount        = countBase(jsData)   + countCustom('dh-custom-js');
  const checklistCount = countChecklistItems();
  const totalCommands  = gitCount + htmlCount + jsCount;
 
  // Définition des cartes avec les compteurs dynamiques
  const QUICK_CARDS = [
    {
      to:    '/git',
      icon:  '🌿',
      title: 'Git',
      count: `${gitCount} commande${gitCount > 1 ? 's' : ''}`,
      color: 'var(--accent-pink)',
    },
    {
      to:    '/html-css',
      icon:  '🎨',
      title: 'HTML & CSS',
      count: `${htmlCount} commande${htmlCount > 1 ? 's' : ''}`,
      color: 'var(--accent-cyan)',
    },
    {
      to:    '/js',
      icon:  '⚡',
      title: 'JavaScript',
      count: `${jsCount} commande${jsCount > 1 ? 's' : ''}`,
      color: 'var(--accent-violet)',
    },
    {
      to:    '/checklist',
      icon:  '✅',
      title: 'Checklist projet',
      count: checklistCount > 0
        ? `${checklistCount} étape${checklistCount > 1 ? 's' : ''}`
        : 'Vierge — à personnaliser',
      color: '#fbbf24',
    },
  ];
 
  return (
    <div className="home fade-in">
 
      {/* --- Section héro --- */}
      <div className="home__hero">
        <div className="home__eyebrow">
          <div className="home__status" />
          <span className="home__eyebrow-text">Ton compagnon de formation</span>
        </div>
 
        <h1 className="home__title">
          Tout ce dont tu as besoin,{' '}
          <span className="home__title-accent">en un seul endroit.</span>
        </h1>
 
        <p className="home__subtitle">
          DevHelper est ton outil personnel. Ajoute tes propres commandes,
          balises et étapes de projet — tout est sauvegardé dans ton navigateur.
        </p>
      </div>
 
      {/* --- Cartes de navigation rapide --- */}
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
 
      {/* --- Statistiques globales dynamiques --- */}
      <div className="home__stats">
        <div className="stat">
          <span className="stat__number">{totalCommands}</span>
          <span className="stat__label">Commandes</span>
        </div>
        <div className="stat">
          <span className="stat__number">4</span>
          <span className="stat__label">Sections</span>
        </div>
        <div className="stat">
          <span className="stat__number">{checklistCount}</span>
          <span className="stat__label">Étapes checklist</span>
        </div>
      </div>
 
    </div>
  );
}
 
export default Home;