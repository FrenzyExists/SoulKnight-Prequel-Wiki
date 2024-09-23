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
      Armor: {
        Row: {
          id: number
          ideal_fatebound: number | null
          img: string | null
          main_fatebound: number | null
          name: string | null
          rarity: string | null
          secondary_fatebound: number
          type: string | null
        }
        Insert: {
          id?: number
          ideal_fatebound?: number | null
          img?: string | null
          main_fatebound?: number | null
          name?: string | null
          rarity?: string | null
          secondary_fatebound: number
          type?: string | null
        }
        Update: {
          id?: number
          ideal_fatebound?: number | null
          img?: string | null
          main_fatebound?: number | null
          name?: string | null
          rarity?: string | null
          secondary_fatebound?: number
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Armor_ideal_fatebound_fkey"
            columns: ["ideal_fatebound"]
            isOneToOne: false
            referencedRelation: "Fatebound"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Armor_main_fatebound_fkey"
            columns: ["main_fatebound"]
            isOneToOne: false
            referencedRelation: "Fatebound"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Armor_secondary_fatebound_fkey"
            columns: ["secondary_fatebound"]
            isOneToOne: false
            referencedRelation: "Fatebound"
            referencedColumns: ["id"]
          },
        ]
      }
      Boss: {
        Row: {
          description: string | null
          id: number
          img: string | null
          name: string | null
          spawn_end_time: string | null
          spawn_location: number | null
          spawn_start_time: string
        }
        Insert: {
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
          spawn_end_time?: string | null
          spawn_location?: number | null
          spawn_start_time: string
        }
        Update: {
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
          spawn_end_time?: string | null
          spawn_location?: number | null
          spawn_start_time?: string
        }
        Relationships: []
      }
      Class: {
        Row: {
          description: string | null
          id: number
          image: string
          main_first_stat: string | null
          main_secondary_stat: string | null
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          image: string
          main_first_stat?: string | null
          main_secondary_stat?: string | null
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          image?: string
          main_first_stat?: string | null
          main_secondary_stat?: string | null
          name?: string | null
        }
        Relationships: []
      }
      Fatebound: {
        Row: {
          "2_equip_pe": string | null
          "3_equip_pe": string | null
          description: string | null
          h_description: string | null
          id: number
          img: string | null
          name: string | null
        }
        Insert: {
          "2_equip_pe"?: string | null
          "3_equip_pe"?: string | null
          description?: string | null
          h_description?: string | null
          id?: number
          img?: string | null
          name?: string | null
        }
        Update: {
          "2_equip_pe"?: string | null
          "3_equip_pe"?: string | null
          description?: string | null
          h_description?: string | null
          id?: number
          img?: string | null
          name?: string | null
        }
        Relationships: []
      }
      Location: {
        Row: {
          description: string | null
          id: number
          img: string | null
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          img?: string | null
          name?: string | null
        }
        Relationships: []
      }
      Weapon: {
        Row: {
          id: number
          ideal_fatebound: number | null
          img: string | null
          main_fatebound: number | null
          name: string | null
          rarity: string | null
          secondary_fatebound: number | null
          type: string | null
        }
        Insert: {
          id?: number
          ideal_fatebound?: number | null
          img?: string | null
          main_fatebound?: number | null
          name?: string | null
          rarity?: string | null
          secondary_fatebound?: number | null
          type?: string | null
        }
        Update: {
          id?: number
          ideal_fatebound?: number | null
          img?: string | null
          main_fatebound?: number | null
          name?: string | null
          rarity?: string | null
          secondary_fatebound?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Weapon_ideal_fatebound_fkey"
            columns: ["ideal_fatebound"]
            isOneToOne: false
            referencedRelation: "Fatebound"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Weapon_main_fatebound_fkey"
            columns: ["main_fatebound"]
            isOneToOne: false
            referencedRelation: "Fatebound"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Weapon_secondary_fatebound_fkey"
            columns: ["secondary_fatebound"]
            isOneToOne: false
            referencedRelation: "Fatebound"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
