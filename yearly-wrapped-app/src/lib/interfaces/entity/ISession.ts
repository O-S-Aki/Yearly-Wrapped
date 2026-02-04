import type { IUser } from '../';

export default interface ISession {
  accessToken: string;
  expiresAt: number;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
  user: IUser;
}