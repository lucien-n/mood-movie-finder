import express from "express";
import { getEnvVariable } from "./env";
import controllers from "./routes";
import { setupSwagger } from "./swagger";
import { setupCors } from "./cors";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  setupCors(app);
  setupSwagger(app);

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
