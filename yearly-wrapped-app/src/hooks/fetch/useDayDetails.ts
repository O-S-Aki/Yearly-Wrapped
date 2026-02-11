import { useState, useEffect } from 'react';

import { useAuth } from '../';
import { getDayByDate } from '../../lib/api/day';

import type { IDay } from '../../lib/interfaces';

export default function useDayDetails(date: string) {
  const { user } = useAuth();
  const [day, setDay] = useState<IDay | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshDayDetails();
  }, [user, date])

  function refreshDayDetails(isoDate?: string | null) {
    if (user) {
      async function loadDay() {
        setLoading(true);

        const dayDetails: IDay | null = await getDayByDate(user!.id, isoDate ?? date);
        setDay(dayDetails);

        setLoading(false);
      }

      loadDay();
    }
    else {
      return;
    }
  }

  return { day, loading, refreshDayDetails };
}