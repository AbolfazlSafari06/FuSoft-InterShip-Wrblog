import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import { connect } from 'react-redux';

import CommentsService from './../../../services/CommentsService';
import Pagination from '../../../common/Pagination';
import articleService from '../../../services/articleService';
import usersService from '../../../services/usersService';



function Comments({ user }) {
  const Swal = require('sweetalert2')
  const { register, handleSubmit, reset, setValue, watch, getValues, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState()
  const [totaComments, setotaComments] = useState(0)
  const [page, setPage] = useState(1)


  const GerComments = async (filter) => {
    try {
      setLoading(true)
      const Comments = await CommentsService.getComments(filter, page, 30, user.id);
      console.log(Comments);
      if (Array.isArray(Comments.data)) {
        setComments(Comments.data);
        setotaComments(Comments.lenght)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const onSubmit = (data) => {
    GerComments(data.filter, page, 30);
  }

  const deleteComment = async (id) => {
    try {
      setLoading(true)
      console.log("delete go");
      const data = await CommentsService.deleteComment(id)
      setLoading(false)
      GerComments(getValues("filter"), page, 30);
    } catch (error) {
      alert(error)
      setLoading(false)
    }
  }

  const confirmComment = async (id) => {
    try {
      setLoading(true)
      const data = await CommentsService.confirm(id);
      setLoading(false)
      GerComments(getValues("filter"), page, 30);
    } catch (error) {
      alert(error)
      setLoading(false)
    }
  }

  const showArticleInfo = async (articleId, userId) => {
    try {
      setLoading(true);
      const user = await usersService.getUser(userId)
      const article = await articleService.getArticel(articleId)
      console.log(article.title, article.title);
      Swal.fire({
        title: 'اطلاعات کامنت',
        text: `نام مقاله : ${article.title}  - نام نویسنده مقاله  : ${user.name} .`,
        icon: 'info',
        confirmButtonText: 'فهمیدم'
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  }


  const onPageClick = (page) => {
    setPage(page)
    GerComments(getValues("filter"), page, 30);
  }

  useEffect(() => {
    GerComments(getValues("filter"), page, 30);
  }, [])

  const renderLoading =
    <div className="p-5 text-center">
      Loading...
    </div>

  if (loading) {
    return (
      <div className="p-5 text-center">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <div className="row mb-4">
        <div className="col-4  offset-4  ">
          <span className="fs-3  ">
            مدیریت نظرات
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="row mb-3">
        <div className="d-flex flex-row bd-highlight mb-3">
          <select style={{ width: "10rem" }} className="form-select bg-light" id="autoSizingSelect" name="filter" {...register("filter")} >
            <option selected value="0"> نامشخص </option>
            <option value="1"> تایید شده ها </option>
          </select>
          <button type="submit" className="btn btn-secondary me-4" >فیلتر</button>
        </div>
      </form>
      <div className="overflow-auto">
        {
          totaComments === 0 ?
            <div className="text-center py-5 text-grey">
              <i className="fa fa-info fa-4x mb-4" />
              <p>هیچ نظری ای وجود ندارد</p>
            </div>
            :
            <table className="table table-bordered table-striped table-hover text-nowrap ">
              <thead>
                <tr>
                  <td className="text-center">نظر</td>
                  <td className="text-center">نام نظر دهنده</td>
                  <td className="text-center">وضعیت</td>
                  <td className="text-center">عملیات</td>
                </tr>
              </thead>
              <tbody>
                {
                  comments.map((comment) => {
                    return (
                      <tr key={comment.id} >
                        <td className="text-center">{comment.body}</td>
                        <td className="text-center">{comment.fullName}</td>
                        <td className="text-center ">
                          {
                            comment.isPublished === 0 ? <span class="badge bg-info text-dark ">نامشخص</span>
                              : comment.isPublished === 1 ? <span class="badge bg-success">تایید شده</span>
                                : <span class="badge bg-danger">لغو شده</span>
                          }
                        </td>
                        <td className="text-center">
                          <button onClick={() => confirmComment(comment.id)} className={`btn btn-success p-2 mx-2 fa fa-check-square ${comment.isPublished === 0 ? "" : "d-none"}`}></button>
                          <button onClick={() => deleteComment(comment.id)} className="btn btn-danger p-2 mx-2 fa fa-window-close"> </button>
                          <button onClick={() => showArticleInfo(comment.articleId, comment.userId)} className="btn btn-primary p-2 btn-sm mx-2 "> مشاهده جزئیات  </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

        } <div className="my-4">
          <Pagination total={totaComments} currentPage={page} perPage={30} onPageClick={onPageClick} />
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state?.user
  }
}


export default connect(mapState, null)(Comments)
