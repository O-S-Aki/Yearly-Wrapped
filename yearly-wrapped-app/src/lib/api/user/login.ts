import { client } from "../../supabaseClient"

export async function login(email: string, password: string) {
  const data = await client.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
}