import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { supabase } from '@/integrations/supabase/client';

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
 */
export function initGoogleAuth() {
  GoogleAuth.initialize({
    clientId: '614452950315-0l85p6q2ungg47er37bv70ui44fuq1rg.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  });
}

/**
 * Sign in using the native Google Auth plugin, then exchange the
 * Google ID token with Supabase so the session stays in-app
 * (no external browser window).
 */
export async function signInWithGoogle(): Promise<GoogleUser> {
  // 1. Native sign-in → returns Google profile + tokens
  const googleUser = await GoogleAuth.signIn();

  // 2. Exchange the Google ID token with Supabase Auth
  const idToken = (googleUser as any).authentication?.idToken;
  if (idToken) {
    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });
    if (error) {
      console.error('Supabase signInWithIdToken error:', error);
      throw error;
    }
  }

  return googleUser as unknown as GoogleUser;
}

export async function signOutGoogle(): Promise<void> {
  await GoogleAuth.signOut();
  await supabase.auth.signOut();
}

export async function refreshGoogleToken(): Promise<{ accessToken: string }> {
  const result = await GoogleAuth.refresh();
  return { accessToken: result.accessToken };
}
