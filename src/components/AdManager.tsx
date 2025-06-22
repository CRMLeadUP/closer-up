
import { useEffect, useState } from 'react';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';

interface AdManagerProps {
  adType: 'banner' | 'interstitial' | 'rewarded';
  className?: string;
  onAdLoaded?: () => void;
  onAdError?: (error: string) => void;
}

const AdManager = ({ adType, className = '', onAdLoaded, onAdError }: AdManagerProps) => {
  const { isNative } = useNativeFeatures();
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (!isNative) {
      // Simulação de anúncio para web/desenvolvimento
      const timer = setTimeout(() => {
        setAdLoaded(true);
        onAdLoaded?.();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Aqui você integraria com AdMob ou outra plataforma de anúncios
    // Por exemplo: @capacitor-community/admob
    loadAd();
  }, [isNative, adType]);

  const loadAd = async () => {
    try {
      // Implementar carregamento de anúncios reais aqui
      // Exemplo com AdMob:
      // await AdMob.initialize();
      // await AdMob.prepareBanner({...});
      
      setAdLoaded(true);
      onAdLoaded?.();
    } catch (error) {
      console.error('Error loading ad:', error);
      onAdError?.(error as string);
    }
  };

  if (!adLoaded) {
    return (
      <div className={`ad-placeholder ${className}`}>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded">
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
            <span className="text-sm text-gray-500">Carregando anúncio...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      {adType === 'banner' && (
        <div className="banner-ad bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Anúncio</div>
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Espaço para Banner 320x50
          </div>
        </div>
      )}
      
      {adType === 'interstitial' && (
        <div className="interstitial-ad fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-4">Anúncio Intersticial</div>
              <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded flex items-center justify-center">
                <span>Anúncio 300x250</span>
              </div>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setAdLoaded(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdManager;
