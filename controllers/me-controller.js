import { validationResult } from 'express-validator';
import HttpError from '../models/http-error.js';
import Me from '../models/me.js';

const getMeData = async (req, res, next) => {
  try {
    const meData = await Me.find({}, { _id: 0, date: 1, me: 1 })
      .sort('date')
      .lean();
    res.json({
      name: 'C',
      message: 'Fetched data successfully.',
      data: meData,
    });
  } catch (err) {
    const error = new HttpError('Fetching me data failed.', 500);
    return next(error);
  }
};

const createMeData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }
  const createdMe = new Me({
    date: req.body.date,
    me: req.body.me,
  });
  try {
    await createdMe.save();
  } catch (err) {
    const error = new HttpError('Creating me data failed.', 500);
    return next(error);
  }
  res.status(201).json({ message: 'Data created!' });
};

export { getMeData };
export { createMeData };
