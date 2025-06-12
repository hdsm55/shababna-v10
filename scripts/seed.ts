import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure required environment variables are set
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  process.exit(1);
}

// Initialize Supabase admin client with service role key
const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

console.log('Supabase admin client initialized successfully');

export { supabase };

// Add seed functions below
// Example:
// async function seedUsers() {
//   const { data, error } = await supabase.from('profiles').insert([
//     { id: 'user-uuid', full_name: 'Admin User', role: 'admin' }
//   ]);
//   
//   if (error) {
//     console.error('Error seeding users:', error);
//     return;
//   }
//   
//   console.log('Users seeded successfully:', data);
// }

// Main function to run all seed operations
async function main() {
  try {
    // Add seed function calls here
    // await seedUsers();
    
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
  }
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main().catch(err => {
    console.error('Unhandled error during seed:', err);
    process.exit(1);
  });
}