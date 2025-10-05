import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useRequireAuth } from "@/hooks/useAuth";
import { LoadingCard } from "@/components/ui/LoadingStates";

export default function Inbox() {
  const { loading } = useRequireAuth();

  if (loading) {
    return (
      <AppLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <LoadingCard />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No messages yet</p>
            <p className="text-sm mt-1">Start a conversation from a listing</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
