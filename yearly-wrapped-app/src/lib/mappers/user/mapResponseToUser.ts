import type { IUser } from '../../interfaces';

export const mapResponseToUser = (data: any): IUser => {
  const user: IUser = {
    id: data.id ?? data.user.id,
    email: data.email ?? data.user.email,
  }

  return user;
}