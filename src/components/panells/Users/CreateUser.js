import React from 'react'
import { useEffect, useState } from "react";
import Alert from "../../../common/Alert/Alert";
import usersService from "../../../services/usersService";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
function CreateUser() {


    const [message, setmessage] = useState("");
    const [Error, setError] = useState("");
    const [loading, setloading] = useState(false);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = async (date) => {
        try {
            if (!loading) {
                setloading(true);
                var date = await usersService.createNewUser(date.name, date.email)
                reset();
                setmessage("کاربر با موفقیت ایجاد شد.")
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.Message);
            setloading(false)
        }
    };
    return (
        <div>
            <div className="container py-3 my-4 h-100" style={{ width: "100%" }}>
                <div className="row mb-5">
                    <div className="col-2 offset-8">
                        <h2>کاربران</h2>
                    </div>
                    <div className="col-2 text-center">
                        <Link to="/panel/users" className="btn btn-primary">بازگشت</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className=" my-4">
                    <div className="row">
                        <div className="col-12 col-md-6 ">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">نام و نام خوانوادگی</label>
                                <input type="text" className={`form-control  ${errors?.name?.message ? "is-invalid" : ""} `} id="name" name="name"  {...register("name", { required: "نام کاربر الزامیست." })} />
                                <div className="invalid-feedback">
                                    {errors?.name?.message}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">ایمیل</label>
                                <input type="email" className={`form-control  ${errors?.email?.message ? "is-invalid" : ""} `} id="email" name="email"   {...register("email", { required: "ایمیل کاربر الزامیست." })} />
                                <div className="invalid-feedback">
                                    {errors?.email?.message}
                                </div>

                            </div>
                        </div>
                    </div>
                    <button disabled={loading} className="btn btn-primary" type="submit">ذخیره</button>
                </form>

                <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
                <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
            </div>
        </div>
    )
}

export default CreateUser

