import dayjs from "dayjs";
import { CheckCircle2 } from "lucide-react";
import type { AchievedGoalPerDay } from "../types/goal";
import { removeAchievedGoalRequest } from "../http/achieved-goals/remove";
import { EQueryKeys } from "../enums/queryKeys";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

interface SummaryWeekDayGoalProps {
  achievedGoal: AchievedGoalPerDay;
}

export function SummaryWeekDayGoal({ achievedGoal }: SummaryWeekDayGoalProps) {
  const queryClient = useQueryClient();

  const time = dayjs(achievedGoal.achievedAt).format("HH:mm[h]");

  async function handleRemoveAchievedGoal() {
    await removeAchievedGoalRequest({
      payload: {
        id: achievedGoal.id,
      },
      functions: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [EQueryKeys.weekGoalsSummary],
          });
          queryClient.invalidateQueries({
            queryKey: [EQueryKeys.getAllGoals],
          });

          toast.success("", {
            duration: 3000,
            position: "top-right",
          });
        },
      },
    });
  }

  return (
    <li key={achievedGoal.id} className="flex items-center gap-2">
      <CheckCircle2 className="size-4 text-indigo-500" />
      <span className="text-sm text-zinc-400">
        You completed{" "}
        <span className="text-zinc-100">"{achievedGoal.title}"</span> at{" "}
        <span className="text-zinc-100">{time}</span>
      </span>

      <Button variant="underline" size="sm" onClick={handleRemoveAchievedGoal}>
        <span className="text-zinc-400">Undo</span>
      </Button>
    </li>
  );
}
