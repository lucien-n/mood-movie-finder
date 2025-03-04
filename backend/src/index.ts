import { getEnvVariable } from "./env";
import express from "express";
import { controllers } from "./modules";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  controllers.forEach((Controller) => {
    const controllerInstance = new Controller();

    app.use("/api", controllerInstance.router);

    console.log(`⚡ Served ${Controller.name}`);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
run();
