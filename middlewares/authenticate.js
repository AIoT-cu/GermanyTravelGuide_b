const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const authenticate = (roles) => {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("Permission denied", 403));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.includes(decodedToken.role)) {
        req.userData = { userId: decodedToken.userId };
        next();
      } else {
        return next(new AppError("Permission denied", 403));
      }
    } catch (error) {
      return next(new AppError("Permission denied", 403));
    }
  };
};

module.exports = authenticate;
