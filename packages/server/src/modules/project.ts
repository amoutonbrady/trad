import { FastifyPlugin } from "fastify";
import {
  ProjectCreateInput,
  ProjectWhereUniqueInput,
  ProjectUpdateInput,
} from "@prisma/client";

export const ProjectModule: FastifyPlugin = (app, options, done) => {
  app.get(
    "/projects",
    {
      preValidation: [app.authenticate],
    },
    async () => {
      return app.db.project.findMany();
    }
  );

  app.get<{ Params: ProjectWhereUniqueInput }>(
    "/projects/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.project.findOne({
        where: req.params,
      });
    }
  );

  app.post<{ Body: ProjectCreateInput }>(
    "/projects",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.project.create({
        data: req.body,
      });
    }
  );

  app.patch<{ Params: ProjectWhereUniqueInput; Body: ProjectUpdateInput }>(
    "/projects/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.project.update({
        where: req.params,
        data: req.body,
      });
    }
  );

  done();
};
