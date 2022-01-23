import { sendData, sendError } from "@authfunctions/express";
import { logger } from "@laurenz1606/logger";
import { Router } from "express";
import { UserModel } from "../Models/User";
import { CodeModel } from "../Models/Code";

//init the express router
export const adminRouter = Router();

interface CodeData {
  code: string;
  item: number;
  location: string;
}

//the "auth" middleware
adminRouter.use((req, res, next) => {
  //get the admin key
  const adminKey = req.header("X-Admin-Key");

  //check if admin key is present
  if (!adminKey) return sendError(res, 400, 101);

  //check if admin key is valid
  if (!(adminKey === process.env.ADMIN_KEY)) return sendError(res, 403, 102);

  //process next middleware
  next();
});

//create a new code
adminRouter.post("/code", async (req, res) => {
  //add a code
  const [err, data] = await addCode(req.body);

  //check for errors
  if (err) {
    return sendError(res, 500, 110);
  }

  //send the new code to the user
  return sendData(res, 201, 100, data);
});

//create a new code
adminRouter.post("/codes", async (req, res) => {
  const codes = [];
  //add a code
  for (const code of req.body) {
    const [err, data] = await addCode(code);

    //check for errors
    if (err) {
      return sendError(res, 500, 110);
    }

    //add the code to array
    codes.push(data);
  }

  //send the new code to the user
  return sendData(res, 201, 100, codes);
});

adminRouter.delete("/unScan", async (req, res) => {
  const codes = await CodeModel.find();
  const users = await UserModel.find();

  users.forEach(async (user) => {
    try {
      user.codes = [];
      await user.save();
    } catch (error) {
      logger(String(error), "error");
    }
  });

  codes.forEach(async (code) => {
    try {
      code.scanned = [];
      await code.save();
    } catch (error) {
      logger(String(error), "error");
    }
  });

  return sendData(res, 200, 100, {});
});

//function for adding a code
async function addCode(codes: CodeData) {
  try {
    //create a new code
    const code = await CodeModel.create({
      code: codes.code,
      item: codes.item,
      location: codes.location,
    });

    return [false, code];
  } catch (err) {
    logger(String(err), "error");
    return [true, null];
  }
}
