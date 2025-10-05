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
        {/* Vintage Travel Poster Style Malta Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-400">
          {/* Sky with flat color blocks */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-300 to-orange-200"></div>
          
          {/* Stylized clouds - flat, geometric shapes */}
          <div className="absolute top-16 left-16 w-24 h-12 bg-white rounded-full"></div>
          <div className="absolute top-20 right-24 w-20 h-8 bg-white rounded-full"></div>
          <div className="absolute top-12 left-1/2 w-16 h-6 bg-white rounded-full"></div>
          
          {/* Distant headland/cliffs - flat color blocks */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-600 via-green-500 to-green-400">
            {/* Rolling hills silhouette */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-1/3 h-full bg-green-700 rounded-t-full transform -skew-x-12"></div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600 rounded-t-full transform skew-x-8"></div>
              <div className="absolute top-0 left-1/3 w-1/4 h-full bg-green-500 rounded-t-full"></div>
            </div>
            
            {/* White buildings on headland */}
            <div className="absolute top-4 left-1/4 w-8 h-6 bg-white rounded-sm"></div>
            <div className="absolute top-6 left-1/3 w-6 h-4 bg-white rounded-sm"></div>
            <div className="absolute top-3 right-1/3 w-10 h-5 bg-white rounded-sm"></div>
            <div className="absolute top-5 right-1/4 w-7 h-4 bg-white rounded-sm"></div>
          </div>
          
          {/* Sea - flat, calm blue */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400">
            {/* Gentle wave lines */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-300"></div>
            <div className="absolute bottom-2 left-0 w-full h-1 bg-blue-200"></div>
          </div>
          
          {/* Beach - warm sandy color */}
          <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-amber-200 via-yellow-100 to-yellow-50">
            {/* Beach curves */}
            <div className="absolute bottom-0 left-0 w-2/3 h-full bg-gradient-to-r from-amber-300 to-yellow-100 rounded-tr-full"></div>
          </div>
          
          {/* Small boats on beach */}
          <div className="absolute bottom-4 left-1/4 w-6 h-3 bg-stone-800 rounded-sm"></div>
          <div className="absolute bottom-6 right-1/3 w-4 h-2 bg-stone-700 rounded-sm"></div>
          
          {/* Buoys/floats in water */}
          <div className="absolute bottom-8 left-1/3 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-6 left-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>
        
        <Card className="w-full max-w-md relative z-10 bg-white shadow-2xl border-2 border-white">
          <CardHeader className="text-center bg-gradient-to-b from-blue-50 to-white">
            <CardTitle className="text-4xl font-black text-blue-800 tracking-wide">
              MELA MALTA
            </CardTitle>
            <CardDescription className="text-blue-600 font-medium text-lg">
              Malta's Beautiful Marketplace
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
