import http from "./base"
import { useState } from "react";
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
        console.log(error.response?.data?.Message);
        throw error.response?.data?.Message;
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
        console.log(error.response?.data?.Message);
        throw error.response?.data?.Message;
    }
}
function Logout(data) {
    console.log(data);
    try {
        store.dispatch(reduxLogout(data));
        return data;
    } catch (error) {
        console.log(error.response?.data?.Message);
        throw error.response?.data?.Message;
    }
}
function isLoggedIn(data) {
    try {
        const state = store.getState();
        return !!state?.user?.token;
    } catch (error) {
        console.log(error.response?.data?.Message);
        return false;
    }
}

export default { Login, Register, Logout, isLoggedIn }
