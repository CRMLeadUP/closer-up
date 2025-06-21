
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';

export const useNativeFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    const initializeNativeFeatures = async () => {
      const native = Capacitor.isNativePlatform();
      setIsNative(native);

      if (native) {
        // Configure StatusBar
        try {
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: '#1a1a1a' });
        } catch (error) {
          console.log('StatusBar not available');
        }

        // Hide SplashScreen
        try {
          await SplashScreen.hide();
        } catch (error) {
          console.log('SplashScreen not available');
        }

        // Configure Keyboard
        try {
          Keyboard.addListener('keyboardWillShow', () => {
            document.body.classList.add('keyboard-open');
          });

          Keyboard.addListener('keyboardWillHide', () => {
            document.body.classList.remove('keyboard-open');
          });
        } catch (error) {
          console.log('Keyboard not available');
        }

        // Monitor network status
        try {
          const status = await Network.getStatus();
          setNetworkStatus(status.connected);

          Network.addListener('networkStatusChange', (status) => {
            setNetworkStatus(status.connected);
          });
        } catch (error) {
          console.log('Network not available');
        }

        // Get device info
        try {
          const info = await Device.getInfo();
          setDeviceInfo(info);
        } catch (error) {
          console.log('Device not available');
        }

        // Handle app state changes
        try {
          App.addListener('appStateChange', ({ isActive }) => {
            if (isActive) {
              // App became active
              console.log('App is active');
            } else {
              // App went to background
              console.log('App is in background');
            }
          });
        } catch (error) {
          console.log('App listeners not available');
        }
      }
    };

    initializeNativeFeatures();
  }, []);

  return {
    isNative,
    networkStatus,
    deviceInfo,
  };
};
