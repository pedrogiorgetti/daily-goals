import fastifyCors from "@fastify/cors";
import fastify, { type FastifyInstance } from "fastify";
import {
  type FastifyPluginAsyncZod,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { achievedGoalsRoutes } from "./routes/achieved-goals.routes";
import { goalsRoutes } from "./routes/goals.routes";

const routesToRegister = [...goalsRoutes, ...achievedGoalsRoutes];

export const registerRoutes =
  (routes: FastifyPluginAsyncZod[]) => async (app: FastifyInstance) => {
    for (const routesFn of routes) {
      await routesFn(app, {});
    }
  };

const loadApp: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  await fastify.register(registerRoutes(routesToRegister));
};

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(loadApp);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP Server is running on port 3333");
});
