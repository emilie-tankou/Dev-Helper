// src/pages/JavaScript.jsx
// Page mémo JavaScript — passe la clé localStorage pour les commandes perso
 
import MemoPage from '../components/MemoPage';
import jsData from '../data/javascript.json';
 
function JavaScript() {
  return (
    <MemoPage
      title="JavaScript"
      subtitle="Variables, fonctions, tableaux, objets, async et DOM"
      icon="⚡"
      iconTheme="js"
      data={jsData}
      storageKey="dh-custom-js"
    />
  );
}
 
export default JavaScript;