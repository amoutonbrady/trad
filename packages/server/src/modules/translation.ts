import { FastifyPlugin } from "fastify";
import {
  TranslationCreateInput,
  TranslationWhereUniqueInput,
  TranslationUpdateInput,
} from "@prisma/client";

export const TranslationModule: FastifyPlugin = (app, options, done) => {
  app.get(
    "/translations",
    {
      preValidation: [app.authenticate],
    },
    async () => {
      return app.db.translation.findMany();
    }
  );

  app.get<{ Params: TranslationWhereUniqueInput }>(
    "/translations/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.translation.findOne({
        where: req.params,
      });
    }
  );

  app.post<{ Body: TranslationCreateInput }>(
    "/translations",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.translation.create({
        data: req.body,
      });
    }
  );

  app.patch<{
    Params: TranslationWhereUniqueInput;
    Body: TranslationUpdateInput;
  }>(
    "/translations/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.translation.update({
        where: req.params,
        data: req.body,
      });
    }
  );

  done();
};
