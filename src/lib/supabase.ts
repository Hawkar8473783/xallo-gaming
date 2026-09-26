import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://vnyprsjjmmjahkisozib.supabase.co';
const SUPABASE_ANON_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZueXByc2pqbW1qYWhraXNvemliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5OTE0MjEsImV4cCI6MjEwNTU2NzQyMX0.-CqVI-DzAvgNE_qAa9fwRk12QXl0zMGw7hzqqmZE4sI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
