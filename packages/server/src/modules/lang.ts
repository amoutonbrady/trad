import { FastifyPlugin } from "fastify";
import {
  LangCreateInput,
  LangWhereUniqueInput,
  LangUpdateInput,
} from "@prisma/client";

export const LangModule: FastifyPlugin = (app, options, done) => {
  app.get(
    "/langs",
    {
      preValidation: [app.authenticate],
    },
    async () => {
      return app.db.lang.findMany();
    }
  );

  app.get<{ Params: LangWhereUniqueInput }>(
    "/langs/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.lang.findOne({
        where: req.params,
      });
    }
  );

  app.post<{ Body: LangCreateInput }>(
    "/langs",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.lang.create({
        data: req.body,
      });
    }
  );

  app.patch<{ Params: LangWhereUniqueInput; Body: LangUpdateInput }>(
    "/langs/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.lang.update({
        where: req.params,
        data: req.body,
      });
    }
  );

  done();
};
