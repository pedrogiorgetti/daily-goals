export type AchievedGoalPerDay = {
  id: string;
  title: string;
  achievedAt: string;
};

type AchievedGoalsPerDay = Record<string, AchievedGoalPerDay[]>;

export type WeekGoalsSummary = {
  achievedGoalsPerDay: AchievedGoalsPerDay | null;
  totalAchieved: number;
  total: number;
};

export type Goal = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  achievedCount: number;
};

export type GoalList = {
  list: Goal[];
};
