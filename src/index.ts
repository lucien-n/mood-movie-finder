import { getEnvVariable } from "./env";
import express from "express";
import { getWeatherByCity } from "./weather";

const PORT = parseInt(getEnvVariable("PORT"));
const app = express();

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const weather = await getWeatherByCity(city);

    res.json(weather);
  } catch (error) {
    console.error(`Error while getting weather by city "${city}":`, error);

    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listenning on port ${PORT}`);
});
