import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Facebook } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            auth_provider: "email",
          },
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;

      toast.success("Account created! Please check your email to verify.");
      navigate("/onboarding");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Facebook");
    }
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Malta Landscape Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-blue-400 to-blue-600">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-300 to-blue-500"></div>
          
          {/* Clouds */}
          <div className="absolute top-10 left-10 w-32 h-16 bg-white/30 rounded-full blur-sm"></div>
          <div className="absolute top-20 right-20 w-24 h-12 bg-white/25 rounded-full blur-sm"></div>
          <div className="absolute top-16 left-1/3 w-20 h-10 bg-white/20 rounded-full blur-sm"></div>
          
          {/* Headland/Rock Formation */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600">
            {/* Rock formations */}
            <div className="absolute bottom-0 left-1/4 w-32 h-40 bg-gradient-to-t from-stone-700 to-stone-600 rounded-t-full transform -skew-x-12"></div>
            <div className="absolute bottom-0 right-1/3 w-24 h-32 bg-gradient-to-t from-stone-800 to-stone-700 rounded-t-full transform skew-x-12"></div>
            <div className="absolute bottom-0 left-1/2 w-20 h-28 bg-gradient-to-t from-stone-600 to-stone-500 rounded-t-full transform -skew-x-6"></div>
            
            {/* Sea waves */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400">
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-blue-700 to-blue-600 rounded-t-full"></div>
            </div>
            
            {/* Additional rock details */}
            <div className="absolute bottom-8 left-1/6 w-16 h-20 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-full transform -skew-x-6"></div>
            <div className="absolute bottom-12 right-1/4 w-12 h-16 bg-gradient-to-t from-stone-900 to-stone-800 rounded-t-full transform skew-x-8"></div>
          </div>
          
          {/* Sea reflection */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-800 via-blue-700 to-blue-600 opacity-80"></div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mela Malta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Welcome to Malta's beautiful marketplace
            </CardDescription>
          </CardHeader>

          <CardContent>
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

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleFacebookLogin}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Continue with Facebook
                </Button>
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

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleFacebookLogin}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Continue with Facebook
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
