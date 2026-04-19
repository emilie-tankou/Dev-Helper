// src/components/SearchBar.jsx
// Champ de recherche réutilisable avec icône intégrée
 
/**
 * SearchBar — barre de recherche générique
 * @param {string}   value       - Valeur actuelle du champ
 * @param {function} onChange    - Callback appelé à chaque saisie
 * @param {string}   placeholder - Texte affiché quand le champ est vide
 */
function SearchBar({ value, onChange, placeholder = 'Rechercher...' }) {
  return (
    <div className="search-bar">
      {/* Icône de loupe */}
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
 
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Barre de recherche"
      />
    </div>
  );
}
 
export default SearchBar;