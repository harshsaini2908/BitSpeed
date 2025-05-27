class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    // Handle TypeORM errors
    if (err.name === 'QueryFailedError') {
        return res.status(400).json({
            error: 'Database operation failed'
        });
    }

    // Default error
    return res.status(500).json({
        error: 'Internal server error'
    });
};

module.exports = { AppError, errorHandler }; 