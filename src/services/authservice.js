import http from "./base"

async function Login(email, password) {
    try {
        const { data } = await http.post(
            "auth/login",
            { email, password }
        )
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
            { name, email, password,passwordConfirm }
        )
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default { Login, Register }
