import { useState, useEffect } from "react";

import { useAuth } from './';
import { getDaysByYear } from "../lib/api/day";

import type { ISimpleDay } from "../lib/interfaces";

export default function useDaysOfYear(year: number) {
  const { user } = useAuth();
  const [days, setDays] = useState<ISimpleDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      if (user) {
        async function loadDays() {
          setLoading(true);
  
          const daysOfYear: ISimpleDay[] = await getDaysByYear(user!.id, year);
          setDays(daysOfYear);
  
          setLoading(false);
        }
  
        loadDays();
      }
      else {
        return;
      }
  
    }, [user, year])
  
    return { days, loading };
}