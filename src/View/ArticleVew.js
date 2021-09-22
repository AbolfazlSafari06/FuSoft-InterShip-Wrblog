import React from 'react'
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { useForm } from 'react-hook-form';
import CommentsService from '../services/CommentsService';

function ArticleVew({ article, user }) {

    const { id } = useParams("id")
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const onsubmit = async (data) => {
            try {
                const {data} = await CommentsService.createComment()
            } catch (error) {
                
            }
    }


    return (
        <div className="p-4" >
            <div className="container mb-4 align-content-md-center">
                <div className="row p-3 mt-4"><h1> title</h1> </div>
                <div className="row p-2 my-1">
                    <div>
                        {/* <h4> {article.shortDescription}</h4> */}
                        <h4> Des</h4>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <p className="fs-4">
                            {/* {article.body} */}
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                            لورملورملورملورملورملورملورملورملورملورملورملورملورملورم
                        </p>
                    </div>
                </div>
                {
                    // user?.token ?
                    <div style={{ width: "35rem" }} className=" my-4 rounded row border border-2 p-3">
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div style={{ direction: "ltr" }} className="input-group mb-3">
                                <input type="text" style={{ direction: "rtl" }} className="form-control" name="name" id="name" placeholder="ابوالفضل صفری"  {...register("name", { required: "نام و نام خانوادگی خود را وارد کنید", minLength: 9 })} />
                                <span className="input-group-text" id="basic-addon2">نام و نام خانوادگی </span>
                                {
                                    errors?.name?.message &&
                                    <div className="invalid-feedback">
                                        {errors?.name?.message}
                                    </div>
                                }
                            </div>
                            <div style={{ direction: "ltr" }} className="input-group mb-3">
                                <input type="text" style={{ direction: "rtl" }} className="form-control" name="number" id="number" placeholder="09 - - - - - - - - -" {...register("number", { required: "شماره تلفن خود را وارد کنید", minLength: 9 })} />
                                <span className="input-group-text" id="basic-addon2">شماره تلفن </span>
                                {
                                    errors?.name?.message &&
                                    <div className="invalid-feedback">
                                        {errors?.number?.message}
                                    </div>
                                }
                            </div>

                            <button type="submit" className="btn btn-success">ارسال</button>

                        </form>
                    </div>
                    // :
                    // <div>

                    // </div>
                }
            </div>
        </div>
    )
}

const mapSate = (state) => {
    return {
        user: state?.user
    }
}

export default connect(mapSate, null)(ArticleVew);
