import HttpError from '../models/http-error.js';
import WlPw from '../models/pw.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getPwData = async (req, res, next) => {
  const { user, password } = req.body;
  let isValidPassword = false;
  try {
    const pwData = await WlPw.findOne(
      { user: user },
      { _id: 0, user: 1, password: 1 }
    );
    isValidPassword = await bcrypt.compare(password, pwData.password);

    if (!isValidPassword) {
      const error = new HttpError('Login failed.', 500);
      return next(error);
    }

    const expiresIn = '3600000';
    const token = jwt.sign({ username: user }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });

    res.status(200).json({
      message: 'Login successfully.',
      token: token,
      expiresIn: expiresIn,
      username: pwData.user,
    });
  } catch (err) {
    const error = new HttpError('Login failed.', 500);
    return next(error);
  }
};

const createPwData = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new HttpError(errors.errors[0].msg, 422));
  // }
  const { user, password } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could not auth.', 500);
    return next(error);
  }
  const createdPw = new WlPw({
    user: user,
    password: hashedPassword,
  });
  try {
    await createdPw.save();
  } catch (err) {
    const error = new HttpError('Creating Pw failed.', 500);
    return next(error);
  }
  res.status(201).json({ message: 'Pw created!' });
};

export { getPwData };
export { createPwData };
