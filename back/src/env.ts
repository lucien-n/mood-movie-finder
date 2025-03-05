import dotenv from "dotenv";
dotenv.config();

export const getEnvVariable = (key: string): string => {
  const envVar = process.env[key];
  if (!envVar) {
    throw new Error(`Could not find "${key}" env variable`);
  }

  return envVar;
};
