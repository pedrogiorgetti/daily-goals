import { EHttpMethod } from "../../enums/http";

type CreateGoalRequest = {
  payload: {
    title: string;
    desiredWeeklyFrequency: number;
  };
  functions: {
    onSuccess: () => void;
  };
};

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export async function createGoalRequest({
  payload,
  functions,
}: CreateGoalRequest): Promise<void> {
  await fetch(`${baseApiUrl}/goals`, {
    method: EHttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  functions.onSuccess();
}
