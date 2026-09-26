import { supabase } from '../lib/supabase';

export const getUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('کێشە لە وەرگرتنی پڕۆفایل:', error.message);
    return null;
  }

  return data;
};
