const errorHandler = (err, req, res, next) => {
  const error = { ...err };

  res.status(error.statusCode || 500).json({
    success: false,
    error,
    code: error.statusCode,
  });
};
module.exports = errorHandler;
