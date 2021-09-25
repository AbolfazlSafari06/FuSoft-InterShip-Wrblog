import CommentsService from '../services/CommentsService';
import articleService from '../services/articleService';
import userService from '../services/usersService';
import userimg from './user.png'

import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import Swal from 'sweetalert2'
import CreateComment from './CreateComment';


function ArticleVew({ user }) {

    const { id } = useParams("id")
    const [article, setArticle] = useState()
    const [Body, setBody] = useState()
    const [User, setUser] = useState()
    const [articleId, setarticleId] = useState()

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();

    const getArticle = async (id) => {
        try {
            const articles = await articleService.getArticel(id);
            const user = await userService.getUser(articles.userId)
            // convertHtmlToString(articles.body)
            setUser(user)
            console.log("articles   ", articles);
            setarticleId(articles.id)
            console.log("setarticleid finish")

            setArticle(articles);
            // convertHtmlStringToDom(articles.body)
        } catch (error) {
            console.log(error);
        }
    }

    // const convertHtmlStringToDom = (string) => {
    //     var s = string;
    //     var temp = document.createElement('div');
    //     temp.innerHTML = s;
    //     var htmlObject = temp.firstChild;
    //     return htmlObject;
    // }

    useEffect(() => {
        getArticle(id); 
    }, [])

    return (
        <div className="p-4 article-item" >
            <div className="container mb-4 align-content-md-center">
                <div className="row p-3 mt-4">
                    <div className=" col-12 col-md-12 offset-4">
                        <span className="fs-2">{article?.title}</span>
                    </div>
                </div>
                <div className="row p-2 my-1">
                    <div>
                        <div className="fw-fw-normal fs-5" dangerouslySetInnerHTML={{ __html: article?.shortDescription }} />
                    </div>
                </div>
                <div className="row">
                    <div>
                        <p id="body" className="fs-4">
                            <div dangerouslySetInnerHTML={{ __html: article?.body }} />
                        </p>
                    </div>
                </div>
                <div className="row   d-flex align-items-baseline mb-5">
                    <div className="d-none d-sm-inline-block  col-1">
                        <img src={userimg} className="user-logo" />
                    </div>
                    <div className="col-4 mx-4">
                        <span>
                            {
                                User?.name
                            }
                        </span>
                    </div>
                </div>
                <hr />
                <hr className="mb-5" />
                {
                     articleId &&
                        <CreateComment articleId={articleId} /> 
                    // user?.token ? articleId &&
                    //     <CreateComment articleId={article?.id} />
                    //     : 
                    //     <div>
                    //         <p>
                    //             برای ثبت نظر ابتدا وارد بشوید
                    //         </p>
                    //     </div>
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
