// src/App.jsx
// Point d'entrée principal — configure le routing et le layout global
 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/NavBar';
 
// Import des pages
import Home       from './pages/Home';
import Git        from './pages/Git';
import HtmlCss    from './pages/HtmlCss';
import JavaScript from './pages/JavaScript';
import Checklist  from './pages/Checklist';
 
// Import du CSS global
import './styles/global.css';
 
/**
 * App — composant racine
 * Structure : ThemeProvider > BrowserRouter > layout (Navbar + main)
 */
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-layout">
 
          {/* Barre de navigation latérale */}
          <Navbar />
 
          {/* Contenu principal */}
          <main className="main-content">
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/git"       element={<Git />} />
              <Route path="/html-css"  element={<HtmlCss />} />
              <Route path="/js"        element={<JavaScript />} />
              <Route path="/checklist" element={<Checklist />} />
 
              {/* Route 404 — page non trouvée */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: 'center', paddingTop: '80px', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>404</div>
                    <p>Page introuvable</p>
                  </div>
                }
              />
            </Routes>
          </main>
 
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
 
export default App;
 