import { EHttpMethod } from "../../enums/http";
import type { WeekGoalsSummary } from "../../types/goal";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export async function getWeekGoalsSummaryRequest(): Promise<WeekGoalsSummary> {
  const response = await fetch(`${baseApiUrl}/goals/week-summary`, {
    method: EHttpMethod.GET,
  });

  const data: { summary: WeekGoalsSummary } = await response.json();
  return data.summary;
}
