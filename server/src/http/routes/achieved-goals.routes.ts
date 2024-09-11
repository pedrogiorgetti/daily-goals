import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { AchievedGoalService } from 'services/achieved-goal.service';

const achievedGoalService = new AchievedGoalService();

const createAchievedGoal: FastifyPluginAsyncZod = async function (app) {
  app.post(
    '/achieved-goals',
    {
      schema: {
        body: z.object({
          goalId: z.string({
            required_error: 'Goal ID is required',
          }),
        }),
      },
    },
    async (request, reply) => {
      const { achievedGoal } = await achievedGoalService.create(request.body);

      const response = reply.status(201).send({
        achievedGoal,
        message: 'Goal achieved with success',
      });

      return response;
    },
  );
};

export const achievedGoalsRoutes = [createAchievedGoal];
