import { FastifyPlugin } from "fastify";
import {
  UserCreateInput,
  UserWhereUniqueInput,
  UserUpdateInput,
} from "@prisma/client";
import bcrypt from "bcrypt";

export const UserModule: FastifyPlugin = (app, options, done) => {
  app.get(
    "/users",
    {
      preValidation: [app.authenticate],
    },
    async () => {
      return app.db.user.findMany({
        select: { id: true, email: true, name: true },
      });
    }
  );

  app.get<{ Params: UserWhereUniqueInput }>(
    "/users/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.user.findOne({
        where: req.params,
        select: { id: true, email: true, name: true },
      });
    }
  );

  app.post<{ Body: UserCreateInput }>(
    "/users",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      const password = await bcrypt.hash(req.body.password, 10);
      const data: UserCreateInput = { ...req.body, password };
      return app.db.user.create({
        data,
        select: { id: true, email: true, name: true },
      });
    }
  );

  app.patch<{ Params: UserWhereUniqueInput; Body: UserUpdateInput }>(
    "/users/:id",
    {
      preValidation: [app.authenticate],
    },
    async (req) => {
      return app.db.user.update({
        where: req.params,
        data: req.body,
        select: { id: true, email: true, name: true },
      });
    }
  );

  done();
};
