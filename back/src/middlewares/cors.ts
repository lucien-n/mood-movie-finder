import cors from "cors";
import { Express } from "express";

export default (app: Express) => {
  app.use(
    cors({
      origin: ["http://localhost:3001", "https://mmf.lucienn.dev", "*"],
    })
  );
};
