import { useState, useEffect } from 'react';

import { getAllMoods } from '../lib/api/day';
import type { IMood } from '../lib/interfaces';

export default function useMoods() {
  const [moods, setMoods] = useState<IMood[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);

      const allMoods: IMood[] = await getAllMoods();
      setMoods(allMoods);
      
      setLoading(false);
    };

    fetchMoods();
  }, [false]);

  return { moods, loading};
}