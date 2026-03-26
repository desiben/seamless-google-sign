import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

export interface GoogleUser {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  imageUrl: string;
  name: string;
}

/**
 * Initialize Google Auth plugin.
 * Call this once on app startup (e.g., in main.tsx or App.tsx).
 * 
 * IMPORTANT: Replace the clientId below with your own Google OAuth Client ID
 * from the Google Cloud Console (https://console.cloud.google.com/apis/credentials).
 * 
 * You need:
 * - A Web client ID (for web/PWA)
 * - An Android client ID (for Android builds)
 * - An iOS client ID (for iOS builds, also set in capacitor.config.ts)
 */
export function initGoogleAuth() {
  GoogleAuth.initialize({
    clientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  });
}

export async function signInWithGoogle(): Promise<GoogleUser> {
  const result = await GoogleAuth.signIn();
  return result as unknown as GoogleUser;
}

export async function signOutGoogle(): Promise<void> {
  await GoogleAuth.signOut();
}

export async function refreshGoogleToken(): Promise<{ accessToken: string }> {
  const result = await GoogleAuth.refresh();
  return { accessToken: result.accessToken };
}
