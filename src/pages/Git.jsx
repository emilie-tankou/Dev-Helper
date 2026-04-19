// src/pages/Git.jsx
// Page mémo des commandes Git — utilise le composant MemoPage générique
 
import MemoPage from './components/MemoPage';
import gitData from '../data/git.json';
 
function Git() {
  return (
    <MemoPage
      title="Git"
      subtitle="Commandes essentielles pour versionner ton code"
      icon="🌿"
      iconTheme="git"
      data={gitData}
    />
  );
}
 
export default Git;