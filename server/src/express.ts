import { router } from "@authfunctions/express";
import { logger } from "@laurenz1606/logger";
import cors from "cors";
import express from "express";
import { adminRouter } from "./Routes/admin";
import { apiRouter } from "./Routes/api";

//init the app
const app = express();
app.use(express.json());
app.use(cors());

//use the routers
app.use("/auth", router);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

//listen on the port
app.listen(process.env.EXPRESS_PORT, () => {
  logger(`Express listening on Port ${process.env.EXPRESS_PORT}!`, "info");
});
