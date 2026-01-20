import { client } from "../supabaseClient"

export async function signIn(email: string, password: string) {
  const data = await client.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
}

export async function getActiveUser() {
  const response = await client.auth.getUser();
  
  if (response.error) {
    console.error(response);
    return null;
  }

  console.log(response.data)
  return response.data;
}

export async function signOut() {
  return client.auth.signOut();
}