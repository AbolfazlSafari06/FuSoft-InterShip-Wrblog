import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


function Search({ setSearchValue, }) {
    const { register, handleSubmit, reset, setValue, watch, getValues, formState: { errors } } = useForm();


    const onsubmit = (data) => {
        setSearchValue(data)
    }


    return (
        <form className="container my-4" onSubmit={handleSubmit(onsubmit)}>
            <div className="row">
                <div className="col-2  col-md-3">
                    <input type="text" name="query" className="form-control" placeholder="نام مقاله" {...register("query")} />
                </div>
                <div className="col-2 col-md-3">
                    <select className="form-select" id="autoSizingSelect" name="sort" {...register("sort")} >
                        <option value="">مرتب سازی بر اساس</option>
                        <option value="latest">جدید ترین</option>
                        <option value="oldest">قدیمی ترین</option>
                    </select>
                </div>
                <div className="col-2 col-md-3">
                    <button type="submit" className="btn btn-primary">جستجو</button>
                </div>
            </div>
        </form>
    )
}

export default Search
