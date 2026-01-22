import { client } from "../supabaseClient"
import type { ISession, IUser } from "../interfaces";
import { mapResponseToSession, mapResponseToUser } from "../mappers/userMapper";

export async function getSession(): Promise<ISession | null> {
  const { data } = await client.auth.getSession();

  if (data.session) {
    const session: ISession = mapResponseToSession(data.session);
    return session;
  }

  return null;
}

export async function getActiveUser(): Promise<IUser> {
  const { data } = await client.auth.getUser();

  const user: IUser = mapResponseToUser(data.user);
  return user;
}

export async function login(email: string, password: string) {
  const data = await client.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
}

export async function logout() {
  return client.auth.signOut();
}