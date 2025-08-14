const apiResponse = (
  res,
  message,
  statusCode,
  success,
  data = null,
  error = null
) => {
  return res.status(statusCode).json({
    message,
    data,
    success,
    error,
  });
};

module.exports = apiResponse;
