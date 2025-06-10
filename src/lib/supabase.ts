import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/$/, '');
const supabaseKey = (import.meta.env.VITE_SUPABASE_KEY || '').trim();

console.log('Supabase URL →', supabaseUrl);      // احذف لاحقًا بعد التأكد
console.log('Supabase KEY(first 15) →', supabaseKey.slice(0,15)+'…');

export const supabase = createClient(supabaseUrl, supabaseKey);