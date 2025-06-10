import { createClient } from '@supabase/supabase-js';

// Default values for development
const defaultUrl = 'https://fpzfcy…';
const defaultKey = 'eyJhbc…';

// Get environment variables with fallback to defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || defaultKey;

// Validate URL
let validUrl = supabaseUrl;
try {
  // Check if URL is valid
  if (!supabaseUrl.startsWith('https://')) {
    throw new Error('URL must start with https://');
  }
  // Try to construct URL
  const url = new URL(supabaseUrl);
  validUrl = url.toString();
} catch (e) {
  console.error('Invalid Supabase URL:', supabaseUrl);
  validUrl = defaultUrl;
}

// Debug lines
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY:', import.meta.env.VITE_SUPABASE_KEY?.slice(0, 15) + '…');

// Create Supabase client
export const supabase = createClient(validUrl, supabaseKey);

// Log warning if using default values
if (validUrl === defaultUrl || supabaseKey === defaultKey) {
  console.warn('Using default Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_KEY in .env.local');
}