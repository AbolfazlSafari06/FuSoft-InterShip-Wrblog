import { object } from 'prop-types';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';
import Alert from './../../../common/Alert/Alert';
import GetParentCategory from './GetParentCategory';


function CreateCategory() {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const [ParentCategorty, setParentCategorty] = useState()
    const [error, seterror] = useState("")
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState("");
    const [Error, setError] = useState("");
    const [parentId, setparentId] = useState(null)
    let parentName = watch("name")

    const onSubmit = async (data) => {
        let order = 0;
        try {
            setloading(true)
            // const parents = await CategoryService.createNewCategory(data.categoryName, order, parentId);
            setParentId()
            setmessage("دسته بندی با موفقیت ایجاد شد.")
            setloading(false)
        } catch (error) {
            console.log(error);
            seterror("مشکلی در ایجاد دسته بندی.");
            setloading(false)
        }
    }
    function setParentId(id) {
        setparentId(id);
        setParentCategorty();
    }
    return (
        <div className="container-sm ">
            <div className="row">
                <GetParentCategory setparentId={setparentId} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="my-4">نام دسته بندی را انتخاب کنید : </h4>
                    <input type="text" className={`form-control $${errors?.categoryName?.message ? "is-invalid" : ""} `} id="categoryName" name="categoryName" placeholder="نام دسته بندی"  {...register("categoryName", { required: "نام دسته بندی الزامیست", maxLength: 100, minLength: 3 })} />
                    <div className="invalid-feedback">
                        {errors?.categoryName?.message}
                    </div>
                    <button disabled={loading} className="btn btn-primary my-4" type="submit">ذخیره</button>
                </form>
                <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
                <Alert type="danger" message={error} onClose={() => setError("")} ></Alert>
            </div>
        </div >
    )
}

export default CreateCategory


