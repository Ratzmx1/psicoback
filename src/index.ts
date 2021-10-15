import mongo from "mongoose";
import express from "express";

import userRouter from "./routes/UserRoutes";
import middleware from "./routes/middleware";

const app = express();
const mongoURL =
  "mongodb+srv://admin:admin@cluster0.y28gj.mongodb.net/psico?retryWrites=true&w=majority";

app.use(express.json());

app.use("/user", userRouter);

app.get("/", middleware, (req, res) => {
  res.json(`Wena loco con id ${res.locals._id}`);
});

app.listen(3000, async () => {
  console.log("The application is listening on port 3000!");
  await mongo.connect(mongoURL);
  console.log("Db Conectada");
});
