//алдааг хянан ажиллуулах зорилготой middleware ба controller parameter-ээр хүлээн авч түүнийгээ resolve function-оор ажиллуулаад амжилттай бол хүсэлтээ амжилттай төгсгөж хэрэглэгчид data-г өгнө харин амжилтгүй бол next буву дараагийн middleware буюу errorHandler-лүү шилжинэ.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
