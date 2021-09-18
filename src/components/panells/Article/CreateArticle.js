import articleService from '../../../services/articleService';
import usersService from "../../../services/usersService";
import Alert from "../../../common/Alert/Alert";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import React from 'react'


function CreateArticle() {
    const [message, setmessage] = useState("");
    const [content, setContent] = useState("")
    const [Error, setError] = useState("");
    const [loading, setloading] = useState(false);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = async (date) => {
        try {
            if (!loading) {
                setloading(true);
                // var date = await articleService.createNewArticle(date.name, date.email, date.password, date.IsAdmin)
                console.log(errors);
                reset();
                setmessage("مقاله با موفقیت ایجاد شد.")
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
                        <h2>مقالات</h2>
                    </div>
                    <div className="col-2 text-center">
                        <Link to="/panel/articles" className="btn btn-primary">بازگشت</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className=" my-4">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">نام مقاله</label>
                                <input type="text" className={`form-control  ${errors?.name?.message ? "is-invalid" : ""} `} id="name" name="name"  {...register("name", { required: "نام کاربر الزامیست." })} />
                                <div className="invalid-feedback">
                                    {errors?.name?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">سرتیتر</label>
                                <input type="email" className={`form-control  ${errors?.email?.message ? "is-invalid" : ""} `} id="email" name="email"   {...register("email", { required: "ایمیل کاربر الزامیست." })} />
                                <div className="invalid-feedback">
                                    {errors?.email?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">رمز عبور</label>
                                <input type="password" className={`form-control ${errors?.password?.message ? "is-invalid" : ""} `} id="password" name="password" {...register("password", {
                                    required: "لطفا رمز عبور کاربر را وارد کنید",
                                    pattern: {
                                        value:
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                        message:
                                            "رمز عبور باید شامل حروف، عدد و حداقل یک کاراکتر خاص باشد",
                                    },
                                })} />
                                <div className="invalid-feedback">
                                    {errors?.password?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 my-4 ">
                        {/* <Controller
                            render={({ field }) => ( */}
                                <CKEditor
                                    editor={ClassicEditor}
                                    data="متن مقاله خود را اینجا وارد کنید"
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data);
                                        console.log(typeof(data));
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            {/* )}
                        /> */}
                    </div>

                    <button disabled={loading} className="btn btn-primary" type="submit">ذخیره</button>
                </form>

                <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
                <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
            </div>
        </div>
    )
}

export default CreateArticle

