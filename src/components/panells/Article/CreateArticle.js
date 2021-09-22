import GetParentCategory from './../Categories/GetParentCategory';
import articleService from '../../../services/articleService';
import usersService from "../../../services/usersService";
import Alert from "../../../common/Alert/Alert";

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm, Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import React from 'react'

function CreateArticle({ user }) {
    const [message, setmessage] = useState("");
    const [content, setContent] = useState("")
    const [Error, setError] = useState("");
    const [parentCategoryId, setparentCategoryId] = useState()
    const [loading, setloading] = useState(false);

    const { register, setValue, control, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            if (!loading) {
                setloading(true);
                console.log(data);
                var date = await articleService.createNewArticle(data.name, data.shortdescription, data.body, +data.showArticle, user.id, parentCategoryId)
                await articleService.uploadImage(data.image[0])
                setmessage("مقاله با موفقیت ایجاد شد.")
                reset();
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.Message);
            setloading(false)
        }
    };

    useEffect(() => {
        register("body", {
            required: true,
        });
    }, []);

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
                <GetParentCategory title={"دسته بندی را انتخاب کنید"} setparentId={setparentCategoryId} />
                <form onSubmit={handleSubmit(onSubmit)} className=" my-4">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">نام مقاله</label>
                                <input type="text" className={`form-control  ${errors?.name?.message ? "is-invalid" : ""} `} id="name" name="name"  {...register("name", { required: "نام مقاله الزامیست." })} />
                                <div className="invalid-feedback">
                                    {errors?.name?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <div className="mb-3">
                                <label htmlFor="shortdescription" className="form-label"> توضیحات کوتاه  </label>
                                <input type="text" className={`form-control ${errors?.shortdescription?.message ? "is-invalid" : ""} `} id="shortdescription" name="shortdescription" {...register("shortdescription")} />
                                <div className="invalid-feedback">
                                    {errors?.shortdescription?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <label htmlFor="showArticle" className="form-label">وضعیت مقاله</label>
                            <select id="showArticle" name="showArticle" className="form-select" {...register("showArticle")}>
                                <option value="1" selected >نمایش </option>
                                <option value="0">عدم نمایش</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 ">
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label"> تصویر مقاله </label>
                                <input type="file" name="image" {...register("image", { required: "لطفا تصویر مقاله را انتخاب کنید", })} className="form-control mb-4" />
                                <div className="invalid-feedback">
                                    {errors?.image?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 my-4 ${errors?.body?.message ? "is-invalid" : ""} `}>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>مقاله خود را وارد کنید</p>"
                            onReady={(editor) => {
                                const data = editor.getData();
                                setValue("body", data);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue("body", data);
                            }}
                        />
                        <div className="invalid-feedback">
                            {errors?.body?.message}
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

const mapState = (state) => {
    return {
        user: state?.user
    }
}

export default connect(mapState, null)(CreateArticle)

