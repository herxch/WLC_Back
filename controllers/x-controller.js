import { validationResult } from 'express-validator';
import HttpError from '../models/http-error.js';
import X from '../models/x.js';

export const getXHData = async (req, res, next) => {
  try {
    const xHData = await X.find({}, { _id: 0, x: 1 })
      .sort({ x: -1 })
      .limit(1)
      .lean();
    res.json({
      name: 'X',
      message: 'Fetched data successfully.',
      data: xHData[0].x,
    });
  } catch (err) {
    const error = new HttpError('Fetching x data failed.', 500);
    return next(error);
  }
};

export const getXLData = async (req, res, next) => {
  try {
    const xLData = await X.find({}, { _id: 0, x: 1 })
      .sort({ x: 1 })
      .limit(1)
      .lean();
    res.json({
      name: 'C',
      message: 'Fetched data successfully.',
      data: xLData[0].x,
    });
  } catch (err) {
    const error = new HttpError('Fetching x data failed.', 500);
    return next(error);
  }
};

export const getXData = async (req, res, next) => {
  try {
    // let firstDay = new Date();
    // firstDay.setDate(firstDay.getDate() - 15);
    // const strFirstDay = firstDay.toLocaleDateString('en-CA');
    const xData = await X.find(
      {
        // date: {
        //   $gte: strFirstDay,
        // },
      },
      { _id: 0, date: 1, x: 1 }
    )
      .sort('date')
      .lean();
    res.json({ name: 'X', message: 'Fetched data successfully.', data: xData });
  } catch (err) {
    const error = new HttpError('Fetching x data failed.', 500);
    return next(error);
  }
};

export const createXData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }
  const createdX = new X({
    date: req.body.date,
    x: req.body.x,
  });
  try {
    await createdX.save();
  } catch (err) {
    const error = new HttpError('Creating x data failed.', 500);
    return next(error);
  }
  res.status(201).json({ message: 'Data created!' });
};

// export { getXData };
// export { createXData };
