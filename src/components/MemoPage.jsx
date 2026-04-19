// src/components/MemoPage.jsx
// Composant générique pour les pages de mémo (Git, HTML/CSS, JavaScript)
// Supporte l'ajout et la suppression de commandes personnalisées via localStorage
 
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CommandCard from './CommandCard';
import '../styles/memo.css';
 
/**
 * Charge les commandes personnalisées depuis localStorage
 * @param {string} storageKey - Clé unique par page (ex: "dh-custom-git")
 * @returns {Array} Tableau d'items personnalisés
 */
function loadCustomData(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
 
/**
 * MemoPage — page mémo générique et réutilisable
 *
 * @param {string} title      - Titre de la page
 * @param {string} subtitle   - Sous-titre descriptif
 * @param {string} icon       - Emoji représentant la section
 * @param {string} iconTheme  - Classe CSS du thème (git | html | js)
 * @param {Array}  data       - Données JSON de base (non modifiables)
 * @param {string} storageKey - Clé localStorage pour les données perso
 */
function MemoPage({ title, subtitle, icon, iconTheme, data, storageKey }) {
  const [search, setSearch]       = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [newCmd,  setNewCmd]      = useState('');
  const [newDesc, setNewDesc]     = useState('');
  const [newCat,  setNewCat]      = useState('');
 
  // Commandes personnalisées chargées depuis localStorage
  const [customItems, setCustomItems] = useState(() => loadCustomData(storageKey));
 
  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(customItems));
  }, [customItems, storageKey]);
 
  /**
   * Ajouter une nouvelle commande personnalisée
   */
  const handleAdd = () => {
    if (!newCmd.trim() || !newDesc.trim()) return;
 
    const newItem = {
      id:       Date.now(),
      cmd:      newCmd.trim(),
      desc:     newDesc.trim(),
      category: newCat.trim() || 'Mes commandes',
    };
 
    setCustomItems(prev => [...prev, newItem]);
    setNewCmd('');
    setNewDesc('');
    setNewCat('');
    setShowForm(false);
  };
 
  /**
   * Supprimer une commande personnalisée par son ID
   * @param {number} id
   */
  const handleDelete = (id) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };
 
  // Regrouper les commandes perso par catégorie
  const groupedCustom = customItems.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
 
  // Fusionner données de base + données personnalisées
  const allData = [
    ...data,
    ...Object.entries(groupedCustom).map(([category, items]) => ({
      category,
      items,
      isCustom: true,
    })),
  ];
 
  // Filtrer selon la recherche
  const filteredData = allData
    .map(category => ({
      ...category,
      items: category.items.filter(
        item =>
          item.cmd.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(category => category.items.length > 0);
 
  const totalResults = filteredData.reduce((acc, cat) => acc + cat.items.length, 0);
 
  return (
    <div className="memo-page">
 
      {/* --- En-tête --- */}
      <div className="page-header">
        <div className="page-header__left">
          <div className={`page-header__icon page-header__icon--${iconTheme}`}>
            {icon}
          </div>
          <div>
            <h1 className="page-header__title">{title}</h1>
            <p className="page-header__subtitle">{subtitle}</p>
          </div>
        </div>
 
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Rechercher dans ${title}...`}
        />
      </div>
 
      {/* --- Bouton ouvrir formulaire --- */}
      <button
        className={`add-btn ${showForm ? 'add-btn--cancel' : ''}`}
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? '✕ Annuler' : '➕ Ajouter une commande'}
      </button>
 
      {/* --- Formulaire d'ajout --- */}
      {showForm && (
        <div className="add-form">
          <h3 className="add-form__title">Nouvelle commande personnalisée</h3>
 
          <div className="add-form__fields">
            <div className="add-form__field">
              <label className="add-form__label">Commande *</label>
              <input
                className="add-form__input add-form__input--mono"
                type="text"
                placeholder="ex: git stash pop"
                value={newCmd}
                onChange={e => setNewCmd(e.target.value)}
              />
            </div>
 
            <div className="add-form__field">
              <label className="add-form__label">Description *</label>
              <input
                className="add-form__input"
                type="text"
                placeholder="ex: Réapplique les modifications mises de côté"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />
            </div>
 
            <div className="add-form__field">
              <label className="add-form__label">Catégorie (optionnel)</label>
              <input
                className="add-form__input"
                type="text"
                placeholder="ex: Mes raccourcis"
                value={newCat}
                onChange={e => setNewCat(e.target.value)}
              />
            </div>
          </div>
 
          <button
            className="add-form__submit"
            onClick={handleAdd}
            disabled={!newCmd.trim() || !newDesc.trim()}
          >
            ✓ Ajouter
          </button>
        </div>
      )}
 
      {/* --- Liste des commandes --- */}
      {filteredData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <p className="empty-state__text">
            Aucun résultat pour <strong>"{search}"</strong>
          </p>
        </div>
      ) : (
        <>
          {search && (
            <p className="section-title">
              {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
            </p>
          )}
 
          {filteredData.map(category => (
            <div key={category.category}>
              <p className="section-title">
                {category.category}
                {category.isCustom && (
                  <span className="custom-badge">perso</span>
                )}
              </p>
 
              <div className="commands-grid">
                {category.items.map(item => (
                  <CommandCard
                    key={item.id}
                    cmd={item.cmd}
                    desc={item.desc}
                    onDelete={category.isCustom ? () => handleDelete(item.id) : null}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
 
export default MemoPage;