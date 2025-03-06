import Redis from "ioredis";
import { getEnvVariable } from "./env";

export const redis = new Redis(getEnvVariable("REDIS_URL"));
