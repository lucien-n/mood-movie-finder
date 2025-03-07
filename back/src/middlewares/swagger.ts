import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import swaggerDocs from "@/docs/swagger.json";

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
