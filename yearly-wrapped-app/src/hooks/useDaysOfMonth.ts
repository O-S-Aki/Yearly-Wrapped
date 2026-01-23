import { useState, useEffect } from 'react';

import { useAuth } from './useAuth';
import { getDaysByMonth } from '../lib/api/day';

import type { ISimpleDay } from '../lib/interfaces';

export function useDaysOfMonth(year: number, month: number) {
  const { user } = useAuth();
  const [days, setDays] = useState<ISimpleDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      async function loadDays() {
        setLoading(true);

        const daysOfMonth: ISimpleDay[] = await getDaysByMonth(user!.id, year, month);
        setDays(daysOfMonth);

        setLoading(false);
      }

      loadDays();
    }
    else {
      return;
    }

  }, [user, year, month])

  return { days, loading };
}