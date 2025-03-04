import { getEnvVariable } from "./env";
import express from "express";
import modules from "./modules";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  modules.forEach((module) => {
    console.log(`⚡ Served ${module.name}`);

    for (const Controller of module.provides) {
      const controller = new Controller();
      app.use("/api", controller.router);

      console.log(`⚡ Served ${Controller.name}`);
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
run();
