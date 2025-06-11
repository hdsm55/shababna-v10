import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/$/, '');
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl) throw new Error('❌ VITE_SUPABASE_URL is missing – ‎.env غير مضبوط');
if (!supabaseKey) console.warn('⚠️ VITE_SUPABASE_ANON_KEY فارغ، الاتصال سيكون للقراءة فقط');

export const supabase = createClient(supabaseUrl, supabaseKey);

// Debug مرة واحدة
if (import.meta.env.DEV) {
  console.log('✅ Supabase URL:', supabaseUrl);
  console.log('✅ Supabase KEY (first 12):', supabaseKey.slice(0, 12) + '…');
}