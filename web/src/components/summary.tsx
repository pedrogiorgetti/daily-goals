import { GoalsIoIcon } from "./goals-io-icon";
import dayjs from "dayjs";

import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { SummaryWeekDay } from "./summary-week-day";
import { PendingGoals } from "./pending-goals";
import { IsVisible } from "./utils/is-visible";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import type { WeekGoalsSummary } from "../types/goal";

type SummaryProps = {
  summaryData: WeekGoalsSummary;
};

export function Summary({ summaryData }: SummaryProps) {
  const startOfWeek = dayjs().startOf("week").format("D MMM");
  const endOfWeek = dayjs().endOf("week").format("D MMM");

  const completedPorcentage = Math.round(
    (summaryData.totalAchieved * 100) / summaryData.total
  );

  return (
    <main className="max-w-[540px] py-10 px-5 mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-3">
            <GoalsIoIcon />
            <span className="text-lg font-semibold capitalize">
              {startOfWeek} - {endOfWeek}
            </span>
          </div>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4 text-zinc-100" />
              Create goal
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-6">
          <Progress value={summaryData.totalAchieved} max={summaryData.total}>
            <ProgressIndicator
              style={{
                width: `${completedPorcentage}%`,
              }}
            />
          </Progress>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              Did you complete{" "}
              <span className="text-zinc-100">{summaryData.totalAchieved}</span>{" "}
              from <span className="text-zinc-100">{summaryData.total}</span>{" "}
              goals this week.
            </span>
            <span>{completedPorcentage}%</span>
          </div>

          <Separator />

          <PendingGoals />

          <div className="space-y-6">
            <h2 className="text-xl font-medium">Your week</h2>

            <IsVisible when={summaryData.totalAchieved > 0}>
              {summaryData.achievedGoalsPerDay &&
                Object.entries(summaryData.achievedGoalsPerDay).map(
                  ([date, achievedGoals]) => (
                    <SummaryWeekDay
                      date={date}
                      achievedGoals={achievedGoals}
                      key={date}
                    />
                  )
                )}
            </IsVisible>

            <IsVisible when={!summaryData.totalAchieved}>
              <p className="text-zinc-400 text-sm">
                You haven't completed any goal this week yet.
              </p>
            </IsVisible>
          </div>
        </div>
      </div>
    </main>
  );
}
