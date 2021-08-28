import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

function SideBar() {
    return (
        <div id="sidebar">
            <ul className="list-group">
                <li className="my-2" > <Link to="/panel/users">مدریت کاربران</Link> </li>
                <li className="my-2" > <Link to="/panel/articles">مدریت مقالات</Link> </li>
                <li className="my-2 " > <Link to="/panel/Category">مدریت دسته بندی ها</Link> </li>
                <li className="my-2" > <Link to="/panel/Comments">مدریت نظرات</Link> </li> 
            </ul>
        </div>
    )
}

export default SideBar
