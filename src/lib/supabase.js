import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Guard: only the blog/admin features need Supabase. If the env vars are absent,
// return null instead of throwing at import time (which would crash the whole
// marketing site). Blog/admin code should handle a null client gracefully.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
