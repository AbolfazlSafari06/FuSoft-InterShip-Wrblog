import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import authservice from '../../services/authservice';
import Alert from '../../common/Alert/Alert';
import { useState } from 'react';
import './style.scss'

function Login() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const onLogin = async (form) => {

        try {
            console.log(form.email, form.password);
            setLoading(true);
            const data = await authservice.Login(form.email, form.password)
            console.log(data);
            setLoading(true);

        } catch (error) {
            setError("خطا در ورود کاربر");
            console.log(error);
        }

    }

    return (
        <div>
            <div className="bg-white shadow p-3 rounded">
                <div className="p-3 border-bottom">
                    <h3>ورود به حساب کاربری</h3>
                </div>
                <form className="py-3  border-bottom" onSubmit={handleSubmit(onLogin)}>
                    <div className="mb-3">
                        <label htmlFor="email">ایمیل</label>
                        <input type="email" className={`form-control ${errors?.email ? "is-invalid" : ""} `} id="email" {...register("email", { required: "ایمیل الزامی است" })} />
                        <div className="invalid-feedback">{errors?.email?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">کلمه عبور</label>
                        <input type="password"
                            className={`form-control ${errors?.password ? "is-invalid" : ""} `} id="password" {...register("password",
                                { required: "رمز عبور الزامی است", minLength: { value: 8, message: "رمز عبور کوتاه است" } })}
                        />
                        <div className="invalid-feedback">{errors?.password?.message}</div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        ورود
                    </button>
                </form>
                <div className="text-center fs-6 py-3">
                    <Link to="/auth/login"> ورود</Link>
                    <Link id="registerlink" to="/auth/register"> ثبت نام</Link>
                </div>
            </div>
            <div className="my-3 text-white text-center   fs-6 fc-primary">
                <i className="fa fa-home"></i>
                <Link className=" text-white " to="/mainpage">  بازگشت به خانه </Link>
            </div>
            <Alert type="danger" message={error} onClose={() => setError("")} />

        </div>
    )
}

export default Login
