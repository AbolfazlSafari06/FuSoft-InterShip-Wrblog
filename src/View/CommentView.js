import CommentsService from '../services/CommentsService'
import Pagination from '../common/Pagination';
import './style.scss'

import React, { useState } from 'react'
import { useEffect } from 'react';

function CommentView({ articleId }) {

    const [comments, setComments] = useState([])
    const [totaComments, setotaComments] = useState(0)
    const [page, setPage] = useState(1)

    const getComments = async (articleId, page, perpage) => {
        try {
            console.log("get comments for id ",articleId) 
            var data = await CommentsService.getCommentsForArticle(articleId, page = 1, perpage = 10)
            if (Array.isArray(data.data)) {
                setComments(data.data)
            }
            setotaComments(data.lenght)
        } catch (error) {
            console.log(error);
        }
    }

    const onPageClick = (page) => {
        setPage(page)
        getComments(articleId, page, 30);
    }
    useEffect(() => {
        getComments(articleId)
    }, [])

    return (

        <div>
            {
                comments &&
                <div className="row container-fluid comments">
                    <div className="fs-3 m-3">نظرات کاربران</div>
                    {comments.map(comment => {
                        return (
                            <div className="mb-4 ">
                                <div className="m-3 comment p-4 mx-auto   col-12">
                                    <div>
                                        <span>
                                            {comment.fullName}
                                        </span>
                                    </div>
                                    <div>
                                        {comment.body}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            {/* <Pagination total={totaComments} currentPage={page} perPage={30} onPageClick={onPageClick} /> */}

        </div>
    )
}


export default CommentView
