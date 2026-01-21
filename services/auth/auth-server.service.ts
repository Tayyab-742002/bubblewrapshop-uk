/**
 * Server-Side Authentication Service
 * For server components, API routes, and middleware
 * Reference: Architecture.md Section 4.3
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthResult } from "./auth.service";

// Type for user profile from database (snake_case from Supabase)
interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  company: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Get current user (server-side)
 * Returns the current authenticated user from server context
 */
export async function getCurrentUserServer(): Promise<AuthResult> {
  try {
    const supabase = await createServerSupabaseClient();

    // Get current user from auth
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return {
        success: false,
        error: "Failed to fetch user profile",
      };
    }

    const typedProfile = profile as UserProfile;

    return {
      success: true,
      user: {
        id: typedProfile.id,
        email: typedProfile.email,
        fullName: typedProfile.full_name || undefined,
        phone: typedProfile.phone || undefined,
        company: typedProfile.company || undefined,
        avatarUrl: typedProfile.avatar_url || undefined,
        createdAt: typedProfile.created_at,
        updatedAt: typedProfile.updated_at,
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
