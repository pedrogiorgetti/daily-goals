import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { GoalService } from 'services/goal.service';

const goalService = new GoalService();

const createGoal: FastifyPluginAsyncZod = async function (app) {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string({
            required_error: 'Title is required',
          }),
          desiredWeeklyFrequency: z
            .number({ required_error: 'The frequency is required' })
            .int()
            .min(1)
            .max(7),
        }),
      },
    },
    async (request, reply) => {
      const { goal } = await goalService.create(request.body);

      const response = reply
        .status(201)
        .send({ goal, message: 'Goal created with success' });

      return response;
    },
  );
};

const getGoals: FastifyPluginAsyncZod = async function (app) {
  app.get('/goals', async (_, reply) => {
    const { list } = await goalService.getMany();

    const response = reply.status(200).send({
      list,
    });
    return response;
  });
};

const getWeekGoalsSummary: FastifyPluginAsyncZod = async function (app) {
  app.get('/goals/week-summary', async (_, reply) => {
    const weekGoalsSummary = await goalService.getWeekSummary();

    const response = reply.status(200).send(weekGoalsSummary);
    return response;
  });
};

export const goalsRoutes = [createGoal, getGoals, getWeekGoalsSummary];
