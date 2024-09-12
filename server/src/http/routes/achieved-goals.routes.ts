import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { AchievedGoalService } from "services/achieved-goal.service";
import z from "zod";

const achievedGoalService = new AchievedGoalService();

const createAchievedGoal: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/achieved-goals",
    {
      schema: {
        body: z.object({
          goalId: z.string({
            required_error: "Goal ID is required",
          }),
        }),
      },
    },
    async (request, reply) => {
      const { achievedGoal } = await achievedGoalService.create(request.body);

      const response = reply.status(201).send({
        achievedGoal,
        message: "Goal achieved with success",
      });

      return response;
    }
  );
};

const removeAchievedGoal: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/achieved-goals/:id",
    {
      schema: {
        params: z.object({
          id: z.string({
            required_error: "Achieved goal ID is required",
          }),
        }),
      },
    },
    async (request, reply) => {
      await achievedGoalService.remove(request.params);

      const response = reply.status(204).send();

      return response;
    }
  );
};

export const achievedGoalsRoutes = [createAchievedGoal, removeAchievedGoal];
