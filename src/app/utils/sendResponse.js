export const sendResponse = (res, data) => {
  res.status(data.status).json({
    status: data.status,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
