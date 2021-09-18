import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { isActiveRoute } from "../../../../src/navigation/Navigation";
import './style.scss'

function SideBar({ open, onToggelSidebars }) {

    const Location = useLocation(); 
    return (
        <div id="sidebar" className={`${open ? "open" : ""}`}>
            <div className="mb-3 pb-3 d-sm-none border-bottom">
                <button className="btn btn-light d-sm-none" onClick={() => onToggelSidebars(false)}>
                    <i className="fa fa-times" />

                </button>
            </div>
            <ul className="list-group">
                <li className={`${isActiveRoute(Location.pathname, "^/panel/users/*") ? "active" : ""} my-2`} > <Link to="/panel/users">مدریت کاربران</Link> </li>
                <li className={`${isActiveRoute(Location.pathname, "^/panel/articles/*") ? "active" : ""} my-2`}  > <Link to="/panel/articles">مدریت مقالات</Link> </li>
                <li className={`${isActiveRoute(Location.pathname, "^/panel/categories/*") ? "active" : ""} my-2`}  > <Link to="/panel/categories">مدریت دسته بندی ها</Link> </li>
                <li className={`${isActiveRoute(Location.pathname, "^/panel/Comments/*") ? "active" : ""} my-2`}  > <Link to="/panel/Comments">مدریت نظرات</Link> </li>
            </ul>
        </div>
    )
}

export default SideBar
