import React from 'react'

import Article from './Article.png';
import { Link } from 'react-router-dom';
import './style.scss';

function ArticleViewInList({ article }) {
    return (
        <div className="col-12 articleViewlist " >
            <div className="col-12 col-md-12">
                <Link className="articlebody" to={`/article/view/${article.id}`}>
                    <div className="row">
                        <span className="col-12 mb-3">
                            {article.title}
                        </span>
                        <span className="col-12">
                            {article.shortDescription}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ArticleViewInList
