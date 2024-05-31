export type TErrorSource = {
    path: string | number;
    message: string;
}[];

export type TGenericErrorResponse = {
    statusCode: number | string;
    message: string;
    errorSources: TErrorSource;
};