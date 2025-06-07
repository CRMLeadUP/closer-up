
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5f11282c29224aa8a68aa78bf4a1a72b',
  appName: 'closer-ai-boost',
  webDir: 'dist',
  server: {
    url: 'https://5f11282c-2922-4aa8-a68a-a78bf4a1a72b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a',
      showSpinner: false
    }
  }
};

export default config;
