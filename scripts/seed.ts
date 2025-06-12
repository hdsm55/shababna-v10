import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();

// Validate required environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  process.exit(1);
}

// Define user IDs
const ADMIN_ID = '11111111-1111-1111-1111-111111111111';
const USER_ID = '22222222-2222-2222-2222-222222222222';

// Create Supabase admin client
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  { 
    auth: { 
      autoRefreshToken: false,
      persistSession: false 
    }
  }
);

// Define types
interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  full_name: string;
}

// Define test users
const users: User[] = [
  {
    id: ADMIN_ID,
    email: 'admin@example.com',
    password: 'Complex#Pass123',
    role: 'admin',
    full_name: 'Admin User'
  },
  {
    id: USER_ID,
    email: 'user@example.com',
    password: 'Complex#Pass123',
    role: 'user',
    full_name: 'Regular User'
  }
];

/**
 * Creates a user in Supabase Auth and adds their profile
 */
async function createUserWithProfile(user: User): Promise<void> {
  console.log(`Creating user: ${user.email} (${user.role})`);
  
  try {
    // Create user in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      uuid: user.id,
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { role: user.role }
    });

    if (authError) {
      throw new Error(`Failed to create auth user: ${authError.message}`);
    }

    console.log(`Auth user created: ${user.email}`);

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      throw new Error(`Failed to create profile: ${profileError.message}`);
    }

    console.log(`Profile created for: ${user.email}`);
  } catch (error) {
    console.error(`Error creating user ${user.email}:`, error);
    throw error; // Re-throw to be caught by the main seed function
  }
}

/**
 * Seed the database with test data
 */
async function seed(): Promise<void> {
  console.log('Starting database seed...');
  
  try {
    // Create users and profiles
    for (const user of users) {
      await createUserWithProfile(user);
    }

    // Add sample programs
    const { error: programsError } = await supabase
      .from('programs')
      .upsert([
        {
          id: uuidv4(),
          title: 'Youth Leadership Program',
          description: 'A comprehensive program to develop leadership skills in young people.',
          goal_amount: 10000,
          image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
        },
        {
          id: uuidv4(),
          title: 'Community Health Initiative',
          description: 'Supporting health education and services in underserved communities.',
          goal_amount: 15000,
          image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg'
        }
      ]);

    if (programsError) {
      throw new Error(`Failed to create programs: ${programsError.message}`);
    }

    // Add sample events
    const { error: eventsError } = await supabase
      .from('events')
      .upsert([
        {
          id: uuidv4(),
          title: 'Youth Leadership Summit',
          description: 'Annual gathering of youth leaders to share experiences and build networks.',
          start_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          end_date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString(), // 32 days from now
          location: 'Virtual Conference',
          capacity: 200
        },
        {
          id: uuidv4(),
          title: 'Community Service Day',
          description: 'Join us for a day of giving back to the community through various service projects.',
          start_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
          end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // Same day
          location: 'Multiple Locations',
          capacity: 100
        }
      ]);

    if (eventsError) {
      throw new Error(`Failed to create events: ${eventsError.message}`);
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Unhandled error during seed:', error);
    process.exit(1);
  });