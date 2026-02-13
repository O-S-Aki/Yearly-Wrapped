import { client } from "../../supabaseClient"
import type { ISession } from "../../interfaces";
import { mapResponseToSession } from "../../mappers";

export async function getSession(): Promise<ISession | null> {
  const { data } = await client.auth.getSession();

  if (data.session) {
    const session: ISession = mapResponseToSession(data.session);
    return session;
  }

  return null;
}