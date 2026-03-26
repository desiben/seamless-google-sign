# Google Sign-In Native Test App

A test application to verify that Google Sign-In stays **within the app** (native dialog) and does not open an external browser window when wrapped in Capacitor.

## Purpose

This app exists to validate one thing: when packaged as a native mobile app using Capacitor, pressing "Continue with Google" triggers the **native Google Sign-In overlay** — not a redirect to an external browser.

## Tech Stack

- **React + TypeScript + Vite** — Frontend
- **Capacitor** — Native mobile wrapper (Android & iOS)
- **@codetrix-studio/capacitor-google-auth** — Native Google Sign-In plugin
- **Supabase** — Backend (auth & database)
- **Tailwind CSS + shadcn/ui** — Styling

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Google OAuth Credentials

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client IDs for:
   - **Web** (used in `capacitor.config.ts` and `src/lib/google-auth.ts`)
   - **Android** (using your app's package name and SHA-1 signing key)
   - **iOS** (add reversed client ID as URL scheme)

### 3. Run on web (for development)

```bash
npm run dev
```

### 4. Build & run on a device

```bash
npm run build
npx cap add android   # or: npx cap add ios
npx cap sync
npx cap run android   # or: npx cap run ios
```

> **Android** requires Android Studio. **iOS** requires a Mac with Xcode.

## Expected Behavior

| Platform | What should happen on "Continue with Google" |
|----------|----------------------------------------------|
| Web (browser) | Standard Google OAuth popup/redirect |
| Android (Capacitor) | Native Google Sign-In bottom sheet (in-app) |
| iOS (Capacitor) | Native Google Sign-In dialog (in-app) |

**If an external browser opens instead**, it means the native plugin is not configured correctly (missing SHA-1, wrong client ID, or `npx cap sync` was not run).

## Troubleshooting

- Run `npx cap sync` after every `git pull` or dependency change
- Ensure your SHA-1 fingerprint matches the one registered in Google Cloud Console
- For debug builds: `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android`

## License

MIT
