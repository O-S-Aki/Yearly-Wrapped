import type { IMood } from "../../interfaces";

export const mapResponseToMood = (data: any): IMood => {
  const mood: IMood = {
    id: data.Id,
    label: data.Label,
    description: data.Description,
  }

  return mood;
}