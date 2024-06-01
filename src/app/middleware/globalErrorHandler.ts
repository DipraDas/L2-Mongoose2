import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/appError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // Setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!'

    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources
    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources
    }
    else if (err?.name === "CastError") {
        const simplifiedErros = handleCastError(err);

        statusCode = simplifiedErros?.statusCode;
        message = simplifiedErros?.message;
        errorSources = simplifiedErros?.errorSources;
    }
    else if (err?.code === 11000) {
        const simplifiedErros = handleDuplicateError(err);

        statusCode = simplifiedErros?.statusCode;
        message = simplifiedErros?.message;
        errorSources = simplifiedErros?.errorSources;
    }
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : 'null'
    })
}

export default globalErrorHandler;