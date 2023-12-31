class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // super() is the same as Error.call(this, message)

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 400 is fail, 500 is error
    this.isOperational = true; // this is a property that we created

    Error.captureStackTrace(this, this.constructor); // this will not appear in the stack trace
  }
}

module.exports = AppError;
