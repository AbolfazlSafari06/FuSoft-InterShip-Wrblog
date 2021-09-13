import { LOGIN, LOGOUT, REGISTER } from "./type"

export const login = (user) => {
    return {
        type: LOGIN,
        payLoad: user
    }
}
export const logout = (user) => {
    return {
        type: LOGOUT,
        payLoad: user
    }
}
export const register = (user) => {
    return {
        type: REGISTER,
        payLoad: user
    }
}