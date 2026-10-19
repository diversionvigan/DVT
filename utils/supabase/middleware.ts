import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://gcakncfgmefigvdgehqb.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || "sb_publishable_S05_DZB5oXkN_OXZVFT3aw_cfE7bo-s";

export const createClient = (request: any) => {
  let supabaseResponse = {
    headers: request?.headers || new Headers(),
    cookies: {
      set: () => {}
    }
  };

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request?.cookies?.getAll ? request.cookies.getAll() : []
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value }) => {
            if (request?.cookies?.set) request.cookies.set(name, value);
          })
        },
      },
    },
  );

  return supabaseResponse;
};
