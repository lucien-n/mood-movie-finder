import { getEnvVariable } from "./env";
import express from "express";
import modules from "./modules";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  modules.forEach((module) => {
    const { path, router } = module();

    app.use(path, router);

    console.log(`⚡ Served module ${path}`);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
run();
