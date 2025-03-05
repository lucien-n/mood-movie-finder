import { logger } from "@/logger";
import type { Express, NextFunction, Request, Response } from "express";

export const infoLogger = (app: Express) => {
  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.url}`);

    next();
  });
};

export const errorLogger = (app: Express) => {
  app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
    logger.error(err);

    next(err);
  });
};
