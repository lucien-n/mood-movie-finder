import { getEnvVariable } from "./env";
import express from "express";
import modules from "./modules";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  modules.forEach((module) => {
    const { path, router } = module();
    const fullPath = `/api${path}`;

    app.use(fullPath, router);

    console.log(`⚡ Served module ${fullPath}`);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
run();
