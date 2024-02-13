const logger = require("../logger/logger");

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
};

module.exports = requestLogger;