import { LogOut, User, Mail, Shield } from "lucide-react";
import { GoogleUser } from "@/lib/google-auth";

interface HomeScreenProps {
  user: GoogleUser;
  onSignOut: () => void;
}

const HomeScreen = ({ user, onSignOut }: HomeScreenProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </header>

      {/* Profile Card */}
      <div className="flex-1 px-5 py-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
                className="h-16 w-16 rounded-full border-2 border-primary/20 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">Signed in with Google</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} />
            <InfoRow icon={<User className="h-4 w-4" />} label="Name" value={`${user.givenName} ${user.familyName}`} />
            <InfoRow icon={<Shield className="h-4 w-4" />} label="Google ID" value={user.id} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-4">
          <p className="text-center text-sm font-medium text-accent-foreground">
            ✅ Native Google Sign-In — no external browser opened!
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
    <span className="text-muted-foreground">{icon}</span>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default HomeScreen;
