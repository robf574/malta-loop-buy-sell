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

// Google icon component
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
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

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Realistic Valletta Malta Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-orange-100">
          {/* Warm sky with realistic clouds */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-orange-50 to-yellow-100"></div>
          
          {/* Realistic fluffy clouds */}
          <div className="absolute top-12 left-16 w-32 h-20 bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-full opacity-90 shadow-lg"></div>
          <div className="absolute top-20 right-20 w-28 h-16 bg-gradient-to-bl from-white via-orange-50 to-orange-100 rounded-full opacity-85 shadow-lg"></div>
          <div className="absolute top-16 left-1/2 w-24 h-14 bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-full opacity-80 shadow-lg"></div>
          <div className="absolute top-8 right-1/3 w-20 h-12 bg-gradient-to-bl from-white via-orange-50 to-orange-100 rounded-full opacity-75 shadow-lg"></div>
          
          {/* Valletta Cityscape - Golden limestone buildings */}
          <div className="absolute bottom-0 left-0 w-full h-2/3">
            {/* Main city buildings - tiered like Valletta */}
            <div className="absolute bottom-0 left-0 w-full h-full">
              {/* Lower tier buildings */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600">
                {/* Building facades with windows */}
                <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-t from-amber-900 to-amber-700">
                  <div className="absolute top-4 left-2 w-2 h-3 bg-amber-800 rounded-sm"></div>
                  <div className="absolute top-4 left-5 w-2 h-3 bg-amber-800 rounded-sm"></div>
                  <div className="absolute top-8 left-2 w-2 h-3 bg-amber-800 rounded-sm"></div>
                  <div className="absolute top-8 left-5 w-2 h-3 bg-amber-800 rounded-sm"></div>
                </div>
                <div className="absolute bottom-0 left-1/4 w-1/4 h-full bg-gradient-to-t from-amber-800 to-amber-600">
                  <div className="absolute top-3 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-3 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-7 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-7 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 w-1/4 h-full bg-gradient-to-t from-amber-700 to-amber-500">
                  <div className="absolute top-2 left-2 w-2 h-3 bg-amber-600 rounded-sm"></div>
                  <div className="absolute top-2 left-5 w-2 h-3 bg-amber-600 rounded-sm"></div>
                  <div className="absolute top-6 left-2 w-2 h-3 bg-amber-600 rounded-sm"></div>
                  <div className="absolute top-6 left-5 w-2 h-3 bg-amber-600 rounded-sm"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-to-t from-amber-800 to-amber-600">
                  <div className="absolute top-4 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-4 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-8 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-8 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                </div>
              </div>
              
              {/* Middle tier buildings */}
              <div className="absolute bottom-1/3 left-0 w-full h-1/3 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500">
                <div className="absolute bottom-0 left-1/6 w-1/5 h-full bg-gradient-to-t from-amber-800 to-amber-600">
                  <div className="absolute top-3 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-3 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-7 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-7 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                </div>
                <div className="absolute bottom-0 right-1/6 w-1/5 h-full bg-gradient-to-t from-amber-800 to-amber-600">
                  <div className="absolute top-2 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-2 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-6 left-2 w-2 h-3 bg-amber-700 rounded-sm"></div>
                  <div className="absolute top-6 left-5 w-2 h-3 bg-amber-700 rounded-sm"></div>
                </div>
              </div>
              
              {/* Upper tier with iconic dome and spire */}
              <div className="absolute bottom-2/3 left-0 w-full h-1/3 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400">
                {/* St. Paul's Pro-Cathedral Dome */}
                <div className="absolute bottom-0 left-1/3 w-1/6 h-full">
                  <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-lg">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-amber-600 rounded-sm"></div>
                    <div className="absolute top-2 left-5 w-2 h-2 bg-amber-600 rounded-sm"></div>
                  </div>
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
                
                {/* Bell Tower/Spire */}
                <div className="absolute bottom-0 right-1/3 w-1/12 h-full">
                  <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-lg">
                    <div className="absolute top-2 left-1 w-1 h-2 bg-amber-600 rounded-sm"></div>
                    <div className="absolute top-4 left-1 w-1 h-2 bg-amber-600 rounded-sm"></div>
                  </div>
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3 h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-t-full shadow-lg"></div>
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mediterranean Sea */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-blue-700 via-blue-500 to-blue-400">
            {/* Realistic wave patterns */}
            <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-t from-blue-800 to-blue-600 rounded-t-full"></div>
            <div className="absolute bottom-2 left-0 w-full h-2 bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-full"></div>
            <div className="absolute bottom-4 left-0 w-full h-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-full"></div>
            
            {/* Sailboat in foreground */}
            <div className="absolute bottom-8 left-1/3 w-8 h-6 bg-gradient-to-b from-white to-blue-100 rounded-t-lg shadow-lg">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-amber-600"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-r from-white to-blue-50 rounded-sm"></div>
            </div>
            
            {/* Additional small boats */}
            <div className="absolute bottom-6 right-1/4 w-4 h-3 bg-gradient-to-b from-white to-blue-100 rounded-t-md shadow-md">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-amber-600"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gradient-to-r from-white to-blue-50 rounded-sm"></div>
            </div>
          </div>
        </div>
        
        <Card className="w-full max-w-md relative z-10 bg-white shadow-2xl border-2 border-white">
          <CardHeader className="text-center bg-gradient-to-b from-blue-50 to-white">
            <CardTitle className="text-4xl font-black text-amber-800 tracking-wide">
              MELA MALTA
            </CardTitle>
            <CardDescription className="text-amber-600 font-medium text-lg">
              Valletta's Beautiful Marketplace
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

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    <GoogleIcon />
                    <span className="ml-2">Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleFacebookLogin}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
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

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    <GoogleIcon />
                    <span className="ml-2">Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleFacebookLogin}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
