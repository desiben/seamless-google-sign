import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.def67291340f4e498c7fe608c6ade72d',
  appName: 'Google Auth Demo',
  webDir: 'dist',
  server: {
    url: 'https://def67291-340f-4e49-8c7f-e608c6ade72d.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // Replace with your actual Web Client ID from Google Cloud Console
      serverClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
      // For iOS, also set the iOS Client ID
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
