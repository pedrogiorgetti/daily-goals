import dayjs from "dayjs";
import { db } from "db";
import { achievedGoals, goals } from "db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import type { AchievedGoal } from "entities/achievedGoal.entity";

type CreateAchievedGoalInput = {
  goalId: string;
};

type CreateAchievedGoalOutput = {
  achievedGoal: AchievedGoal;
};

type RemoveAchievedGoalInput = {
  id: string;
};

export class AchievedGoalService {
  database = db;
  goalsTable = goals;
  achievedGoalsTable = achievedGoals;

  async create(
    input: CreateAchievedGoalInput
  ): Promise<CreateAchievedGoalOutput> {
    const startOfWeek = dayjs().startOf("week").toDate();
    const endOfWeek = dayjs().endOf("week").toDate();

    const achievedGoalsCount = db.$with("achieved_goals_count").as(
      this.database
        .select({
          goalId: this.achievedGoalsTable.goalId,
          total: count(this.achievedGoalsTable.id).as("achievedCount"),
        })
        .from(this.achievedGoalsTable)
        .where(
          and(
            gte(this.achievedGoalsTable.createAt, startOfWeek),
            lte(this.achievedGoalsTable.createAt, endOfWeek),
            eq(this.achievedGoalsTable.goalId, input.goalId)
          )
        )
        .groupBy(this.achievedGoalsTable.goalId)
    );

    const result = await this.database
      .with(achievedGoalsCount)
      .select({
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        achievedCount: sql`COALESCE(${achievedGoalsCount.total}, 0)`
          .mapWith(Number)
          .as("achievedCount"),
      })
      .from(this.goalsTable)
      .leftJoin(
        achievedGoalsCount,
        eq(achievedGoalsCount.goalId, this.goalsTable.id)
      )
      .where(eq(this.goalsTable.id, input.goalId))
      .limit(1);

    const goal = result[0];

    if (goal.achievedCount >= goal.desiredWeeklyFrequency) {
      throw new Error("Goal already achieved for the week");
    }

    const insertResult = await this.database
      .insert(this.achievedGoalsTable)
      .values(input)
      .returning();

    const achievedGoal = insertResult[0];

    return {
      achievedGoal,
    };
  }

  async remove(input: RemoveAchievedGoalInput): Promise<void> {
    await this.database
      .delete(this.achievedGoalsTable)
      .where(eq(this.achievedGoalsTable.id, input.id));
  }
}
