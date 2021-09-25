import { Link } from 'react-router-dom';
import React from 'react'

import ArticleViewInList from './../ArticleViewInList';
import './../style.scss';

function PoupulerArticle({ articles }) {
    return (
        <div className={"container-lg my-5 p-4"}>
            <h3>محبوبترین مقالات</h3>
            <hr id="headerid" />
            <div className={"row "}>
                {
                    articles.map((article) => {
                        return (
                            <div className="p-2">
                                <ArticleViewInList article={article} />
                                <hr className="m-3" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PoupulerArticle
