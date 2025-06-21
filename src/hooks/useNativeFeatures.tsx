
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

// Importações condicionais para evitar erros
let StatusBar: any = null;
let SplashScreen: any = null;
let Keyboard: any = null;
let App: any = null;
let Network: any = null;
let Device: any = null;

// Tentar importar os módulos se disponíveis
const initializeCapacitorModules = async () => {
  try {
    const { StatusBar: SB } = await import('@capacitor/status-bar');
    StatusBar = SB;
  } catch (e) {
    console.log('StatusBar module not available');
  }

  try {
    const { SplashScreen: SS } = await import('@capacitor/splash-screen');
    SplashScreen = SS;
  } catch (e) {
    console.log('SplashScreen module not available');
  }

  try {
    const { Keyboard: KB } = await import('@capacitor/keyboard');
    Keyboard = KB;
  } catch (e) {
    console.log('Keyboard module not available');
  }

  try {
    const { App: A } = await import('@capacitor/app');
    App = A;
  } catch (e) {
    console.log('App module not available');
  }

  try {
    const { Network: NW } = await import('@capacitor/network');
    Network = NW;
  } catch (e) {
    console.log('Network module not available');
  }

  try {
    const { Device: DV } = await import('@capacitor/device');
    Device = DV;
  } catch (e) {
    console.log('Device module not available');
  }
};

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
        // Inicializar módulos do Capacitor
        await initializeCapacitorModules();
        setModulesLoaded(true);

        // Configure StatusBar
        if (StatusBar) {
          try {
            await StatusBar.setStyle({ style: 'Dark' });
            await StatusBar.setBackgroundColor({ color: '#1a1a1a' });
          } catch (error) {
            console.log('StatusBar configuration failed:', error);
          }
        }

        // Hide SplashScreen
        if (SplashScreen) {
          try {
            await SplashScreen.hide();
          } catch (error) {
            console.log('SplashScreen hide failed:', error);
          }
        }

        // Configure Keyboard
        if (Keyboard) {
          try {
            Keyboard.addListener('keyboardWillShow', () => {
              document.body.classList.add('keyboard-open');
            });

            Keyboard.addListener('keyboardWillHide', () => {
              document.body.classList.remove('keyboard-open');
            });
          } catch (error) {
            console.log('Keyboard listeners failed:', error);
          }
        }

        // Monitor network status
        if (Network) {
          try {
            const status = await Network.getStatus();
            setNetworkStatus(status.connected);

            Network.addListener('networkStatusChange', (status: any) => {
              setNetworkStatus(status.connected);
            });
          } catch (error) {
            console.log('Network monitoring failed:', error);
          }
        }

        // Get device info
        if (Device) {
          try {
            const info = await Device.getInfo();
            setDeviceInfo(info);
          } catch (error) {
            console.log('Device info failed:', error);
          }
        }

        // Handle app state changes
        if (App) {
          try {
            App.addListener('appStateChange', ({ isActive }: any) => {
              if (isActive) {
                console.log('App is active');
              } else {
                console.log('App is in background');
              }
            });
          } catch (error) {
            console.log('App listeners failed:', error);
          }
        }
      }
    };

    initializeNativeFeatures();
  }, []);

  return {
    isNative,
    networkStatus,
    deviceInfo,
    modulesLoaded,
  };
};
