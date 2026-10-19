import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://gcakncfgmefigvdgehqb.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || "sb_publishable_S05_DZB5oXkN_OXZVFT3aw_cfE7bo-s";

export const createClient = (cookieStore: any) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore?.getAll ? cookieStore.getAll() : []
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              if (cookieStore?.set) cookieStore.set(name, value, options);
            })
          } catch {
            // Ignored when called from Server Component.
          }
        },
      },
    },
  );
};
