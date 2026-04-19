// src/pages/Git.jsx
// Page mémo Git — passe la clé localStorage pour les commandes perso
 
import MemoPage from '../components/MemoPage.jsx';
import gitData from '../data/git.json';
 
function Git() {
  return (
    <MemoPage
      title="Git"
      subtitle="Commandes essentielles pour versionner ton code"
      icon="🌿"
      iconTheme="git"
      data={gitData}
      storageKey="dh-custom-git"
    />
  );
}
 
export default Git;
 