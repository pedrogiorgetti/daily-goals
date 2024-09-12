import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllGoalsRequest } from "../http/goals/getAll";
import { createAchievedGoalRequest } from "../http/achieved-goals/create";
import { EQueryKeys } from "../enums/queryKeys";
import { toast } from "sonner";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [EQueryKeys.getAllGoals],
    queryFn: getAllGoalsRequest,
  });

  if (!data) {
    return null;
  }

  async function handleAchieveGoal(goalId: string) {
    await createAchievedGoalRequest({
      payload: {
        goalId,
      },
      functions: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [EQueryKeys.weekGoalsSummary],
          });
          queryClient.invalidateQueries({
            queryKey: [EQueryKeys.getAllGoals],
          });

          toast.success("Goal achieved with success!", {
            duration: 3000,
            position: "top-right",
          });
        },
      },
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.list.map((goal) => (
        <OutlineButton
          disabled={goal.desiredWeeklyFrequency <= goal.achievedCount}
          onClick={() => handleAchieveGoal(goal.id)}
          key={goal.id}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  );
}
