import mongo from "mongoose";
import express from "express";
import { Horas } from "./models/Hora";

const app = express();
const mongoURL = "mongodb://localhost:27017/psico";

app.use(express.json());

app.listen(3000, async () => {
  console.log("The application is listening on port 3000!");
  await mongo.connect(mongoURL);
  console.log("conectao a mongo");
  const a = await Horas.find();
  console.log(a);
});
