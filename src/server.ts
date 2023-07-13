import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ordersRouter } from "./api/routes/orders";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/orders", ordersRouter);

app.listen(process.env.APP_PORT);
