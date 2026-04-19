// src/components/CommandCard.jsx
// Carte affichant une commande/syntaxe avec bouton de copie
 
import { useState } from 'react';
 
/**
 * CommandCard — affiche une commande copiable et sa description
 * @param {string} cmd  - La commande ou syntaxe à afficher
 * @param {string} desc - La description textuelle de la commande
 */
function CommandCard({ cmd, desc }) {
  // État local pour l'animation de confirmation de copie
  const [copied, setCopied] = useState(false);
 
  /**
   * Copie la commande dans le presse-papiers
   * et affiche brièvement un retour visuel
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
    </div>
  );
}
 
export default CommandCard;