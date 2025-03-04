import cors from "cors";
import express from "express";
import { getEnvVariable } from "./env";
import modules from "./modules";

function run() {
  const port = parseInt(getEnvVariable("PORT"));
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );

  modules.forEach((Controller) => {
    const controller = new Controller();
    app.use("/api", controller.router);

    console.log(`⚡ Served ${Controller.name}`);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
run();
