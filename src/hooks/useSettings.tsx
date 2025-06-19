import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettings {
  push: boolean;
  email: boolean;
  sounds: boolean;
}

interface UserSettings {
  darkMode: boolean;
  language: string;
  notifications: NotificationSettings;
}

const defaultSettings: UserSettings = {
  darkMode: false,
  language: 'pt-BR',
  notifications: {
    push: true,
    email: false,
    sounds: true
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    // Load settings from localStorage on initialization
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        return { ...defaultSettings, ...parsed };
      } catch (error) {
        console.error('Error loading settings:', error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  });
  const { toast } = useToast();

  // Apply dark mode when settings change
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
    
    toast({
      title: "Configurações atualizadas",
      description: "Suas preferências foram salvas com sucesso"
    });
  };

  const updateNotificationSettings = (notificationSettings: Partial<NotificationSettings>) => {
    const updatedNotifications = { ...settings.notifications, ...notificationSettings };
    updateSettings({ notifications: updatedNotifications });
  };

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const setLanguage = (language: string) => {
    updateSettings({ language });
  };

  const exportUserData = async () => {
    try {
      // Simulate data export
      const userData = {
        settings,
        exportDate: new Date().toISOString(),
        profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
        progress: JSON.parse(localStorage.getItem('userProgress') || '{}')
      };

      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `closerUP-dados-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Dados exportados",
        description: "Seus dados foram baixados com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar seus dados",
        variant: "destructive"
      });
    }
  };

  const clearCache = () => {
    try {
      // Clear specific cache items but keep important user data
      const keysToKeep = ['userSettings', 'userProfile', 'auth.token'];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!keysToKeep.some(keepKey => key.includes(keepKey))) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear session storage
      sessionStorage.clear();
      
      toast({
        title: "Cache limpo",
        description: "Cache do aplicativo foi limpo com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro ao limpar cache",
        description: "Não foi possível limpar o cache",
        variant: "destructive"
      });
    }
  };

  return {
    settings,
    updateSettings,
    updateNotificationSettings,
    toggleDarkMode,
    setLanguage,
    exportUserData,
    clearCache
  };
};
