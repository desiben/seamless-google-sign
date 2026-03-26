import { useState } from "react";
import { GoogleUser, signInWithGoogle, signOutGoogle } from "@/lib/google-auth";
import LoginScreen from "@/components/LoginScreen";
import HomeScreen from "@/components/HomeScreen";

const Index = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      setUser(result);
    } catch (err: any) {
      setError(err?.message || "Sign-in failed. Please try again.");
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutGoogle();
      setUser(null);
    } catch (err) {
      console.error("Sign-out error:", err);
      setUser(null);
    }
  };

  if (user) {
    return <HomeScreen user={user} onSignOut={handleSignOut} />;
  }

  return (
    <LoginScreen
      onGoogleSignIn={handleGoogleSignIn}
      loading={loading}
      error={error}
    />
  );
};

export default Index;
