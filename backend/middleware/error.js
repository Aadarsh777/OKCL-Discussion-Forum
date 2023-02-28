const ErrorHandler = require('./errorhandler');

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";

   // Wrong MongoDB id Error
   if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      err = new ErrorHandler(message, 400);
   }

   // Mongoose Duplicate Key error
   if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message, 400);
   }

   // Wrong JWT error
   if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is Invalid, try again.`;
      err = new ErrorHandler(message, 400);
   }

   // JWT Expire Error
   if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is Invalid, try again.`;
      err = new ErrorHandler(message, 400);
   }

   res.status(err.statusCode).json({
      success: false,
      error: err.stack,
      message: err.message
   })
}