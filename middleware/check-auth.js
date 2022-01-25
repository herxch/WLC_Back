import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error.js';

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};
