import React from 'react'
import { Link } from 'react-router-dom';

function LastArticle({ articles }) {
    console.log(articles);
    return (
        <div className={"container-lg  bg-light my-5 p-4"}>
            <h3>آخرین مقالات</h3>
            <div className={"row "}>
                {
                    articles.map((article) => {
                        return (
                            <div className="card my-3 mx-3 p-3" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.shortDescription}</p>
                                    <Link to={`article/view/${article.id}`} className="btn btn-primary"> مشاهده مقاله </Link>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>

    )
}

export default LastArticle
