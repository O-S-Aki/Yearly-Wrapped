import { useState, useEffect } from 'react';

import { client } from '../lib/supabaseClient';
import { getActiveUser, getSession } from '../lib/api/user';

import type { ISession, IUser } from '../lib/interfaces';


export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function initialiseAuth() {
    const session: ISession| null = await getSession();
      if (session) {
        const activeUser: IUser = await getActiveUser();
        setUser(activeUser);
      }
    }

    initialiseAuth();

    const { data: authListener } = client.auth.onAuthStateChange(async (_event, session) => {
      console.log(session);
      if (session) {
        const activeUser: IUser = await getActiveUser();
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

