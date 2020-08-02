import { FastifyPlugin } from "fastify";
import {
  GroupCreateInput,
  GroupWhereUniqueInput,
  GroupUpdateInput,
} from "@prisma/client";

export const GroupModule: FastifyPlugin = (app, options, done) => {
  app.get(
    "/groups",
    {
      preValidation: [app.authenticate],
    },
    async () => {
      return app.db.group.findMany();
    }
  );

  app.get<{ Params: GroupWhereUniqueInput }>(
    "/groups/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.group.findOne({
        where: req.params,
      });
    }
  );

  app.post<{ Body: GroupCreateInput }>(
    "/groups",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.group.create({
        data: req.body,
      });
    }
  );

  app.patch<{ Params: GroupWhereUniqueInput; Body: GroupUpdateInput }>(
    "/groups/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.group.update({
        where: req.params,
        data: req.body,
      });
    }
  );

  done();
};
