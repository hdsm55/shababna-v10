import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;

if (!supabaseUrl) {
  throw new Error('Missing Supabase URL in config');
}
if (!supabaseKey) {
  throw new Error('Missing Supabase key in config');
}

export const supabase = createClient(supabaseUrl, supabaseKey);