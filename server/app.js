import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import postsRoutes from "./routes/api/post";

const app = express();

const { MONGO_URI } = config;

//server 보안
app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev")); //log 기록 보기

app.use(express.json());

app.get("/");
app.use("/api/post", postsRoutes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongoDB connected..."))
  .catch((e) => console.log(e));
export default app;
