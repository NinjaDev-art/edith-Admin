export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_stats: {
        Row: {
          avg_cost_per_point: number
          created_at: string
          date: string
          free_usage: number
          id: number
          power_pro_usage: number
          pro_usage: number
          total_points: number
          user_count: number
        }
        Insert: {
          avg_cost_per_point?: number
          created_at?: string
          date: string
          free_usage?: number
          id?: number
          power_pro_usage?: number
          pro_usage?: number
          total_points?: number
          user_count?: number
        }
        Update: {
          avg_cost_per_point?: number
          created_at?: string
          date?: string
          free_usage?: number
          id?: number
          power_pro_usage?: number
          pro_usage?: number
          total_points?: number
          user_count?: number
        }
        Relationships: []
      }
      models: {
        Row: {
          created_at: string
          daily_change: number
          enabled: boolean
          estimated_usd: number
          id: number
          input_cost: number
          multiplier: number
          name: string
          output_cost: number
          point_burn: number
          updated_at: string
          usage: number
        }
        Insert: {
          created_at?: string
          daily_change?: number
          enabled?: boolean
          estimated_usd: number
          id?: number
          input_cost: number
          multiplier: number
          name: string
          output_cost: number
          point_burn: number
          updated_at?: string
          usage?: number
        }
        Update: {
          created_at?: string
          daily_change?: number
          enabled?: boolean
          estimated_usd?: number
          id?: number
          input_cost?: number
          multiplier?: number
          name?: string
          output_cost?: number
          point_burn?: number
          updated_at?: string
          usage?: number
        }
        Relationships: []
      }
      monthly_revenue: {
        Row: {
          cost: number
          created_at: string
          id: number
          margin: number
          month: string
          profit: number
          revenue: number
        }
        Insert: {
          cost?: number
          created_at?: string
          id?: number
          margin?: number
          month: string
          profit?: number
          revenue?: number
        }
        Update: {
          cost?: number
          created_at?: string
          id?: number
          margin?: number
          month?: string
          profit?: number
          revenue?: number
        }
        Relationships: []
      }
      plans: {
        Row: {
          avg_cost: number
          created_at: string
          id: number
          name: string
          points_per_month: number
          price: number
          profit: number
          retention: number
          revenue: number
          target_segment: string
          updated_at: string
          usage_logic: string
          user_count: number
        }
        Insert: {
          avg_cost?: number
          created_at?: string
          id?: number
          name: string
          points_per_month: number
          price: number
          profit?: number
          retention?: number
          revenue?: number
          target_segment: string
          updated_at?: string
          usage_logic: string
          user_count?: number
        }
        Update: {
          avg_cost?: number
          created_at?: string
          id?: number
          name?: string
          points_per_month?: number
          price?: number
          profit?: number
          retention?: number
          revenue?: number
          target_segment?: string
          updated_at?: string
          usage_logic?: string
          user_count?: number
        }
        Relationships: []
      }
      usage_logs: {
        Row: {
          cost: number
          date: string
          id: number
          model_id: number | null
          points_consumed: number
          user_id: string | null
        }
        Insert: {
          cost: number
          date?: string
          id?: number
          model_id?: number | null
          points_consumed: number
          user_id?: string | null
        }
        Update: {
          cost?: number
          date?: string
          id?: number
          model_id?: number | null
          points_consumed?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_logs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["admin_role"]
        }
        Insert: {
          id: string
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          favorite_model: string | null
          id: string
          join_date: string
          name: string | null
          percentage_used: number
          plan_id: number | null
          points_used: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          favorite_model?: string | null
          id: string
          join_date?: string
          name?: string | null
          percentage_used?: number
          plan_id?: number | null
          points_used?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          favorite_model?: string | null
          id?: string
          join_date?: string
          name?: string | null
          percentage_used?: number
          plan_id?: number | null
          points_used?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["admin", "user"],
    },
  },
} as const
