import { logger } from "@/logger";
import type { ErrorRequestHandler, Express, RequestHandler } from "express";

export const infoLogger = (app: Express) => {
  app.use(((req, res, next) => {
    const start = Date.now();
    res.on("finish", function () {
      const duration = Date.now() - start;
      logger.info(`${req.method} ${req.url} | took ${duration}ms`);
    });

    next();
  }) satisfies RequestHandler);
};

export const errorLogger = (app: Express) => {
  app.use(((err, _req, _res, next) => {
    logger.error(`Error: ${err}`);

    next(err);
  }) satisfies ErrorRequestHandler);
};
