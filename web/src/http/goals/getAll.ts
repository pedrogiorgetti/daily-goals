import { EHttpMethod } from "../../enums/http";
import type { GoalList } from "../../types/goal";

export async function getAllGoalsRequest(): Promise<GoalList> {
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const response = await fetch(`${baseApiUrl}/goals`, {
    method: EHttpMethod.GET,
  });

  const data: GoalList = await response.json();
  return data;
}
