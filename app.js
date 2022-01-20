const express = require("express");
const mongoose = require("mongoose");
const records = require("./models/records");
const moment = require("moment");
const httpStatusCodes = require("./models/httpStatusCodes");
const util = require("./util");

const app = express();
app.use(express.json());

//Connecting MongoDB
const dbPath = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
mongoose.connect(dbPath);

//middle ware
app.use((request, response, next) => {
  response.send(console.log(dbPath));
  //it would send to the next middle ware function
  next();
});

app.post("/api/getRecords", async (req, res, next) => {  
  try {
    //Validations
    if (util.isEmptyApiRequest(req.body))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send(sendResponse(httpStatusCodes.BAD_REQUEST, "Empty Body"));

    if (!util.validateDateFormat(req.body.startDate, "YYYY-MM-DD", true))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send(
          sendResponse(
            httpStatusCodes.BAD_REQUEST,
            "startDate is not in a correct format, assuming YYYY-MM-DD format"
          )
        );

    if (!util.validateDateFormat(req.body.endDate, "YYYY-MM-DD", true))    
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send(
          sendResponse(
            httpStatusCodes.BAD_REQUEST,
            "endDate is not in a correct format, assuming YYYY-MM-DD format"
          )
        );

    if (
      !Number.isInteger(req.body.minCount) ||
      !Number.isInteger(req.body.maxCount)
    )
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send(
          sendResponse(
            httpStatusCodes.BAD_REQUEST,
            "Expecting an integer value"
          )
        );
    //////////////////////

    //Create UTC to handle -1 day issue with JavaScript:
    const startDate = moment.utc(req.body.startDate.toLocaleString());
    const endDate = moment.utc(req.body.endDate.toLocaleString());

    records
      .aggregate([
        { $set: { key: "$_id" } },
        { $unset: "_id" },
        {
          $project: {
            key: 1,
            createdAt: 1,
            totalCount: {
              $sum: "$counts",
            },
          },
        },
        {
          $match: {
            totalCount: {
              $gt: req.body.minCount,
              $lt: req.body.maxCount,
            },
            createdAt: {
              $gt: new Date(startDate),
              $lt: new Date(endDate),
            },
          },
        },
      ])
      .then((filterData) => {
        return res
          .status(httpStatusCodes.OK)
          .json(sendResponse(httpStatusCodes.OK, "Success", filterData));
      })
      .catch((error) => {
        return res
          .status(httpStatusCodes.INTERNAL_SERVER)
          .send(sendResponse(httpStatusCodes.INTERNAL_SERVER, error.message));
      });
  } catch (error) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER)
      .send(sendResponse(httpStatusCodes.INTERNAL_SERVER, error.message));
  }
});

const getRecords = () => {
  
}

const sendResponse = (statusCode, msg, records) => {
  return {
    code: statusCode,
    msg: msg,
    records: records,
  };
};

module.exports = app;
