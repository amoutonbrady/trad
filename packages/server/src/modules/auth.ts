import bcrypt from "bcrypt";
import { FastifyPlugin } from "fastify";

export const AuthModule: FastifyPlugin = (app, options, done) => {
  app.post<{ Body: { email: string; password: string } }>(
    "/login",
    async (req, rep) => {
      console.log("hi");
      const user = await app.db.user.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        rep.code(401);
        rep.send("Wrong password");
        return;
      }

      const isAuthenticated = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isAuthenticated) {
        rep.code(401);
        rep.send("Wrong password");
        return;
      }

      const { password: _, ...passwordLessUser } = user;
      return app.jwt.sign({ user: passwordLessUser });
    }
  );

  done();
};
