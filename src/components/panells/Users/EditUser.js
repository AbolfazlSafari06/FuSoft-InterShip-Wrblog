import { getSuggestedQuery } from '@testing-library/react';
import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import usersService from '../../../services/usersService';
import { useForm } from 'react-hook-form';
import Alert from "../../../common/Alert/Alert";


function EditUser() {

    const { id } = useParams()

    const [message, setmessage] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const [user, setuser] = useState()

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

    const onSubmit = async (date) => {
        try {
            if (!Loading) {
                setLoading(true);
                await usersService.upDateUser(id, date.name, date.email)
                setmessage("کاربر با موفقیت ثبت شد.")
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setError(errors?.response?.data?.Message);
            setLoading(false)
        }
    };

    const getUesr = async () => {
        try {
            if (id) {
                setLoading(true);
                const data = await usersService.getUser(id);
                setValue("email", data.email);
                setValue("name", data.name);
                setuser(data);
                console.log(data);
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.Message);
            throw error;
        }
    }


    useEffect(() => {
        getUesr();
    }, [id])

    return (
        <div>
            <div className="row my-5">
                <div className="col-2 offset-8">
                    <h2>ویرایش کاربر</h2>
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
                <button disabled={Loading} className="btn btn-primary" type="submit">ذخیره</button>
            </form>
            <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
            <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
        </div>
    )
}

export default EditUser
