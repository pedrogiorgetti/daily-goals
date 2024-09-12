import { EHttpMethod } from "../../enums/http";

type RemoveAchievedGoalRequest = {
  payload: {
    id: string;
  };
  functions: {
    onSuccess: () => void;
  };
};

export async function removeAchievedGoalRequest({
  functions,
  payload,
}: RemoveAchievedGoalRequest): Promise<void> {
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  await fetch(`${baseApiUrl}/achieved-goals/${payload.id}`, {
    method: EHttpMethod.DELETE,
    headers: {
      "Content-Type": "application/json",
    },
  });

  functions.onSuccess();
}
