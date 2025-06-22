
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useNativeFeatures } from './hooks/useNativeFeatures';

// Componente wrapper para inicializar funcionalidades nativas
const AppWithNativeFeatures = () => {
  useNativeFeatures();
  return <App />;
};

createRoot(document.getElementById("root")!).render(<AppWithNativeFeatures />);
