import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss';
import { useForm } from 'react-hook-form';
import Alert from '../../common/Alert/Alert';
import { useState } from 'react';
import authservice from '../../services/authservice';
function Register() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const onRegister = async (form) => {
        try {
            setLoading(true);
            const data = await authservice.Register(form.name, form.email, form.password, form.repassword)
            setLoading(true);

        } catch (error) {
            setError("خطا در ثبت نام کاربر");
            console.log(error);
        }

    }
    return (
        <div>
            <Alert type="danger" message={error} onClose={() => setError("")} />
            <div className="bg-white shadow p-3 rounded" id="register_box">
                <div className="p-3 border-bottom">
                    <h3>ثبت نام حساب کاربری</h3>
                </div>
                <form className="py-3  border-bottom" onSubmit={handleSubmit(onRegister)}>
                    <div className="mb-3">
                        <label htmlFor="name">نام و نام خانوادگی</label>
                        <input type="name" className={`form-control ${errors?.email ? "is-invalid" : ""} `} id="name"  {...register("name", { required: "نام و نام خانوادگی خود را وارد کنید", maxLength: { value: 100, message: "نام و نام خانوادگی بلند است" }, minLength: { value: 5, message: "نام و نام خانوادگی  کوتاه است" } })} />
                        <div className="invalid-feedback">{errors?.name?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">ایمیل</label>
                        <input type="email" className={`form-control ${errors?.email ? "is-invalid" : ""}`} {...register("email", { required: "ایمیل خود را وارد کنید " })} id="email" />
                        <div className="invalid-feedback">{errors?.email?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">کلمه عبور</label>
                        <input type="password" className={`form-control ${errors?.password ? "is-invalid" : ""}`} {...register("password", { required: "رمز عبور خود را وارد کنید ", minLength: { value: 8, message: " رمز عبور حداقل 8 کاراکتر میتواند باشد" } })} id="password" />
                        <div className="invalid-feedback">{errors?.password?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repassword">تکرار کلمه عبور</label>
                        <input type="password" className={`form-control ${errors?.repassword ? "is-invalid" : ""}`} {...register("repassword", {
                            required: "تکرار رمز عبور خود را وارد کنید ", minLength: { value: 8, message: "تکرار رمز عبور کوتاه است" }, validate: (value) => {
                                if (value !== watch("password")) {
                                    return "تکرار رمز عبور با رمز عبور مطابقت ندارد."
                                }
                            }
                        })} id="repassword" />
                        <div className="invalid-feedback">{errors?.repassword?.message}</div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        ورود
                    </button>
                </form>
                <div className="text-center fs-6 py-3">
                    <Link to="/auth/Register"> ثبت نام  </Link>
                </div>
            </div>
            <div className="my-3 text-white text-center   fs-6 fc-primary">
                <i className="fa fa-home"></i>
                <Link className=" text-white " to="/mainpage">  بازگشت به خانه </Link>
            </div>
        </div>
    )
}

export default Register
