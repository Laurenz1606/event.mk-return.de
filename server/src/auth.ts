import { use, setLogger } from "@authfunctions/express";
import { logger } from "@laurenz1606/logger";
import { v4 } from "uuid";
import { UserModel } from "./Models/User";
import { redisClient } from "./redisClient";

//set the loger
setLogger(logger);

//get a user by name
use.getUserName(() => [false, null]);

//get a user by mail
use.getUserMail(async (email) => {
  try {
    //get the user from the db
    const user = await UserModel.findOne({ email: email });

    //return the user
    return [
      false,
      user
        ? {
            email: user.email,
            hashedPassword: user.hashedPassword,
            id: user._id,
            username: v4(),
          }
        : null,
    ];
  } catch (error) {
    logger(String(error), "error");
    return [true, null];
  }
});

//store the user
use.storeUser(async (email, _, hashedPassword) => {
  try {
    //create the user
    const user = new UserModel({
      email: email,
      hashedPassword: hashedPassword,
    });

    //save the user
    await user.save();

    //return no error
    return [false];
  } catch (error) {
    logger(String(error), "error");
    return [true];
  }
});

//store the token
use.storeToken(async (token) => {
  try {
    //add token
    await redisClient.sadd(process.env.REDIS_SET || "", token);

    //return false
    return [false];
  } catch (error) {
    logger(String(error), "error");
    return [true];
  }
});

//delete the token
use.deleteToken(async (token) => {
  try {
    //add token
    await redisClient.srem(process.env.REDIS_SET || "", token);

    //return false
    return [false];
  } catch (error) {
    logger(String(error), "error");
    return [true];
  }
});

//check the token
use.checkToken(async (token) => {
  try {
    //add token
    const included = await redisClient.sismember(
      process.env.REDIS_SET || "",
      token,
    );

    //return false
    return [false, Boolean(included)];
  } catch (error) {
    logger(String(error), "error");
    return [true, false];
  }
});
