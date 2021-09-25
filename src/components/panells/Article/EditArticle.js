import GetParentCategory from '../Categories/GetParentCategory';
import articleService from '../../../services/articleService';
import Alert from './../../../common/Alert/Alert';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';


function EditArticle({ user }) {

    const { id } = useParams();
    const [editData, setEditData] = useState()
    const [loading, setloading] = useState(false)
    const [categoryId, setCategoryId] = useState()
    const [message, setmessage] = useState("")
    const [Error, setError] = useState() 
    const [category, setcategory] = useState()

    const { register, setValue, control, handleSubmit, formState: { errors } } = useForm();


    const getArticle = async (id) => {
        try {
            setloading(true)
            const article = await articleService.getArticel(id) 
            setCategoryId(article.CategoryId)
            setcategory(article)
            setValue("title", article?.title)
            setValue("shortDescription", article?.shortDescription)
            setValue("body", article?.body)
            setValue("image", article?.image)
            setValue("status", article?.status)
            setloading(false)
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.Message);
        }
    }

    const onSubmit = async (data) => {
        setloading(true)
        try {
             
            // console.log("data",data); 
            await articleService.EditArticle(category.id, data.title, data.shortDescription, data.body,category.createdAt,  data.status, data.userId,categoryId)
            // console.log(category.id, data.title, data.shortDescription, data.body, data.status, data.userId, );
            setmessage("ویرایش با موفقیت ثبت شد")
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }

    useEffect(() => {
        getArticle(id);
    }, [])

    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="mb-4 col-4 col-md-6 offset-md-4 offset-4 ">
                    <h2>
                        ویرایش مقاله
                    </h2>
                </div>
                <div className='col-2 col-md-2'>
                    <Link className="btn btn-primary" to="/panel/articles/">بازگشت</Link>
                </div>
            </div>
            <div className="container" >
                <div className="row my-2">
                    <GetParentCategory title="دسته بندی پدر را انتخاب کنید" setparentId={setCategoryId} />
                </div>
            </div>
            <form className="container" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-md-4">
                    <div className="col-12 col-md-6 mt-2">
                        <label htmlFor="title" className="form-label">عنوان مقاله</label>
                        <input type="text" placeholder="عنوان مقاله" className={`form-control ${errors?.title?.message ? "is-invalid" : ""} `} id="title" {...register("title", { required: "عنوان مقاله را وارد کنید", minLength: 3 })} />
                        <div className="invalid-feedback">
                            {errors?.title?.message}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-2">
                        <label htmlFor="shortDescription" className="form-label">توضیحات کوتاه مقاله</label>
                        <input type="text" placeholder="توضیحات کوتاه مقاله" className="form-control" id="shortDescription" {...register("shortDescription", { required: false })} />
                        <div className="invalid-feedback">
                            {errors?.shortDescription?.message}
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12 col-md-6 mt-2">
                        <label htmlFor="image" className="form-label">تصویر</label>
                        <input type="text" placeholder="لینک تصویر را وارد کنید" className={`form-control ${errors?.image?.message ? "is-invalid" : ""} `} id="image" {...register("image", { required: false })} />
                    </div>
                    <div className="col-12 col-md-6 mt-2">
                        <label htmlFor="status" className="form-label">وضعیت مقاله</label>
                        <select id="status" name="status" className="form-select" {...register("status")}>
                            <option value="1" selected >نمایش </option>
                            <option value="0">عدم نمایش</option>
                        </select>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-12">
                        {/* <div className={`col-12 my-4 ${errors?.body?.message ? "is-invalid" : ""} `}> */}
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
                        {!!errors?.description && (
                            <p className="text-danger">
                                <small>{errors?.description?.message}</small>
                            </p>
                        )}
                        <div className="invalid-feedback">
                            {errors?.body?.message}
                        </div>
                    </div>
                    <div className=" me-md-2 mt-3 col-12 col-md-1 ">
                        <button disabled={loading} type="submit" className=" btn btn-success" >ذخیره </button>
                    </div>
                    {/* </div> */}
                </div>
            </form>
            <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
            <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
        </div>
    )
}

const mapState = (state) => {
    return {
        user: state?.user
    }
}

export default connect(mapState, null)(EditArticle)
