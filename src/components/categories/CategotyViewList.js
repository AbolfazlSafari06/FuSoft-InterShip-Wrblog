import React from 'react'
import { Link } from 'react-router-dom';


function CategotyViewList({ category }) {

    return (

        <div className="category-item my-4 mx-2 text-center shadow-lg">
            <div className="row text-center">
                <p className="fs-4 col-12">
                    {category.title}
                </p>
                <span className="col-12">
                    <p className="fs-4">
                        <span>تعداد زیر مجموعه :</span> {category.children}
                    </p>
                </span>
                <br />
                <div className="col-12">
                    <Link to={`/category/view/${category.id}`} className={"btn btn-outline-dark"}><span>مشاهده</span> </Link>
                </div>
            </div>
        </div>
    )
}

export default CategotyViewList
