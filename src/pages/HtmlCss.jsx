// src/pages/HtmlCss.jsx
// Page mémo HTML & CSS — passe la clé localStorage pour les commandes perso
 
import MemoPage from '../components/MemoPage';
import htmlData from '../data/html.json';
 
function HtmlCss() {
  return (
    <MemoPage
      title="HTML & CSS"
      subtitle="Balises sémantiques, Flexbox, Grid et variables CSS"
      icon="🎨"
      iconTheme="html"
      data={htmlData}
      storageKey="dh-custom-html"
    />
  );
}
 
export default HtmlCss;
 