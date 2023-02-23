import express from 'express';
import mongoose from 'mongoose';

import meDataRoutes from './routes/me-routes.js';
import xDataRoutes from './routes/x-routes.js';
import pwRoutes from './routes/pw-routes.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Expose-Headers', 'username');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/me', meDataRoutes);
app.use('/api/x', xDataRoutes);
app.use('/api/pw', pwRoutes);

app.use('/', (req, res, next) => {
  res.write('<h1>HelloW</h1>');
  res.end();
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  const status = error.statusCode || 500;
  const message = error.message;
  // const data = error.data;
  res.status(status).json({ message: message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(process.env.PORT || 80);
  })
  .catch((err) => {
    console.error(err);
  });
