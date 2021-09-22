import { getSuggestedQuery } from '@testing-library/react';
import React from 'react'
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import usersService from '../../../services/usersService';
import { useForm } from 'react-hook-form';
import Alert from "../../../common/Alert/Alert";
import { connect } from "react-redux";
import CategoryService from '../../../services/CategoryService';
import GetParentCategory from './GetParentCategory';


function EditCategory() {

    const { id } = useParams()
    const [CategoryParent, setParentCategory] = useState();
    const [message, setmessage] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const [category, setcategory] = useState()
    const [Parentid, setParentid] = useState(null)

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

    const onSubmit = async (date) => {
        try {
            setLoading(true);
            await CategoryService.upDateCategories(id, date.title, date.order, Parentid)

            setmessage("دسته بندی با موفقیت ویرایش  شد.")
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError("مشکلی در ویرایش دسته بندی")
            setError(errors?.response?.data?.Message);
            setLoading(false)
        }
    };

    const getCategory = async () => {
        try {
            if (id) {
                setLoading(true);
                const data = await CategoryService.getCategory(id);
                setValue("title", data.title);
                setValue("order", data.order);
                setcategory(data);
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            setError("خطا در دریافت داده");
            setLoading(false);
            throw error;
        }
    }

    const setParent = (parentid) => {
        setParentid(parentid)
        setParentCategory();
    }

    useEffect(() => {
        getCategory();
    }, [id])

    return (
        <div className="container-md">
            <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
            <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
            <div className="row mb-5">
                <div className="col-2 offset-8">
                    <h2>دسته بندی ها</h2>
                </div>
                <div className="col-2 text-center">
                    <Link to="/panel/categories" className="btn btn-primary">بازگشت</Link>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-8 offset-2 col-md-4 offset-md-6">
                    <h4>ویرایش دسته بندی</h4>
                </div>
            </div>
            <div className="row my-5">
                <GetParentCategory setparentId={setParent} title={"دسته بندی پدر را انتخاب کنید"} />
            </div>
            <div className="row my-5">
                {
                    CategoryParent && <div>
                        {
                            CategoryParent.map((p) => (
                                <div key={p.id} className="row my-2 p-4 border bg-light parentitem">
                                    <div className="col-10">
                                        {p.title}
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-info" onClick={() => setParent(p.id)}>انتخاب</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" my-4">
                <div className="row">
                    <div className="col-12 col-md-6 ">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">عنوان </label>
                            <input type="text" className={`form-control  ${errors?.text?.message ? "is-invalid" : ""} `} id="title" name="title"  {...register("title", { required: "عنوان دسته بندی الزامیست.", maxLength: 100, minLength: 3 })} />
                            <div className="invalid-feedback">
                                {errors?.title?.message}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="order" className="form-label">ترتیب</label>
                            <input type="number" className={`form-control  ${errors?.order?.message ? "is-invalid" : ""} `} id="order" name="order"   {...register("order", { required: "ترتیب مقاله الزامیست" })} />
                            <div className="invalid-feedback">
                                {errors?.order?.message}
                            </div>
                        </div>
                    </div>
                </div>
                <button disabled={Loading} className="btn btn-primary" type="submit">ذخیره</button>
            </form>
        </div>
    )
}

export default EditCategory;
