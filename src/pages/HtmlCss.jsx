// src/pages/HtmlCss.jsx
// Page mémo HTML & CSS — utilise le composant MemoPage générique
 
import MemoPage from './components/MemoPage';
import htmlData from '../data/html.json';
 
function HtmlCss() {
  return (
    <MemoPage
      title="HTML & CSS"
      subtitle="Balises sémantiques, Flexbox, Grid et variables CSS"
      icon="🎨"
      iconTheme="html"
      data={htmlData}
    />
  );
}
 
export default HtmlCss;
 