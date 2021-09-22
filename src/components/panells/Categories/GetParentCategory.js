import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';
import Alert from './../../../common/Alert/Alert';


function GetParentCategory({ title, setparentId }) {

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
    const [nullArray, setnullArray] = useState(false)
    const [error, setError] = useState("");
    const [ParentCategorty, setParentCategorty] = useState()



    const getParents = async (data) => {
        try {
            console.log("data => ", data);
            const parents = await CategoryService.getParentCategory(data.name);
            if (Array.isArray(parents)) {
                if (parents.length === 0) { setnullArray(true) }
                setParentCategorty(parents);
            }
        } catch (error) {
            setError("مشکلی در دریافت اطلاعات.")
            console.log(error);
        }
    }
    const parentId = (p) => {
        setparentId(p.id)
        setValue("name", p.title);
        setParentCategorty()
    }
    return (
        <div> 
            <Alert type="danger" message={error} onClose={() => setError("")} ></Alert>
            <form className="container-fluid" onSubmit={handleSubmit(getParents)}>
                <div className="row alig  d-flex align-items-center">
                    <div className="col-8 col-md-4 offset-2 offset-md-6">
                        <label htmlFor="name" className="form-label">{title}  </label>
                    </div>
                    <div style={{ direction: "ltr" }} className="input-group ">
                        <input type="submit" className="btn btn-primary col-2" value="جستجو کنید" />
                        <input style={{ direction: "rtl" }} className="col-8 form-control border" type="text" name="name" id="name" {...register("name", { required: "عنوان را وارد کنید" })} />
                    </div>
                </div>
                <div className="invalid-feedback">
                    {errors?.name?.message}
                </div>
                {
                    nullArray ? <div>دسته بندی با این عنوان پیدا نشد</div> : null
                }
            </form >
            <div className="container-fluid">
                {
                    ParentCategorty && <div>
                        {
                            ParentCategorty.map((p) => (
                                <div key={p.id} className="row my-2 p-4 border bg-light parentitem">
                                    <div className="col-10">
                                        {p.title}
                                    </div>
                                    <div className="col-2">
                                        <button className="btn btn-info" onClick={() => parentId(p)}>انتخاب</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div> 
        </div >
    )
}

export default GetParentCategory



