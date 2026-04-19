// src/components/CommandCard.jsx
// Carte affichant une commande copiable et sa description
// Affiche un bouton supprimer uniquement pour les commandes personnalisées
 
import { useState } from 'react';
 
/**
 * CommandCard — affiche une commande copiable et sa description
 *
 * @param {string}        cmd      - La commande ou syntaxe à afficher
 * @param {string}        desc     - La description de la commande
 * @param {function|null} onDelete - Si fourni, affiche le bouton supprimer
 */
function CommandCard({ cmd, desc, onDelete }) {
  const [copied, setCopied] = useState(false);
 
  /**
   * Copie la commande dans le presse-papiers
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
 
  return (
    <div className="command-card">
      {/* Zone du code avec bouton copier */}
      <div className="command-card__code">
        <span>{cmd}</span>
        <button
          className={`command-card__copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Copier la commande"
          aria-label="Copier la commande"
        >
          {copied ? '✓' : '⎘'}
        </button>
      </div>
 
      {/* Description */}
      <p className="command-card__desc">{desc}</p>
 
      {/* Bouton supprimer — visible uniquement si onDelete est fourni */}
      {onDelete && (
        <button
          className="command-card__delete-btn"
          onClick={onDelete}
          title="Supprimer cette commande"
          aria-label="Supprimer cette commande"
        >
          🗑️ Supprimer
        </button>
      )}
    </div>
  );
}
 
export default CommandCard;
 