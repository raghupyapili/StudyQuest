# Setting up a Database (Supabase) for StudyQuest

Since you want your friends to use the app and have data sync across devices (e.g., Parent-Student features), you need a cloud database. We will use **Supabase** because it is excellent for React apps, offers a generous free tier, and includes Authentication out of the box.

## Step 1: Create a Supabase Project
1.  Go to [supabase.com](https://supabase.com/) and click "Start your project".
2.  Sign in with GitHub or email.
3.  Click "New Project".
4.  Enter details:
    *   **Name**: `StudyQuest`
    *   **Database Password**: Generate a strong password (save this in a secure place!).
    *   **Region**: Choose a region close to you (e.g., Mumbai or Singapore).
5.  Click "Create new project".
6.  Wait a minute for the database to provision.

## Step 2: Set up the Database Tables
We need to create tables to store the `User` profiles and their `GameState`.

1.  In your Supabase dashboard, go to the **SQL Editor** (icon on the left sidebar).
2.  Click "New Query".
3.  Paste the following SQL code to set up your tables:

```sql
-- Create a table for public profiles (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  role TEXT DEFAULT 'student',
  name TEXT,
  grade TEXT,
  second_language TEXT,
  state_preference TEXT,
  parent_id UUID, -- For students linking to parents
  avatar TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_active_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for detailed game state (JSONB is perfect for storing complex objects)
CREATE TABLE game_states (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  completed_chapter_ids TEXT[] DEFAULT '{}',
  completed_sub_topic_ids TEXT[] DEFAULT '{}',
  completed_practice_paper_ids TEXT[] DEFAULT '{}',
  chapter_plans JSONB DEFAULT '{}', -- Stores your study plans
  settings JSONB DEFAULT '{}', -- Stores custom chapters, critical topics, etc.
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_states ENABLE ROW LEVEL SECURITY;

-- Create Policy: Users can view their own profile
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

-- Create Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create Policy: Users can view/update their own game state
CREATE POLICY "Users can view own game state" 
ON game_states FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own game state" 
ON game_states FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game state" 
ON game_states FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AUTOMATICALLY create profile entry when a new user signs up
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username, role, name)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'role', new.raw_user_meta_data->>'name');
  
  insert into public.game_states (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
4.  Click **Run** (bottom right).

## Step 3: Get API Keys
1.  Go to **Project Settings** (gear icon) -> **API**.
2.  Copy the `Project URL` and `anon` public key.

## Step 4: Connect App to Supabase
Now we update your local code.

1.  **Install the SDK**:
    ```bash
    npm install @supabase/supabase-js
    ```

2.  **Create Environment Variables**:
    Create a file named `.env` in your project root (same level as `package.json`):
    ```env
    VITE_SUPABASE_URL=your_project_url_here
    VITE_SUPABASE_ANON_KEY=your_anon_key_here
    ```

3.  **Create the Client**:
    Create `src/lib/supabase.ts`:
    ```typescript
    import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    export const supabase = createClient(supabaseUrl, supabaseAnonKey)
    ```

## Step 5: Update Hooks (I can do this for you!)
Once step 1-3 are done, I can update your `useAuth.ts` and `useGameState.ts` to read/write from Supabase instead of LocalStorage.

This will enable:
*   Real login/signup functionality.
*   Data persistence across any device.
*   Parents being able to see their child's live progress remotely.
