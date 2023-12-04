//энд орж ирсэн алдааны мэдээллийг өөрийн хүссэнээр өөрчлөх боломжтой жишээ нь англи хэлээр бичигдсэн алдааг монгол болгож болно.
const errorHandler = (err, req, res, next) => {
  const error = { ...err };

  res.status(error.statusCode || 500).json({
    success: false,
    error,
    code: error.statusCode,
  });
};
module.exports = errorHandler;
