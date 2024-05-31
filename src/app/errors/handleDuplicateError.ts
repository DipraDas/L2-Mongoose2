/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const regex = /"([^"]+?)"/;

    // Extract the value
    const matchRegex = err.errmsg.match(regex);
    const duplicateValue = matchRegex[1];

    const errorSources = [
        {
            path: "",
            message: `${duplicateValue} already exists`,
        },
    ];
    const statusCode = 400;

    return {
        statusCode,
        message: "Duplicate value entry",
        errorSources,
    };
};

export default handleDuplicateError;