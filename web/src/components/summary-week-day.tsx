import dayjs from "dayjs";

import { SummaryWeekDayGoal } from "./summary-week-day-goal";
import type { AchievedGoalPerDay } from "../types/goal";

interface SummaryWeekDayProps {
  date: string;
  achievedGoals: AchievedGoalPerDay[];
}

export function SummaryWeekDay({ date, achievedGoals }: SummaryWeekDayProps) {
  const weekDay = dayjs(date).format("dddd");
  const formattedDate = dayjs(date).format("D[ de ]MMMM");

  return (
    <div className="flex flex-col gap-4" key={date}>
      <h3 className="font-medium">
        <span className="capitalize">{weekDay}</span>{" "}
        <span className="text-zinc-400 text-xs">({formattedDate})</span>
      </h3>

      <ul className="space-y-3">
        {achievedGoals.map((achievedGoal) => (
          <SummaryWeekDayGoal
            key={achievedGoal.id}
            achievedGoal={achievedGoal}
          />
        ))}
      </ul>
    </div>
  );
}
