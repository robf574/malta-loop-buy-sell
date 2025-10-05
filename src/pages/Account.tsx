import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, Package, Heart, Calendar, Star } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useRequireAuth } from "@/hooks/useAuth";
import { Profile } from "@/types";
import { LoadingProfile, LoadingCard } from "@/components/ui/LoadingStates";
import { SectionHeader, CardHeader } from "@/components/ui/Headers";

export default function Account() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { loading } = useRequireAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      refreshProfile();
    }
  }, [user, refreshProfile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      // Error handling is done in the context
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-6">
          <LoadingProfile />
          <LoadingCard />
        </div>
      </AppLayout>
    );
  }

  if (!user || !profile) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-muted-foreground">Unable to load profile</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <SectionHeader title="Account" />

        {/* Profile Header */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-lg">
                  {profile.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{profile.username || "User"}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{profile.locality}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              My Events
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Star className="mr-2 h-4 w-4" />
              Reviews
            </Button>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}