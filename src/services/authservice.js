import http from "./base"
import { store } from "../redux/store";
import { login as reduxLogin, register as reduxRegister, logout as reduxLogout } from "../redux/actions";

async function Login(email, password) {
    try {
        const { data } = await http.post(
            "auth/login",
            { email, password }
        )
        store.dispatch(reduxLogin(data));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function Register(name, email, password, passwordConfirm) {
    try {
        const { data } = await http.post(
            "auth/register",
            { name, email, password, passwordConfirm }
        )
        store.dispatch(reduxRegister(data));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
function Logout(data) {
    try {
        store.dispatch(reduxLogout(data));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
function isLoggedIn(data) {
    try {
        const state = store.getState();
        return !!state?.user?.token;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default { Login, Register, Logout, isLoggedIn }
