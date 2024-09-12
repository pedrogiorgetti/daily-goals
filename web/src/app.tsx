import { EmptyGoals } from "./components/empty-goals";
import { CreateGoal } from "./components/create-goal";
import { Dialog } from "./components/ui/dialog";
import { Summary } from "./components/summary";
import { useQuery } from "@tanstack/react-query";
import { getWeekGoalsSummaryRequest } from "./http/goals/getWeekSummary";
import { IsVisible } from "./components/utils/is-visible";
import { EQueryKeys } from "./enums/queryKeys";

import { Loader2 } from "lucide-react";

export function App() {
  const { data: summaryData, isLoading } = useQuery({
    queryKey: [EQueryKeys.weekGoalsSummary],
    queryFn: getWeekGoalsSummaryRequest,
    staleTime: 1000 * 60, // 1 minute
  });

  if (isLoading || !summaryData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin size-10" />
      </div>
    );
  }

  return (
    <Dialog>
      <IsVisible when={!summaryData.total}>
        <EmptyGoals />
      </IsVisible>

      <IsVisible when={summaryData.total > 0}>
        <Summary summaryData={summaryData} />
      </IsVisible>

      <CreateGoal />
    </Dialog>
  );
}
