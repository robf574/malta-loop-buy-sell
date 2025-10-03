import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Users, Plus } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  venue_name: string;
  locality: string;
  date_start: string;
  rsvp_count: number;
  capacity: number | null;
  cover_image_url: string | null;
}

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "Upcoming")
        .gte("date_start", new Date().toISOString())
        .order("date_start", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Community Events</h1>
          <p className="text-muted-foreground">Discover local sales and meetups</p>
        </div>

        {/* Create Button */}
        <Button className="w-full" onClick={() => navigate("/events/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Host an Event
        </Button>

        {/* Events List */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No upcoming events. Be the first to host one!
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
              <Card 
                key={event.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-smooth"
              >
                {event.cover_image_url && (
                  <div className="aspect-[16/9] bg-muted">
                    <img
                      src={event.cover_image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(new Date(event.date_start), "PPP 'at' p")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue_name}, {event.locality}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.rsvp_count} attending
                      {event.capacity && ` / ${event.capacity} capacity`}
                    </span>
                  </div>
                  <Button className="w-full mt-4">
                    RSVP to Event
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
