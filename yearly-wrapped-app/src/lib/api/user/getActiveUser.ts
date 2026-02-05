import { client } from "../../supabaseClient"
import type { IUser } from "../../interfaces";
import { mapResponseToUser } from "../../mappers";

export async function getActiveUser(): Promise<IUser> {
  const { data } = await client.auth.getUser();

  const user: IUser = mapResponseToUser(data.user);
  return user;
}