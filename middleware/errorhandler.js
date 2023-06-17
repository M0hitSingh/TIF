const errorHandlerMiddleware = (err, req, res, next) => {
    err.status = err.status || { code: 500, message: "error" };
    err.isOperational = err.isOperational ? true : err.isOperational === false ? false : true;

    const logError = `StatusCode: ${err.status.code} | Message: ${err.message} \n${err.stack}`;
    console.log(logError)
    return res.json(logError)
};

module.exports = errorHandlerMiddleware;