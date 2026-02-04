import { client } from "../../supabaseClient"
import type { IUser } from "../../interfaces";
import { mapResponseToUser } from "../../mappers/userMapper";

export async function getActiveUser(): Promise<IUser> {
  const { data } = await client.auth.getUser();

  const user: IUser = mapResponseToUser(data.user);
  return user;
}