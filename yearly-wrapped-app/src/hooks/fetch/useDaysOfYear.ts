import { useState, useEffect } from "react";

import { useAuth } from '../';
import { getDaysByYear } from "../../lib/api/day";

import type { ISimpleDay } from "../../lib/interfaces";

export default function useDaysOfYear(year: number) {
  const { user } = useAuth();
  const [days, setDays] = useState<ISimpleDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDays = async () => {
    if (!user) {
      return;
    }

    setLoading(true);

    const daysOfYear: ISimpleDay[] = await getDaysByYear(user.id, year);
    setDays(daysOfYear);

    setLoading(false);
  }

  useEffect(() => {
    loadDays();
  }, [user, year])

  return { days, refreshDays: loadDays, loading };
}