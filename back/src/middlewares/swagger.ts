import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import docs from "../swagger/docs.json";

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
};
