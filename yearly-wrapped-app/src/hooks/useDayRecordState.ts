import { useState, useEffect } from 'react';

import type { IDay } from '../lib/interfaces';

export default function useDayRecordState(initialDay: IDay | null, date: string) {
  const [songName, setSongName] = useState<string>(initialDay?.song?.name || '');
  const [songArtist, setSongArtist] = useState<string>(initialDay?.song?.artist || '');
  const [songUrl, setSongUrl] = useState<string>(initialDay?.song?.url || '');
  const [note, setNote] = useState<string>(initialDay?.note || '');

  useEffect(() => {
    setSongName(initialDay?.song?.name || '');
    setSongArtist(initialDay?.song?.artist || '');
    setSongUrl(initialDay?.song?.url || '');
    setNote(initialDay?.note || '');
  }, [initialDay, date])

  const changeSongName = (name: string) => {
    setSongName(name);
  }

  const changeSongArtist = (artist: string) => {
    setSongArtist(artist);
  }

  const changeSongUrl = (url: string) => {
    setSongUrl(url);
  }

  const changeNote = (note: string) => {
    setNote(note);
  }

  return { songName, songArtist, songUrl, note, changeSongName, changeSongArtist, changeSongUrl, changeNote };
}