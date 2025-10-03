export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      event_rsvps: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address: string
          capacity: number | null
          cover_image_url: string | null
          created_at: string
          date_end: string
          date_start: string
          description: string
          host_user_id: string
          id: string
          lat: number | null
          lng: number | null
          locality: string
          rsvp_count: number
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
          venue_name: string
        }
        Insert: {
          address: string
          capacity?: number | null
          cover_image_url?: string | null
          created_at?: string
          date_end: string
          date_start: string
          description: string
          host_user_id: string
          id?: string
          lat?: number | null
          lng?: number | null
          locality: string
          rsvp_count?: number
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
          venue_name: string
        }
        Update: {
          address?: string
          capacity?: number | null
          cover_image_url?: string | null
          created_at?: string
          date_end?: string
          date_start?: string
          description?: string
          host_user_id?: string
          id?: string
          lat?: number | null
          lng?: number | null
          locality?: string
          rsvp_count?: number
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
          venue_name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      item_listings: {
        Row: {
          allow_offer: boolean
          category: Database["public"]["Enums"]["listing_category"]
          condition: Database["public"]["Enums"]["item_condition"]
          created_at: string
          description: string
          favorites_count: number
          id: string
          images: string[]
          locality: string
          location_text: string | null
          price_eur: number
          school_id: string | null
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          allow_offer?: boolean
          category: Database["public"]["Enums"]["listing_category"]
          condition: Database["public"]["Enums"]["item_condition"]
          created_at?: string
          description: string
          favorites_count?: number
          id?: string
          images?: string[]
          locality: string
          location_text?: string | null
          price_eur: number
          school_id?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          allow_offer?: boolean
          category?: Database["public"]["Enums"]["listing_category"]
          condition?: Database["public"]["Enums"]["item_condition"]
          created_at?: string
          description?: string
          favorites_count?: number
          id?: string
          images?: string[]
          locality?: string
          location_text?: string | null
          price_eur?: number
          school_id?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_listings_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      message_threads: {
        Row: {
          created_at: string
          id: string
          item_id: string | null
          participant_ids: string[]
          updated_at: string
          wanted_ad_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_id?: string | null
          participant_ids: string[]
          updated_at?: string
          wanted_ad_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string | null
          participant_ids?: string[]
          updated_at?: string
          wanted_ad_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_threads_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "item_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_threads_wanted_ad_id_fkey"
            columns: ["wanted_ad_id"]
            isOneToOne: false
            referencedRelation: "wanted_ads"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          image_url: string | null
          seen_by: string[]
          sender_id: string
          thread_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          image_url?: string | null
          seen_by?: string[]
          sender_id: string
          thread_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          image_url?: string | null
          seen_by?: string[]
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_provider: Database["public"]["Enums"]["auth_provider"]
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          is_verified: boolean
          localities: string[]
          name: string
          phone: string | null
          school_ids: string[] | null
          updated_at: string
          username: string
        }
        Insert: {
          auth_provider?: Database["public"]["Enums"]["auth_provider"]
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          is_verified?: boolean
          localities?: string[]
          name: string
          phone?: string | null
          school_ids?: string[] | null
          updated_at?: string
          username: string
        }
        Update: {
          auth_provider?: Database["public"]["Enums"]["auth_provider"]
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          is_verified?: boolean
          localities?: string[]
          name?: string
          phone?: string | null
          school_ids?: string[] | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_id: string
          resolved_at: string | null
          resolved_by: string | null
          status: Database["public"]["Enums"]["report_status"]
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          reason?: Database["public"]["Enums"]["report_reason"]
          reporter_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_id?: string
          target_type?: Database["public"]["Enums"]["report_target_type"]
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          city: string
          created_at: string
          houses: string[] | null
          id: string
          name: string
          uniforms_notes: string | null
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          houses?: string[] | null
          id?: string
          name: string
          uniforms_notes?: string | null
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          houses?: string[] | null
          id?: string
          name?: string
          uniforms_notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wanted_ads: {
        Row: {
          budget_eur: number | null
          category: Database["public"]["Enums"]["listing_category"]
          created_at: string
          description: string
          id: string
          locality: string
          school_id: string | null
          status: Database["public"]["Enums"]["wanted_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_eur?: number | null
          category: Database["public"]["Enums"]["listing_category"]
          created_at?: string
          description: string
          id?: string
          locality: string
          school_id?: string | null
          status?: Database["public"]["Enums"]["wanted_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_eur?: number | null
          category?: Database["public"]["Enums"]["listing_category"]
          created_at?: string
          description?: string
          id?: string
          locality?: string
          school_id?: string | null
          status?: Database["public"]["Enums"]["wanted_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wanted_ads_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "moderator" | "admin"
      auth_provider: "email" | "facebook" | "google" | "apple"
      event_status: "Upcoming" | "Past" | "Cancelled"
      item_condition: "New" | "Like New" | "Good" | "Fair"
      listing_category: "Clothing" | "Uniform" | "Kids" | "Home" | "Other"
      listing_status: "Active" | "Reserved" | "Sold" | "Hidden" | "Deleted"
      report_reason: "Counterfeit" | "Inappropriate" | "Spam" | "Other"
      report_status: "Open" | "Actioned" | "Dismissed"
      report_target_type: "item" | "wanted" | "event" | "user" | "message"
      wanted_status: "Active" | "Fulfilled" | "Hidden" | "Deleted"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "moderator", "admin"],
      auth_provider: ["email", "facebook", "google", "apple"],
      event_status: ["Upcoming", "Past", "Cancelled"],
      item_condition: ["New", "Like New", "Good", "Fair"],
      listing_category: ["Clothing", "Uniform", "Kids", "Home", "Other"],
      listing_status: ["Active", "Reserved", "Sold", "Hidden", "Deleted"],
      report_reason: ["Counterfeit", "Inappropriate", "Spam", "Other"],
      report_status: ["Open", "Actioned", "Dismissed"],
      report_target_type: ["item", "wanted", "event", "user", "message"],
      wanted_status: ["Active", "Fulfilled", "Hidden", "Deleted"],
    },
  },
} as const
