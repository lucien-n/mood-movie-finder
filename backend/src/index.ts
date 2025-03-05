import express from "express";
import { getEnvVariable } from "./env";
import middlewares from "./middlewares";
import controllers from "./routes";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  middlewares.forEach((middleware) => middleware(app));

  controllers.forEach((Controller) => {
    const controller = new Controller();
    app.use("/api", controller.router);

    console.log(`⚡ Served ${Controller.name}`);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
run();
