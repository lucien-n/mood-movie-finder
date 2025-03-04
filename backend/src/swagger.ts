import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mood Movie Finder",
      version: "1.0.0",
      description: "Recommends movies based on the current weather",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/modules/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
