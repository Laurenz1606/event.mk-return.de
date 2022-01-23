import { authenticateToken, sendData } from "@authfunctions/express";
import { logger } from "@laurenz1606/logger";
import { Router } from "express";
import { UserModel } from "../Models/User";
import { CodeModel } from "../Models/Code";

//init the express router
export const apiRouter = Router();

apiRouter.post("/scanCode", authenticateToken, async (req, res) => {
  const date = new Date();
  try {
    //get the code
    const code = await CodeModel.findOne({ code: req.body.code });

    //check if code exists
    if (!code) return sendData(res, 404, 0, { code: 2 });

    //get the user
    const user = await UserModel.findById(res.locals.payload.id);

    //check if users exists
    if (!user) return sendData(res, 404, 0, { code: 4 });

    //check if code is alredy scanned
    let scanned = false;
    user.codes.forEach((lcode) => {
      if (lcode.code === code._id) scanned = true;
    });

    //check if code is alredy scanned
    if (scanned) return sendData(res, 400, 0, { code: 1 });

    //update the user
    await UserModel.updateOne(
      { _id: res.locals.payload.id },
      { $push: { codes: { date: date, code: code._id } } },
    );

    //update the code
    await CodeModel.updateOne(
      { _id: code._id },
      { $push: { scanned: { date: date, user: user._id } } },
    );

    //send data
    return sendData(res, 200, 0, { code: 0 });
  } catch (error) {
    logger(String(error), "error");
    sendData(res, 500, 0, { code: 5 });
  }
});

apiRouter.get("/getCodes", authenticateToken, async (req, res) => {
  try {
    //get the user
    const user = await UserModel.findById(res.locals.payload.id);

    //check if users exists
    if (!user) return sendData(res, 404, 0, { code: 1, codes: [] });

    //map the array
    const codes = user.codes.map((code) => +new Date(code.date));

    //send data
    return sendData(res, 200, 0, { code: 0, codes: codes });
  } catch (error) {
    logger(String(error), "error");
    sendData(res, 500, 0, { code: 5 });
  }
});
