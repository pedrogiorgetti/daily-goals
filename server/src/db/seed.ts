import dayjs from 'dayjs';

import { client, db } from './index';
import { achievedGoals, goals } from './schema';

async function seed() {
  await db.delete(achievedGoals);
  await db.delete(goals);

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Learn TypeScript',
        desiredWeeklyFrequency: '3',
      },
      {
        title: 'Learn React',
        desiredWeeklyFrequency: '3',
      },
    ])
    .returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(achievedGoals).values([
    { goalId: result[0].id, createAt: startOfWeek.toDate() },
    { goalId: result[1].id, createAt: startOfWeek.add(1, 'day').toDate() },
  ]);
}

seed().finally(() => client.end());
