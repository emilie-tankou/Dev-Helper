// src/pages/Checklist.jsx
// Page Checklist — suivi des étapes pour démarrer un projet web
// La progression est sauvegardée dans localStorage
 
import { useState, useEffect } from 'react';
import checklistData from '../data/checklist.json';
import '../styles/checklist.css';
 
// Clé utilisée pour persister la checklist dans localStorage
const STORAGE_KEY = 'dh-checklist';
 
/**
 * Charger les items cochés depuis localStorage
 * @returns {Set} Un Set des IDs cochés
 */
function loadChecked() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}
 
/**
 * Checklist — page de suivi des étapes d'un projet web
 */
function Checklist() {
  // État : ensemble des IDs des items cochés
  const [checked, setChecked] = useState(loadChecked);
 
  // Calculer le total d'items pour la barre de progression
  const totalItems = checklistData.reduce(
    (acc, group) => acc + group.items.length,
    0
  );
 
  const checkedCount = checked.size;
  const progressPercent = Math.round((checkedCount / totalItems) * 100);
 
  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  }, [checked]);
 
  /**
   * Cocher ou décocher un item
   * @param {string} id - Identifiant de l'item
   */
  const toggleItem = (id) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
 
  // Remettre toute la checklist à zéro
  const resetAll = () => setChecked(new Set());
 
  return (
    <div className="checklist-page fade-in">
 
      {/* --- En-tête --- */}
      <div className="page-header">
        <div className="page-header__left">
          <div className="page-header__icon page-header__icon--html">✅</div>
          <div>
            <h1 className="page-header__title">Checklist projet</h1>
            <p className="page-header__subtitle">
              Toutes les étapes pour mener ton projet de A à Z
            </p>
          </div>
        </div>
      </div>
 
      {/* --- Barre de progression --- */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar__header">
          <span className="progress-bar__label">
            {checkedCount} / {totalItems} étapes complétées
          </span>
          <span className="progress-bar__percent">{progressPercent}%</span>
        </div>
        <div className="progress-bar__track">
          <div
            className="progress-bar__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
 
      {/* --- Groupes d'items --- */}
      {checklistData.map(group => (
        <div key={group.group} className="checklist-group">
 
          {/* Titre du groupe */}
          <div className="checklist-group__title">
            <span className="checklist-group__icon">{group.icon}</span>
            {group.group}
          </div>
 
          {/* Items du groupe */}
          {group.items.map(item => {
            const isDone = checked.has(item.id);
            return (
              <div
                key={item.id}
                className={`checklist-item ${isDone ? 'done' : ''}`}
                onClick={() => toggleItem(item.id)}
                role="checkbox"
                aria-checked={isDone}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && toggleItem(item.id)}
              >
                {/* Checkbox visuelle */}
                <div className="checklist-item__checkbox">
                  {isDone && '✓'}
                </div>
 
                {/* Contenu */}
                <div className="checklist-item__content">
                  <p className="checklist-item__title">{item.title}</p>
                  <p className="checklist-item__desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
 
      {/* --- Bouton reset --- */}
      <button className="checklist-reset" onClick={resetAll}>
        🔄 Réinitialiser la checklist
      </button>
    </div>
  );
}
 
export default Checklist;