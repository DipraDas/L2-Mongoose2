import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
    console.log('Payload', payload);
    return {}
}

export const AuthServices = {
    loginUser
}