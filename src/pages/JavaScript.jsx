// src/pages/JavaScript.jsx
// Page mémo JavaScript — utilise le composant MemoPage générique
 
import MemoPage from './components/MemoPage';
import jsData from '../data/javascript.json';
 
function JavaScript() {
  return (
    <MemoPage
      title="JavaScript"
      subtitle="Variables, fonctions, tableaux, objets, async et DOM"
      icon="⚡"
      iconTheme="js"
      data={jsData}
    />
  );
}
 
export default JavaScript;
 