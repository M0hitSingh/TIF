const sendErrorForDev = (err, res) => {
    res.status(err.status.code || 500).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const errorHandlerMiddleware = (err, req, res, next) => {
    err.status = err.status || { code: 500, message: "error" };
    err.isOperational = err.isOperational ? true : err.isOperational === false ? false : true;
    sendErrorForDev(err, res);
};

module.exports = errorHandlerMiddleware;