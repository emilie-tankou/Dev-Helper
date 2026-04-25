# 💡 DevHelper
 
> Le compagnon de formation en développement web.
 
DevHelper est ton outil personnel pour centraliser tes commandes essentielles (Git, HTML/CSS, JavaScript) et suivre tes projets avec une checklist personnalisable. Tout est sauvegardé dans ton navigateur.
 
---
 
## 🚀 Démo en ligne
 
👉 [Voir le projet en ligne](#) *(lien à mettre à jour après déploiement sur Vercel)*
 
---
 
## ✨ Fonctionnalités
 
- 🌿 **Mémo Git** — Ajoute et consulte tes commandes Git personnalisées avec copie en 1 clic
- 🎨 **Mémo HTML & CSS** — Balises sémantiques, Flexbox, Grid, variables CSS
- ⚡ **Mémo JavaScript** — Variables, fonctions, tableaux, objets, async, DOM
- ✅ **Checklist projet** — Crée tes propres groupes d'étapes et suis ta progression
- 🔍 **Recherche instantanée** — Filtre dans chaque section en temps réel
- 🌙 **Mode sombre / clair** — Thème persisté localement
---
 
## 🛠️ Technologies utilisées
 
- [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- CSS custom (variables, Flexbox, Grid)
- localStorage pour la persistance des données
---
 
## 📦 Guide d'installation
 
### Prérequis
 
- [Node.js](https://nodejs.org/) v18 ou supérieur
### Étapes
 
```bash
# 1. Cloner le dépôt
git clone https://github.com/emilie-tankou3/devhelper.git
 
# 2. Se déplacer dans le dossier
cd devhelper
 
# 3. Installer les dépendances
npm install
 
# 4. Lancer le serveur de développement
npm run dev
```
 
L'application est accessible sur **http://localhost:5173**
 
### Build de production
 
```bash
npm run build
npm run preview
```
 
---
 
## 📁 Structure du projet
 
```
devhelper/
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── Navbar.jsx
│   │   ├── MemoPage.jsx
│   │   ├── CommandCard.jsx
│   │   └── SearchBar.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/             # Données JSON
│   │   ├── git.json
│   │   ├── html.json
│   │   ├── javascript.json
│   │   └── checklist.json
│   ├── pages/            # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── Git.jsx
│   │   ├── HtmlCss.jsx
│   │   ├── JavaScript.jsx
│   │   └── Checklist.jsx
│   ├── styles/           # Feuilles de style CSS
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```
 
---
 
## 🎯 Problématique
 
Pendant la formation, les élèves perdent du temps à chercher les mêmes commandes et syntaxes en boucle sur Google. Il n'existe pas d'outil centralisé et personnalisable adapté aux besoins d'un élève en formation.
 
## 💡 Solution
 
DevHelper est un outil 100% personnalisable qui permet à chaque élève de construire sa propre base de connaissances au fur et à mesure de sa formation.
 
---
 
## 👤 Auteure
 
Emilie Tankou — [@emilie-tankou](https://github.com/emilie-tankou)
 