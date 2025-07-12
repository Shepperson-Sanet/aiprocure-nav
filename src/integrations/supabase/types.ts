export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          anomaly_description: string | null
          anomaly_detected: boolean | null
          created_at: string | null
          id: string
          module: string | null
          record_id: string | null
          reviewed: boolean | null
          table_name: string | null
        }
        Insert: {
          anomaly_description?: string | null
          anomaly_detected?: boolean | null
          created_at?: string | null
          id?: string
          module?: string | null
          record_id?: string | null
          reviewed?: boolean | null
          table_name?: string | null
        }
        Update: {
          anomaly_description?: string | null
          anomaly_detected?: boolean | null
          created_at?: string | null
          id?: string
          module?: string | null
          record_id?: string | null
          reviewed?: boolean | null
          table_name?: string | null
        }
        Relationships: []
      }
      audit_registrations: {
        Row: {
          assigned_module: string | null
          auditor_name: string
          created_at: string | null
          email: string
          firm_name: string | null
          id: string
          phone_number: string | null
        }
        Insert: {
          assigned_module?: string | null
          auditor_name: string
          created_at?: string | null
          email: string
          firm_name?: string | null
          id?: string
          phone_number?: string | null
        }
        Update: {
          assigned_module?: string | null
          auditor_name?: string
          created_at?: string | null
          email?: string
          firm_name?: string | null
          id?: string
          phone_number?: string | null
        }
        Relationships: []
      }
      contract_versions: {
        Row: {
          contract_id: string | null
          draft_text: string | null
          id: string
          submitted_at: string | null
          submitted_by: string | null
          version_number: number | null
        }
        Insert: {
          contract_id?: string | null
          draft_text?: string | null
          id?: string
          submitted_at?: string | null
          submitted_by?: string | null
          version_number?: number | null
        }
        Update: {
          contract_id?: string | null
          draft_text?: string | null
          id?: string
          submitted_at?: string | null
          submitted_by?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_versions_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          contract_text: string | null
          contract_url: string | null
          created_at: string | null
          id: string
          rfx_id: string | null
          signed: boolean | null
          signed_at: string | null
          vendor_id: string | null
        }
        Insert: {
          contract_text?: string | null
          contract_url?: string | null
          created_at?: string | null
          id?: string
          rfx_id?: string | null
          signed?: boolean | null
          signed_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          contract_text?: string | null
          contract_url?: string | null
          created_at?: string | null
          id?: string
          rfx_id?: string | null
          signed?: boolean | null
          signed_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      define_search_parameters: {
        Row: {
          business_unit: string
          created_at: string | null
          end_date: string | null
          estimated_budget: number | null
          id: string
          notes: string | null
          product_spec: string | null
          quantity: number | null
          request_title: string
          requestor_id: string | null
          search_keywords: string[] | null
          start_date: string | null
          status: string | null
          target_incoterm: string | null
          target_suppliers: string[] | null
          updated_at: string | null
        }
        Insert: {
          business_unit: string
          created_at?: string | null
          end_date?: string | null
          estimated_budget?: number | null
          id?: string
          notes?: string | null
          product_spec?: string | null
          quantity?: number | null
          request_title: string
          requestor_id?: string | null
          search_keywords?: string[] | null
          start_date?: string | null
          status?: string | null
          target_incoterm?: string | null
          target_suppliers?: string[] | null
          updated_at?: string | null
        }
        Update: {
          business_unit?: string
          created_at?: string | null
          end_date?: string | null
          estimated_budget?: number | null
          id?: string
          notes?: string | null
          product_spec?: string | null
          quantity?: number | null
          request_title?: string
          requestor_id?: string | null
          search_keywords?: string[] | null
          start_date?: string | null
          status?: string | null
          target_incoterm?: string | null
          target_suppliers?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "define_search_parameters_requestor_id_fkey"
            columns: ["requestor_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      discovered_vendors: {
        Row: {
          ai_summary: string | null
          company_name: string | null
          contact_status: string | null
          created_at: string | null
          credibility_score: number | null
          email: string | null
          id: string
          origin_country: string | null
          product_title: string | null
          search_parameter_id: string | null
          shipping_term: string | null
          source_platform: string | null
          spec_match_score: number | null
          website: string | null
        }
        Insert: {
          ai_summary?: string | null
          company_name?: string | null
          contact_status?: string | null
          created_at?: string | null
          credibility_score?: number | null
          email?: string | null
          id?: string
          origin_country?: string | null
          product_title?: string | null
          search_parameter_id?: string | null
          shipping_term?: string | null
          source_platform?: string | null
          spec_match_score?: number | null
          website?: string | null
        }
        Update: {
          ai_summary?: string | null
          company_name?: string | null
          contact_status?: string | null
          created_at?: string | null
          credibility_score?: number | null
          email?: string | null
          id?: string
          origin_country?: string | null
          product_title?: string | null
          search_parameter_id?: string | null
          shipping_term?: string | null
          source_platform?: string | null
          spec_match_score?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discovered_vendors_search_parameter_id_fkey"
            columns: ["search_parameter_id"]
            isOneToOne: false
            referencedRelation: "define_search_parameters"
            referencedColumns: ["id"]
          },
        ]
      }
      document_requirements: {
        Row: {
          document_type: string | null
          id: string
          mandatory: boolean | null
          rfx_id: string | null
        }
        Insert: {
          document_type?: string | null
          id?: string
          mandatory?: boolean | null
          rfx_id?: string | null
        }
        Update: {
          document_type?: string | null
          id?: string
          mandatory?: boolean | null
          rfx_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_requirements_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
        ]
      }
      management_logins: {
        Row: {
          approval_limit: number | null
          created_at: string | null
          designation: string | null
          email: string
          full_name: string
          id: string
          last_login_at: string | null
          user_id: string | null
        }
        Insert: {
          approval_limit?: number | null
          created_at?: string | null
          designation?: string | null
          email: string
          full_name: string
          id?: string
          last_login_at?: string | null
          user_id?: string | null
        }
        Update: {
          approval_limit?: number | null
          created_at?: string | null
          designation?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      management_registrations: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          full_name: string
          id: string
          phone_number: string | null
          position: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          full_name: string
          id?: string
          phone_number?: string | null
          position?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          phone_number?: string | null
          position?: string | null
        }
        Relationships: []
      }
      rfx: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          keyword: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          keyword: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          keyword?: string
        }
        Relationships: []
      }
      rfx_bafo_rank: {
        Row: {
          ai_summary: string | null
          financial_score: number
          id: number
          rank: number | null
          rfx_id: string | null
          submitted_at: string | null
          technical_score: number
          total_score: number | null
          vendor_id: string | null
        }
        Insert: {
          ai_summary?: string | null
          financial_score: number
          id?: never
          rank?: number | null
          rfx_id?: string | null
          submitted_at?: string | null
          technical_score: number
          total_score?: number | null
          vendor_id?: string | null
        }
        Update: {
          ai_summary?: string | null
          financial_score?: number
          id?: never
          rank?: number | null
          rfx_id?: string | null
          submitted_at?: string | null
          technical_score?: number
          total_score?: number | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rfx_bafo_rank_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfx_bafo_rank_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfx_bafo_rank_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_bafo_submissions: {
        Row: {
          id: string
          price: number | null
          response_text: string | null
          rfx_id: string | null
          submitted_at: string | null
          vendor_id: string | null
        }
        Insert: {
          id?: string
          price?: number | null
          response_text?: string | null
          rfx_id?: string | null
          submitted_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          id?: string
          price?: number | null
          response_text?: string | null
          rfx_id?: string | null
          submitted_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rfx_bafo_submissions_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfx_bafo_submissions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_requests: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "rfx_requests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_responses: {
        Row: {
          id: string
          lead_time_days: number | null
          price: number | null
          proposal_url: string | null
          response_text: string | null
          rfx_id: string | null
          submitted_at: string | null
          vendor_id: string | null
        }
        Insert: {
          id?: string
          lead_time_days?: number | null
          price?: number | null
          proposal_url?: string | null
          response_text?: string | null
          rfx_id?: string | null
          submitted_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          id?: string
          lead_time_days?: number | null
          price?: number | null
          proposal_url?: string | null
          response_text?: string | null
          rfx_id?: string | null
          submitted_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rfx_responses_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfx_responses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_review_rank: {
        Row: {
          ai_summary: string | null
          created_at: string | null
          financial_score: number
          id: number
          rank: number | null
          rfx_id: string | null
          technical_score: number
          total_score: number | null
          vendor_id: string | null
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string | null
          financial_score: number
          id?: never
          rank?: number | null
          rfx_id?: string | null
          technical_score: number
          total_score?: number | null
          vendor_id?: string | null
        }
        Update: {
          ai_summary?: string | null
          created_at?: string | null
          financial_score?: number
          id?: never
          rank?: number | null
          rfx_id?: string | null
          technical_score?: number
          total_score?: number | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rfx_review_rank_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfx_review_rank_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfx_review_rank_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_scoring: {
        Row: {
          calculated_score: number | null
          criteria: string | null
          id: string
          response_id: string | null
          score: number | null
          weight: number | null
        }
        Insert: {
          calculated_score?: number | null
          criteria?: string | null
          id?: string
          response_id?: string | null
          score?: number | null
          weight?: number | null
        }
        Update: {
          calculated_score?: number | null
          criteria?: string | null
          id?: string
          response_id?: string | null
          score?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rfx_scoring_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "rfx_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_vendors: {
        Row: {
          created_at: string | null
          id: string
          invited: boolean | null
          invited_at: string | null
          rfx_id: string | null
          vendor_email: string | null
          vendor_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          invited?: boolean | null
          invited_at?: string | null
          rfx_id?: string | null
          vendor_email?: string | null
          vendor_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          invited?: boolean | null
          invited_at?: string | null
          rfx_id?: string | null
          vendor_email?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rfx_vendors_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
        ]
      }
      rfx_voice_queries: {
        Row: {
          id: string
          timestamp: string | null
          transcript: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          timestamp?: string | null
          transcript?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          timestamp?: string | null
          transcript?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      risk_register: {
        Row: {
          created_at: string | null
          detected_by_ai: boolean | null
          id: string
          mitigation_plan: string | null
          rfx_id: string | null
          risk_category: string | null
          risk_level: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          detected_by_ai?: boolean | null
          id?: string
          mitigation_plan?: string | null
          rfx_id?: string | null
          risk_category?: string | null
          risk_level?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          detected_by_ai?: boolean | null
          id?: string
          mitigation_plan?: string | null
          rfx_id?: string | null
          risk_category?: string | null
          risk_level?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_register_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_register_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      scope_library: {
        Row: {
          description: string | null
          id: string
          item: string
        }
        Insert: {
          description?: string | null
          id?: string
          item: string
        }
        Update: {
          description?: string | null
          id?: string
          item?: string
        }
        Relationships: []
      }
      scope_requests: {
        Row: {
          attached_document_url: string | null
          business_unit: string
          created_at: string | null
          estimated_value: number | null
          expected_end_date: string | null
          expected_start_date: string | null
          id: string
          justification: string | null
          priority_level: string | null
          request_description: string | null
          request_title: string
          requestor_id: string | null
          scope_library_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          attached_document_url?: string | null
          business_unit: string
          created_at?: string | null
          estimated_value?: number | null
          expected_end_date?: string | null
          expected_start_date?: string | null
          id?: string
          justification?: string | null
          priority_level?: string | null
          request_description?: string | null
          request_title: string
          requestor_id?: string | null
          scope_library_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          attached_document_url?: string | null
          business_unit?: string
          created_at?: string | null
          estimated_value?: number | null
          expected_end_date?: string | null
          expected_start_date?: string | null
          id?: string
          justification?: string | null
          priority_level?: string | null
          request_description?: string | null
          request_title?: string
          requestor_id?: string | null
          scope_library_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scope_requests_requestor_id_fkey"
            columns: ["requestor_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scope_requests_scope_library_id_fkey"
            columns: ["scope_library_id"]
            isOneToOne: false
            referencedRelation: "scope_library"
            referencedColumns: ["id"]
          },
        ]
      }
      scope_validation: {
        Row: {
          created_at: string | null
          id: string
          requirement_description: string | null
          rfx_id: string | null
          validated: boolean | null
          validated_at: string | null
          validated_by: string | null
          validation_item: string
          vendor_id: string | null
          vendor_response: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          requirement_description?: string | null
          rfx_id?: string | null
          validated?: boolean | null
          validated_at?: string | null
          validated_by?: string | null
          validation_item: string
          vendor_id?: string | null
          vendor_response?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          requirement_description?: string | null
          rfx_id?: string | null
          validated?: boolean | null
          validated_at?: string | null
          validated_by?: string | null
          validation_item?: string
          vendor_id?: string | null
          vendor_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scope_validation_rfx_id_fkey"
            columns: ["rfx_id"]
            isOneToOne: false
            referencedRelation: "rfx"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scope_validation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      team_logins: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          full_name: string
          id: string
          last_login_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          full_name: string
          id?: string
          last_login_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      team_registrations: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string | null
          supervisor_email: string | null
          team_member_name: string
          unit: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role?: string | null
          supervisor_email?: string | null
          team_member_name: string
          unit?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string | null
          supervisor_email?: string | null
          team_member_name?: string
          unit?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          linked_id: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          linked_id?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          linked_id?: string | null
          role?: string
        }
        Relationships: []
      }
      vendor_audits: {
        Row: {
          id: string
          question: string | null
          response: string | null
          submitted_at: string | null
          submitted_by: string | null
          vendor_id: string | null
        }
        Insert: {
          id?: string
          question?: string | null
          response?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          vendor_id?: string | null
        }
        Update: {
          id?: string
          question?: string | null
          response?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_audits_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_documents: {
        Row: {
          document_type: string | null
          file_url: string | null
          id: string
          uploaded_at: string | null
          vendor_id: string | null
          verified: boolean | null
        }
        Insert: {
          document_type?: string | null
          file_url?: string | null
          id?: string
          uploaded_at?: string | null
          vendor_id?: string | null
          verified?: boolean | null
        }
        Update: {
          document_type?: string | null
          file_url?: string | null
          id?: string
          uploaded_at?: string | null
          vendor_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_documents_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_kpis: {
        Row: {
          id: string
          kpi_area: string | null
          kpi_score: number | null
          month: string | null
          submitted_at: string | null
          submitted_by: string | null
          vendor_id: string | null
        }
        Insert: {
          id?: string
          kpi_area?: string | null
          kpi_score?: number | null
          month?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          vendor_id?: string | null
        }
        Update: {
          id?: string
          kpi_area?: string | null
          kpi_score?: number | null
          month?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_kpis_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "rfx_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_registrations: {
        Row: {
          contact_person: string | null
          created_at: string | null
          email: string
          id: string
          phone_number: string | null
          registration_number: string | null
          vendor_name: string
        }
        Insert: {
          contact_person?: string | null
          created_at?: string | null
          email: string
          id?: string
          phone_number?: string | null
          registration_number?: string | null
          vendor_name: string
        }
        Update: {
          contact_person?: string | null
          created_at?: string | null
          email?: string
          id?: string
          phone_number?: string | null
          registration_number?: string | null
          vendor_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      vendors: {
        Row: {
          contact_person: string | null
          email: string | null
          id: string | null
          registration_number: string | null
          vendor_name: string | null
        }
        Insert: {
          contact_person?: string | null
          email?: string | null
          id?: string | null
          registration_number?: string | null
          vendor_name?: string | null
        }
        Update: {
          contact_person?: string | null
          email?: string | null
          id?: string | null
          registration_number?: string | null
          vendor_name?: string | null
        }
        Relationships: []
      }
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
    Enums: {},
  },
} as const
