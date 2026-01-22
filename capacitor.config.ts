import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.54dbadbc9db84e598a2599d80e82a02b',
  appName: 'Workout Quest',
  webDir: 'dist',
  server: {
    url: 'https://54dbadbc-9db8-4e59-8a25-99d80e82a02b.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#2d4a4a',
      sound: 'beep.wav',
    },
  },
};

export default config;
