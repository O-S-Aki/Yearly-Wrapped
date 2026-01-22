import type { ISession, IUser } from "../interfaces";

export const mapResponseToSession = (data: any): ISession => {
  const session: ISession = {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    expiresAt: data.expires_at,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    user: mapResponseToUser(data.user),
  }

  return session;
}

export const mapResponseToUser = (data: any): IUser => {
  const user: IUser = {
    id: data.id ?? data.user.id,
    email: data.email ?? data.user.email,
  }

  return user;
}