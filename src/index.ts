import mongo from "mongoose";
import express from "express";

import userRouter from "./routes/UserRoutes";
import hourRouter from "./routes/HorasRoutes";
import middleware from "./routes/middleware";

const app = express();
const mongoURL =
  "mongodb+srv://admin:admin@cluster0.y28gj.mongodb.net/psico?retryWrites=true&w=majority";

app.use(express.json());

app.use("/user", userRouter);
app.use("/hour", hourRouter);

app.listen(3000, async () => {
  console.log("The application is listening on port 3000!");
  await mongo.connect(mongoURL);
  console.log("Db Conectada");
});
