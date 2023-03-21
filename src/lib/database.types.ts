export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _sqlx_migrations: {
        Row: {
          checksum: string
          description: string
          execution_time: number
          installed_on: string
          success: boolean
          version: number
        }
        Insert: {
          checksum: string
          description: string
          execution_time: number
          installed_on?: string
          success: boolean
          version: number
        }
        Update: {
          checksum?: string
          description?: string
          execution_time?: number
          installed_on?: string
          success?: boolean
          version?: number
        }
      }
      addon_login_sessions: {
        Row: {
          access_token: string | null
          code: string
          denied: boolean | null
          end_time: string | null
          id: string
          refresh_token: string | null
          start_time: string | null
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          code: string
          denied?: boolean | null
          end_time?: string | null
          id: string
          refresh_token?: string | null
          start_time?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          code?: string
          denied?: boolean | null
          end_time?: string | null
          id?: string
          refresh_token?: string | null
          start_time?: string | null
          user_id?: string | null
        }
      }
      customers: {
        Row: {
          balance: number
          id: string
          user_id: string
        }
        Insert: {
          balance?: number
          id: string
          user_id: string
        }
        Update: {
          balance?: number
          id?: string
          user_id?: string
        }
      }
      files: {
        Row: {
          id: string
          name: string
          user_id: string
          version: number
        }
        Insert: {
          id: string
          name: string
          user_id: string
          version: number
        }
        Update: {
          id?: string
          name?: string
          user_id?: string
          version?: number
        }
      }
      frames: {
        Row: {
          cost_billed: number | null
          end_time: string | null
          frame: number
          progress: number
          render_id: string
          start_time: string | null
          status: Database["public"]["Enums"]["render_status"]
          total_slices: number
          user_id: string
        }
        Insert: {
          cost_billed?: number | null
          end_time?: string | null
          frame: number
          progress?: number
          render_id: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["render_status"]
          total_slices: number
          user_id: string
        }
        Update: {
          cost_billed?: number | null
          end_time?: string | null
          frame?: number
          progress?: number
          render_id?: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["render_status"]
          total_slices?: number
          user_id?: string
        }
      }
      jobs: {
        Row: {
          cost_billed: number | null
          end_time: string | null
          frame: number
          progress: number
          render_id: string
          slice: number
          start_time: string | null
          status: Database["public"]["Enums"]["render_status"]
          user_id: string
        }
        Insert: {
          cost_billed?: number | null
          end_time?: string | null
          frame: number
          progress?: number
          render_id: string
          slice: number
          start_time?: string | null
          status?: Database["public"]["Enums"]["render_status"]
          user_id: string
        }
        Update: {
          cost_billed?: number | null
          end_time?: string | null
          frame?: number
          progress?: number
          render_id?: string
          slice?: number
          start_time?: string | null
          status?: Database["public"]["Enums"]["render_status"]
          user_id?: string
        }
      }
      onboarding: {
        Row: {
          addon: boolean
          card: boolean
          user_id: string
        }
        Insert: {
          addon?: boolean
          card?: boolean
          user_id: string
        }
        Update: {
          addon?: boolean
          card?: boolean
          user_id?: string
        }
      }
      renders: {
        Row: {
          animation: boolean
          cost_billed: number | null
          end_time: string | null
          file_id: string
          file_name: string
          file_version: number
          frame_end: number
          frame_start: number
          id: string
          progress: number
          requested_time: string
          settings: Json
          slices: number
          start_time: string | null
          status: Database["public"]["Enums"]["render_status"]
          step: number
          user_id: string
        }
        Insert: {
          animation: boolean
          cost_billed?: number | null
          end_time?: string | null
          file_id: string
          file_name: string
          file_version: number
          frame_end: number
          frame_start: number
          id: string
          progress?: number
          requested_time: string
          settings: Json
          slices: number
          start_time?: string | null
          status?: Database["public"]["Enums"]["render_status"]
          step: number
          user_id: string
        }
        Update: {
          animation?: boolean
          cost_billed?: number | null
          end_time?: string | null
          file_id?: string
          file_name?: string
          file_version?: number
          frame_end?: number
          frame_start?: number
          id?: string
          progress?: number
          requested_time?: string
          settings?: Json
          slices?: number
          start_time?: string | null
          status?: Database["public"]["Enums"]["render_status"]
          step?: number
          user_id?: string
        }
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          subscription_item: string
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          subscription_item: string
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          subscription_item?: string
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          customer_id: string | null
          email: string
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          customer_id?: string | null
          email: string
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          customer_id?: string | null
          email?: string
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      daily_billing: {
        Args: {
          date_from: string
          date_to: string
        }
        Returns: {
          user_id: string
          date: string
          cost_billed: number
        }[]
      }
      insert_frames: {
        Args: {
          user_id: string
          render_id: string
          frame_start: number
          frame_end: number
          step: number
          total_slices: number
        }
        Returns: undefined
      }
      insert_jobs: {
        Args: {
          user_id: string
          render_id: string
          frame_start: number
          frame_end: number
          step: number
          total_slices: number
        }
        Returns: undefined
      }
    }
    Enums: {
      render_status: "pending" | "running" | "complete" | "failed" | "canceled"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
