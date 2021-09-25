import { Link } from 'react-router-dom';
import React from 'react'

import './../style.scss';
import ArticleViewInList from './../ArticleViewInList';

function LastArticle({ articles }) {
    console.log(articles);
    return (
        <div>
            <h3>آخرین مقالات</h3>
            <hr  id="headerid"/>
            <div className={"container-lg mb-5 p-4"}>
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
        </div>
    )
}

export default LastArticle