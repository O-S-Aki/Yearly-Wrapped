import { useState, useEffect } from 'react';

import type { IDay, IDayInput } from '../lib/interfaces';

export default function useDayInput(initialDay: IDay | null) {
  const [dayInput, setDayInput] = useState<IDayInput>({
    date: initialDay ? initialDay.isoDate : '',
    moodId: initialDay && initialDay.mood ? initialDay.mood.id : 0,
    song: initialDay && initialDay.song ? {
      name: initialDay.song && initialDay.song.name ? initialDay.song.name : '',
      artist: initialDay.song && initialDay.song.artist ? initialDay.song.artist : '',
      url: initialDay.song && initialDay.song.url ? initialDay.song.url : '',
    } : null,
    note: initialDay && initialDay.note ? initialDay.note : null,
  })

  useEffect(() => {
    setDayInput({
      date: initialDay ? initialDay.isoDate : '',
      moodId: initialDay && initialDay.mood ? initialDay.mood.id : 0,
      song: initialDay && initialDay.song ? {
        name: initialDay.song && initialDay.song.name ? initialDay.song.name : '',
        artist: initialDay.song && initialDay.song.artist ? initialDay.song.artist : '',
        url: initialDay.song && initialDay.song.url ? initialDay.song.url : '',
      } : null,
      note: initialDay && initialDay.note ? initialDay.note : null,
    })
  }, [initialDay])

  return { dayInput };
}