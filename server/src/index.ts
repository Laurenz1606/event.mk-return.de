import { config } from "dotenv";

//load the env vars
if (process.env.NODE_ENV !== "production") {
  config();
}

//load the mongoose connection
import "./mongoose";

//load the redis connection
import "./redisClient";

//load the auth methods
import "./auth";

//load the express app
import "./express";
