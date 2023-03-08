import express from 'express';
import mongoose from 'mongoose';

// import meDataRoutes from "./routes/me-routes";
// import xDataRoutes from "./routes/x-routes";
import pwRoutes from './routes/pw-routes.js';
import weightRoutes from './routes/weight-routes.js';
import { get404, get500 } from './controllers/error-controller.js';

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

// app.use("/api/me", meDataRoutes);
// app.use("/api/x", xDataRoutes);
app.use('/api/pw', pwRoutes);

app.use('/api', weightRoutes);

app.use(get500);

app.use(get404);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(process.env.PORT || 80); //change the port to 80 in production
  })
  .catch((err) => {
    console.error(err);
  });
