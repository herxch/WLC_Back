import { validationResult } from "express-validator";
import HttpError from "../models/http-error.js";
import Weight from "../models/weight.js";

export const getHData = async (req, res, next) => {
  try {
    const username = req.params.name;
    const HData = await Weight.find({ name: username }, { _id: 0, value: 1 })
      .sort({ value: -1 })
      .limit(1)
      .lean();
    res.json({
      name: username,
      message: "Fetched data successfully.",
      data: HData[0].value,
    });
  } catch (err) {
    const error = new HttpError(`Fetching ${username} data failed.`, 500);
    return next(error);
  }
};

export const getLData = async (req, res, next) => {
  try {
    const username = req.params.name;
    const LData = await Weight.find({ name: username }, { _id: 0, value: 1 })
      .sort({ value: 1 })
      .limit(1)
      .lean();
    res.json({
      name: username,
      message: "Fetched data successfully.",
      data: LData[0].value,
    });
  } catch (err) {
    const error = new HttpError(`Fetching ${username} data failed.`, 500);
    return next(error);
  }
};

export const getData = async (req, res, next) => {
  try {
    const username = req.params.name;
    // let firstDay = new Date();
    // firstDay.setDate(firstDay.getDate() - 15);
    // const strFirstDay = firstDay.toLocaleDateString('en-CA');
    const data = await Weight.find(
      {
        name: username,
        // date: {
        //   $gte: strFirstDay,
        // },
      },
      { _id: 0, date: 1, value: 1 }
    )
      .sort("date")
      .lean();
    res.json({
      name: username,
      message: "Fetched data successfully.",
      data: data,
    });
  } catch (err) {
    const error = new HttpError(`Fetching ${username} data failed.`, 500);
    return next(error);
  }
};

export const createData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }
  const username = req.params.name;
  const data = new Weight({
    date: req.body.date,
    name: username,
    value: req.body.value,
  });
  try {
    await data.save();
  } catch (err) {
    const error = new HttpError(`Creating ${username} data failed.`, 500);
    return next(error);
  }
  res.status(201).json({ message: `${username} data created!` });
};

// export { getXData };
// export { createXData };
