import { supabase } from "$lib/api/supabase";
import { goto } from "$app/navigation";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
  goto("/signin");
};
