import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useRedirectIfAuthenticated } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { VallettaBackground } from "@/components/auth/VallettaBackground";

export default function Auth() {
  const { signUp, signIn, signInWithGoogle, signInWithFacebook } = useAuth();
  const { loading } = useRedirectIfAuthenticated();
  const [formLoading, setFormLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await signUp(email, password, name);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setFormLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setFormLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setFormLoading(true);
    try {
      await signInWithFacebook();
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout showNav={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <VallettaBackground />
        
        <AuthCard>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={formLoading}>
                  {formLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <SocialLoginButtons
                onGoogleLogin={handleGoogleLogin}
                onFacebookLogin={handleFacebookLogin}
                loading={formLoading}
              />
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={formLoading}>
                  {formLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <SocialLoginButtons
                onGoogleLogin={handleGoogleLogin}
                onFacebookLogin={handleFacebookLogin}
                loading={formLoading}
              />
            </TabsContent>
          </Tabs>
        </AuthCard>
      </div>
    </AppLayout>
  );
}