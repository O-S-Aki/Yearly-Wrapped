import { useState, useEffect } from 'react';

import { client } from '../lib/supabaseClient';

import { getSession } from '../lib/api/user';
import { mapResponseToUser } from '../lib/mappers';

import type { ISession, IUser } from '../lib/interfaces';


export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function initialiseAuth() {
    const session: ISession| null = await getSession();
      if (session) {
        const activeUser: IUser = session.user;
        console.log(activeUser)
        setUser(activeUser);
      }
    }

    initialiseAuth();

    const { data: authListener } = client.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const activeUser: IUser = mapResponseToUser(session.user);
        setUser(activeUser)
      }
      else {
        setUser(null)
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  return { user };
}

