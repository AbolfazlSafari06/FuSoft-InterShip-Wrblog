import React from 'react'
import { Link } from 'react-router-dom';


function PoupulerArticle({ articles }) {
    return (
        <div className={"container-lg my-4 overflow-auto bg-light mb-4 p-4"}>
            <h3>محبوبترین مقالات</h3>
            <div className={"row "}>
                {
                    articles.map((article) => {
                        return (
                            <div className="card my-3 mx-3 p-3 " style={{ width: "18rem" }}>
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

export default PoupulerArticle
