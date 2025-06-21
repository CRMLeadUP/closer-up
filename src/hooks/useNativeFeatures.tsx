
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

export const useNativeFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [modulesLoaded, setModulesLoaded] = useState(false);

  useEffect(() => {
    const initializeNativeFeatures = async () => {
      const native = Capacitor.isNativePlatform();
      setIsNative(native);

      if (native) {
        console.log('Native platform detected');

        // Configurações básicas para plataforma nativa
        try {
          // Adicionar classe CSS para identificar app nativo
          document.body.classList.add('capacitor-app');
          
          // Configurar viewport para mobile
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          }

          setNetworkStatus(navigator.onLine);
          
          // Monitor network status usando API web padrão
          window.addEventListener('online', () => setNetworkStatus(true));
          window.addEventListener('offline', () => setNetworkStatus(false));

          // Simular informações básicas do dispositivo
          setDeviceInfo({
            platform: native ? Capacitor.getPlatform() : 'web',
            isNative: native
          });

          setModulesLoaded(true);
          console.log('Native features initialized successfully');
        } catch (error) {
          console.log('Error initializing native features:', error);
          setModulesLoaded(true); // Marcar como carregado mesmo com erro
        }
      } else {
        // Configuração para web
        setNetworkStatus(navigator.onLine);
        window.addEventListener('online', () => setNetworkStatus(true));
        window.addEventListener('offline', () => setNetworkStatus(false));
        
        setDeviceInfo({
          platform: 'web',
          isNative: false
        });
        
        setModulesLoaded(true);
        console.log('Web platform detected');
      }
    };

    initializeNativeFeatures();

    // Cleanup
    return () => {
      window.removeEventListener('online', () => setNetworkStatus(true));
      window.removeEventListener('offline', () => setNetworkStatus(false));
    };
  }, []);

  return {
    isNative,
    networkStatus,
    deviceInfo,
    modulesLoaded,
  };
};
