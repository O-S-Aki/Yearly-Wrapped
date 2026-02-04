import { client } from "../../supabaseClient";
import { mapResponeToMood } from "../../mappers";

import type { IMood } from "../../interfaces";

export const getAllMoods = async (): Promise<IMood[]> => {
  const response = await client
    .from("Mood")
    .select(`
      Id,
      Label,
      Description
    `);

  if (response.error) {
    console.error(`Failed to get moods: ${response.error}`);
    return [];
  }

  const fetchedMoods: any = response.data;
  const moods: IMood[] = [];

  fetchedMoods.forEach((mood: any) => {
    const mappedMood = mapResponeToMood(mood);
    moods.push(mappedMood);
  });

  return moods;
}