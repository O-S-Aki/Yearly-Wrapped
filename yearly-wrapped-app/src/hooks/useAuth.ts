import { useState, useEffect } from 'react';

import { client } from '../lib/supabaseClient';

import { mapResponseToSession } from '../lib/mappers/userMapper';
import type { ISession, IUser } from '../lib/interfaces';

export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: authListener } = client.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const activeSession: ISession = mapResponseToSession(session);
        const activeUser: IUser = activeSession.user;

        setUser(activeUser)
      }
      else {
        setUser(null)
      }

      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  return { user, loading };
}

