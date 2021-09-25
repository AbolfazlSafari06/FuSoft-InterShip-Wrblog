import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import Swal from 'sweetalert2'

import CommentsService from '../services/CommentsService'
import CommentView from './CommentView';

function CreateComment({ articleId, user }) {

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
    const [comments, setComments] = useState()

    const getComments = async (articleId, userId, body, number, fullname) => {
        try {
            const commentsList = await CommentsService.createComment(articleId, userId, body, number, fullname)
            setComments(commentsList);
        } catch (error) {

        }
    }
 
    const onsubmit = (data) => {
        try {
            console.log(data);
            getComments(articleId, user.id, data.body, data.number, data.fullname);
            reset();
            console.log(articleId, user.id, data.body, data.number);
            Swal.fire({
                title: 'نظر شما با موفقیت ثبت شد.پس از تایید نظر شما به نمایش داده خواهد شد',
                icon: 'success',
                confirmButtonText: 'فهمیدم'
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid">
            <h5>
                نظر بدهید
            </h5>
            <form className="createcomment mb-5" onSubmit={handleSubmit(onsubmit)}>
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">نام و نام خانوادگی</label>
                    <input style={{ direction: "rtl" }} type="text" className="form-control" id="fullname" name="fullname" aria-describedby="emailHelp" placeholder="ابوالفضل صفری"  {...register("fullname", { required: "نام و نام خانوادگی خود را وارد کنید", minLength: 9 })} />
                    {
                        errors?.fullname?.message &&
                        <div className="invalid-feedback">
                            {errors?.fullname?.message}
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">شماره تلفن</label>
                    <input type="text" style={{ direction: "rtl" }} className="form-control" name="number" id="number" placeholder="شماره تلفن" {...register("number", { required: "شماره تلفن خود را وارد کنید", minLength: 9 })} />
                    {
                        errors?.number?.message &&
                        <div className="invalid-feedback">
                            {errors?.number?.message}
                        </div>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">دیدگاه خود را وارد کنید.</label>
                    <textarea style={{ direction: "rtl" }} placeholder="دیدگاه خود را وارد کنید" name="body" className="form-control" id="body" rows="3"  {...register("body", { required: " دیدگاه خود  خود را وارد کنید", maxLength: (1000, "دیدگاه شما بیشتر از 1000 حرف میباشد.") })} ></textarea>
                </div>
                {
                    errors?.body?.message &&
                    <div className="invalid-feedback">
                        {errors?.body?.message}
                    </div>
                }
                <button type="submit" className="btn btn-outline-success">ارسال</button>
            </form>
            {
                <CommentView articleId={articleId} />
            }
        </div>
    )
}
const mapState = (state) => {
    return {
        user: state?.user
    }
}

export default connect(mapState, null)(CreateComment)
