import { client } from "../../supabaseClient"

export const logout = async() => {
  return client.auth.signOut();
}