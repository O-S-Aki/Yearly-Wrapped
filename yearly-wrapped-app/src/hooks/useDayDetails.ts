import { useState, useEffect } from 'react';

import { useAuth } from './';
import { getDayByDate } from '../lib/api/day';

import type { IDay } from '../lib/interfaces';

export default function useDayDetails(date: string) {
  const { user } = useAuth();
  const [day, setDay] = useState<IDay | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      let cancelled: boolean = false;

      async function loadDay() {
        setLoading(true);

        const dayDetails: IDay | null = await getDayByDate(user!.id, date);
        setDay(dayDetails);

        setLoading(false);
      }

      loadDay();

      return () => {
        cancelled = true;
      }
    }
    else {
      return;
    }
  }, [user, date])

  return { day, loading };
}