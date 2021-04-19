const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: "error",
        message: err.message,
        error: err,
        request: {
            method: req.method,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        }
    });
};

module.exports = errorHandler;