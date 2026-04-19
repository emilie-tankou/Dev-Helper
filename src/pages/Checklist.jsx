// src/pages/Checklist.jsx
// Page Checklist entièrement personnalisable
// Les données de base sont vides — l'utilisateur crée ses propres groupes et étapes
 
import { useState, useEffect } from 'react';
import checklistData from '../data/checklist.json';
import '../styles/checklist.css';
 
const STORAGE_KEY_CHECKED = 'dh-checklist';
const STORAGE_KEY_CUSTOM  = 'dh-checklist-custom';
 
/** Charge les items cochés depuis localStorage */
function loadChecked() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CHECKED);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch { return new Set(); }
}
 
/** Charge les groupes personnalisés depuis localStorage */
function loadCustomGroups() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CUSTOM);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}
 
function Checklist() {
  const [checked,       setChecked]      = useState(loadChecked);
  const [customGroups,  setCustomGroups] = useState(loadCustomGroups);
 
  // Formulaire nouveau groupe
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [newGroupName,  setNewGroupName]  = useState('');
  const [newGroupIcon,  setNewGroupIcon]  = useState('📌');
 
  // Formulaire nouvel item (par groupe)
  const [activeItemForm, setActiveItemForm] = useState(null);
  const [newItemTitle,   setNewItemTitle]   = useState('');
  const [newItemDesc,    setNewItemDesc]    = useState('');
 
  // Persister les données cochées
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify([...checked]));
  }, [checked]);
 
  // Persister les groupes personnalisés
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customGroups));
  }, [customGroups]);
 
  // Calcul de la progression (uniquement sur les groupes perso)
  const customTotal   = customGroups.reduce((acc, g) => acc + g.items.length, 0);
  const baseTotal     = checklistData.reduce((acc, g) => acc + g.items.length, 0);
  const totalItems    = baseTotal + customTotal;
  const checkedCount  = checked.size;
  const progressPercent = totalItems > 0
    ? Math.round((checkedCount / totalItems) * 100)
    : 0;
 
  /** Cocher / décocher un item */
  const toggleItem = (id) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
 
  /** Ajouter un nouveau groupe personnalisé */
  const handleAddGroup = () => {
    if (!newGroupName.trim()) return;
 
    const newGroup = {
      id:    `group-${Date.now()}`,
      group: newGroupName.trim(),
      icon:  newGroupIcon.trim() || '📌',
      items: [],
    };
 
    setCustomGroups(prev => [...prev, newGroup]);
    setNewGroupName('');
    setNewGroupIcon('📌');
    setShowGroupForm(false);
  };
 
  /** Supprimer un groupe et décocher ses items */
  const handleDeleteGroup = (groupId) => {
    const group = customGroups.find(g => g.id === groupId);
    if (group) {
      setChecked(prev => {
        const next = new Set(prev);
        group.items.forEach(item => next.delete(item.id));
        return next;
      });
    }
    setCustomGroups(prev => prev.filter(g => g.id !== groupId));
  };
 
  /** Ajouter un item dans un groupe */
  const handleAddItem = (groupId) => {
    if (!newItemTitle.trim()) return;
 
    const newItem = {
      id:    `item-${Date.now()}`,
      title: newItemTitle.trim(),
      desc:  newItemDesc.trim(),
    };
 
    setCustomGroups(prev =>
      prev.map(g => g.id === groupId
        ? { ...g, items: [...g.items, newItem] }
        : g
      )
    );
 
    setNewItemTitle('');
    setNewItemDesc('');
    setActiveItemForm(null);
  };
 
  /** Supprimer un item d'un groupe */
  const handleDeleteItem = (groupId, itemId) => {
    setCustomGroups(prev =>
      prev.map(g => g.id === groupId
        ? { ...g, items: g.items.filter(i => i.id !== itemId) }
        : g
      )
    );
    setChecked(prev => {
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
  };
 
  /** Réinitialiser toutes les cases cochées */
  const resetAll = () => setChecked(new Set());
 
  // Vérifier s'il y a du contenu à afficher
  const hasContent = checklistData.length > 0 || customGroups.length > 0;
 
  return (
    <div className="checklist-page fade-in">
 
      {/* --- En-tête --- */}
      <div className="page-header">
        <div className="page-header__left">
          <div className="page-header__icon page-header__icon--html">✅</div>
          <div>
            <h1 className="page-header__title">Checklist projet</h1>
            <p className="page-header__subtitle">
              Crée tes propres groupes d'étapes et suis ta progression
            </p>
          </div>
        </div>
      </div>
 
      {/* --- Barre de progression (visible uniquement s'il y a du contenu) --- */}
      {hasContent && (
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
      )}
 
      {/* --- Bouton ajouter un groupe --- */}
      <button
        className={`add-btn ${showGroupForm ? 'add-btn--cancel' : ''}`}
        onClick={() => setShowGroupForm(prev => !prev)}
      >
        {showGroupForm ? '✕ Annuler' : '➕ Ajouter un groupe'}
      </button>
 
      {/* --- Formulaire nouveau groupe --- */}
      {showGroupForm && (
        <div className="add-form">
          <h3 className="add-form__title">Nouveau groupe de tâches</h3>
          <div className="add-form__fields">
            <div className="add-form__field">
              <label className="add-form__label">Icône</label>
              <input
                className="add-form__input add-form__input--short"
                type="text"
                placeholder="📌"
                value={newGroupIcon}
                onChange={e => setNewGroupIcon(e.target.value)}
                maxLength={2}
              />
            </div>
            <div className="add-form__field">
              <label className="add-form__label">Nom du groupe *</label>
              <input
                className="add-form__input"
                type="text"
                placeholder="ex: Conception, Développement..."
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
              />
            </div>
          </div>
          <button
            className="add-form__submit"
            onClick={handleAddGroup}
            disabled={!newGroupName.trim()}
          >
            ✓ Créer le groupe
          </button>
        </div>
      )}
 
      {/* --- Message d'accueil si aucun contenu --- */}
      {!hasContent && !showGroupForm && (
        <div className="empty-state">
          <div className="empty-state__icon">📋</div>
          <p className="empty-state__text">
            Ta checklist est vierge.<br />
            Clique sur <strong>➕ Ajouter un groupe</strong> pour commencer !
          </p>
        </div>
      )}
 
      {/* --- Groupes de base du JSON (vide par défaut) --- */}
      {checklistData.map(group => (
        <div key={group.group} className="checklist-group">
          <div className="checklist-group__title">
            <span className="checklist-group__icon">{group.icon}</span>
            {group.group}
          </div>
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
                <div className="checklist-item__checkbox">{isDone && '✓'}</div>
                <div className="checklist-item__content">
                  <p className="checklist-item__title">{item.title}</p>
                  <p className="checklist-item__desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
 
      {/* --- Groupes personnalisés --- */}
      {customGroups.map(group => (
        <div key={group.id} className="checklist-group checklist-group--custom">
          <div className="checklist-group__title">
            <span className="checklist-group__icon">{group.icon}</span>
            {group.group}
 
            {/* Bouton ajouter un item */}
            <button
              className="group-action-btn"
              onClick={() => setActiveItemForm(
                activeItemForm === group.id ? null : group.id
              )}
              title="Ajouter une étape"
            >
              {activeItemForm === group.id ? '✕' : '➕'}
            </button>
 
            {/* Bouton supprimer le groupe */}
            <button
              className="group-action-btn group-action-btn--delete"
              onClick={() => handleDeleteGroup(group.id)}
              title="Supprimer ce groupe"
            >
              🗑️
            </button>
          </div>
 
          {/* Formulaire ajout d'item */}
          {activeItemForm === group.id && (
            <div className="add-form add-form--inline">
              <div className="add-form__fields">
                <div className="add-form__field">
                  <label className="add-form__label">Étape *</label>
                  <input
                    className="add-form__input"
                    type="text"
                    placeholder="ex: Créer le wireframe"
                    value={newItemTitle}
                    onChange={e => setNewItemTitle(e.target.value)}
                  />
                </div>
                <div className="add-form__field">
                  <label className="add-form__label">Description (optionnel)</label>
                  <input
                    className="add-form__input"
                    type="text"
                    placeholder="ex: Esquisse basse fidélité des pages"
                    value={newItemDesc}
                    onChange={e => setNewItemDesc(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="add-form__submit"
                onClick={() => handleAddItem(group.id)}
                disabled={!newItemTitle.trim()}
              >
                ✓ Ajouter l'étape
              </button>
            </div>
          )}
 
          {/* Items du groupe */}
          {group.items.map(item => {
            const isDone = checked.has(item.id);
            return (
              <div
                key={item.id}
                className={`checklist-item ${isDone ? 'done' : ''}`}
              >
                <div
                  className="checklist-item__checkbox"
                  onClick={() => toggleItem(item.id)}
                  role="checkbox"
                  aria-checked={isDone}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && toggleItem(item.id)}
                >
                  {isDone && '✓'}
                </div>
                <div
                  className="checklist-item__content"
                  onClick={() => toggleItem(item.id)}
                >
                  <p className="checklist-item__title">{item.title}</p>
                  {item.desc && (
                    <p className="checklist-item__desc">{item.desc}</p>
                  )}
                </div>
                <button
                  className="item-delete-btn"
                  onClick={() => handleDeleteItem(group.id, item.id)}
                  title="Supprimer cette étape"
                >
                  🗑️
                </button>
              </div>
            );
          })}
 
          {/* Message si le groupe est vide */}
          {group.items.length === 0 && (
            <p className="group-empty">
              Aucune étape — clique sur ➕ pour en ajouter
            </p>
          )}
        </div>
      ))}
 
      {/* --- Bouton reset (visible uniquement s'il y a du contenu coché) --- */}
      {checkedCount > 0 && (
        <button className="checklist-reset" onClick={resetAll}>
          🔄 Réinitialiser les cases cochées
        </button>
      )}
    </div>
  );
}
 
export default Checklist;