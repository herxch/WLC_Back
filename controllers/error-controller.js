export const get404 = (req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
};

export const get500 = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  const status = error.statusCode || 500;
  const message = error.message;
  // const data = error.data;
  res.status(status).json({ message: message || "An unknown error occurred!" });
};
