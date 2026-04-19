// src/components/MemoPage.jsx
// Composant générique pour les pages de mémo (Git, HTML/CSS, JavaScript)
// Reçoit les données et métadonnées en props pour être entièrement réutilisable
 
import { useState } from 'react';
import SearchBar from './SearchBar';
import CommandCard from './CommandCard';
import '../styles/memo.css';
 
/**
 * MemoPage — page mémo générique et réutilisable
 *
 * @param {string} title       - Titre de la page (ex: "Git")
 * @param {string} subtitle    - Sous-titre descriptif
 * @param {string} icon        - Emoji représentant la section
 * @param {string} iconTheme   - Classe CSS du thème de l'icône (git | html | js)
 * @param {Array}  data        - Tableau de catégories avec leurs items
 */
function MemoPage({ title, subtitle, icon, iconTheme, data }) {
  const [search, setSearch] = useState('');
 
  // Filtrer les résultats selon la recherche (commande ou description)
  const filteredData = data.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.cmd.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);
 
  // Calculer le total de résultats trouvés
  const totalResults = filteredData.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
 
  return (
    <div className="memo-page">
 
      {/* --- En-tête de la page --- */}
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
 
        {/* Barre de recherche */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Rechercher dans ${title}...`}
        />
      </div>
 
      {/* --- Contenu : liste des catégories --- */}
      {filteredData.length === 0 ? (
        /* État vide si aucun résultat */
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <p className="empty-state__text">
            Aucun résultat pour <strong>"{search}"</strong>
          </p>
        </div>
      ) : (
        <>
          {/* Nombre de résultats lors d'une recherche */}
          {search && (
            <p className="section-title">
              {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
            </p>
          )}
 
          {filteredData.map(category => (
            <div key={category.category}>
              {/* Titre de la catégorie */}
              <p className="section-title">{category.category}</p>
 
              {/* Grille de cartes */}
              <div className="commands-grid">
                {category.items.map((item, index) => (
                  <CommandCard
                    key={item.id}
                    cmd={item.cmd}
                    desc={item.desc}
                    style={{ animationDelay: `${index * 0.04}s` }}
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