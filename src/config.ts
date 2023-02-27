import Express from "express";
const app = Express();

import { config } from "dotenv";
config();

import morgan from "morgan";
app.use(morgan("dev"));

import helmet from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({origin: '*'}));

app.use(Express.json());

import authRouter from "./routes/auth";
import reportRouter  from "./routes/medical_reports";
import userRouter from "./routes/users";
app.use("/api", authRouter, reportRouter, userRouter);



export default app;