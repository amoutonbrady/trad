import fastify, { preValidationHookHandler } from "fastify";
import jwt from "fastify-jwt";
import cors from "fastify-cors";
import { PrismaClient } from "@prisma/client";
import {
  UserModule,
  AuthModule,
  GroupModule,
  TranslationModule,
  ProjectModule,
  LangModule,
} from "./modules";

const app = fastify();

const prisma = new PrismaClient();
app.decorate("db", prisma);
app.register(jwt, { secret: "hello" });
app.register(cors, { origin: true });

const authenticate: preValidationHookHandler = async (req, rep, done) => {
  try {
    await req.jwtVerify();
    done();
  } catch (err) {
    rep.send(err);
  }
};

app.decorate("authenticate", authenticate);

app.register(AuthModule);
app.register(UserModule);
app.register(GroupModule);
app.register(TranslationModule);
app.register(ProjectModule);
app.register(LangModule);

app.listen(3001, "192.168.1.38", () =>
  console.log("🚀 Server ready at: http://localhost:3001\n⭐️")
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
    authenticate: preValidationHookHandler;
  }
}
