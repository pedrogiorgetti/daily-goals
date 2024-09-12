import { EHttpMethod } from "../../enums/http";

type CreateAchievedGoalRequest = {
  payload: {
    goalId: string;
  };
  functions: {
    onSuccess: () => void;
  };
};

export async function createAchievedGoalRequest({
  functions,
  payload,
}: CreateAchievedGoalRequest): Promise<void> {
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  await fetch(`${baseApiUrl}/achieved-goals`, {
    method: EHttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId: payload.goalId }),
  });

  functions.onSuccess();
}
