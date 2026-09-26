import { supabase } from '../lib/supabase';

export const signUpUser = async (email: string, password: string, referralCodeEntered?: string) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message || 'کێشەیەک لە دروستکردنی هەژمارەکە ڕوویدا');
  }

  const userId = authData.user.id;
  let referrerId = null;

  if (referralCodeEntered) {
    const { data: referrerProfile } = await supabase
      .from('profiles')
      .select('id, coins')
      .eq('referral_code', referralCodeEntered.trim().toUpperCase())
      .single();

    if (referrerProfile) {
      referrerId = referrerProfile.id;

      await supabase
        .from('profiles')
        .update({ coins: (referrerProfile.coins || 0) + 100 })
        .eq('id', referrerId);
    }
  }

  const initialCoins = referrerId ? 50 : 0;

  await supabase
    .from('profiles')
    .update({
      referred_by: referrerId,
      coins: initialCoins,
    })
    .eq('id', userId);

  return authData;
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};
