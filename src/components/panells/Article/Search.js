import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


function Search({ loading, setSearchValue, }) {
    const { register, handleSubmit, reset, setValue, watch, getValues, formState: { errors } } = useForm();


    const onsubmit = (data) => {
        setSearchValue(data)
    }

    const onFilterSubmit=()=>{
        reset()
    }

    return (
        <form className="container-fluid my-4" onSubmit={handleSubmit(onsubmit)}>
            <div className="row">
                <div className="col-2  col-md-3">
                    <input type="text" name="query" className={`form-control  ${errors?.query?.message ? "is-invalid" : ""} `} placeholder="نام مقاله" {...register("query", { required: false })} />
                    <div className="invalid-feedback">
                        {errors?.query?.message}
                    </div>
                </div>
                <div className="col-3 col-md-4 ">
                    <select className="form-select" id="autoSizingSelect" name="sort" {...register("sort")} >
                        <option value="">مرتب سازی بر اساس</option>
                        <option value="latest">جدید ترین</option>
                        <option value="oldest">قدیمی ترین</option>
                    </select>
                </div>
                <div className="col-1 col-md-2">
                    <button type="submit" className="btn btn-primary">جستجو</button>
                </div>
                <div className="col-1 col-md-2">
                    <button onClick={onFilterSubmit} className="btn btn-primary">لیست</button>
                </div>
            </div>
        </form>
    )
}

export default Search
