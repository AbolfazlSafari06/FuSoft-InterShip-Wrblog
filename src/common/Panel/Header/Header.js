import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss';

function Header() {
    return (
        <div id="header" className="row">
            <div className="col-2">
                <Link to="/" className="py-0 text-dark">مشاهده وبسایت</Link>
            </div>
            <div className="col-2">
                <div className="dropdown">
                    <div  className="dropdown-toggle my-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        خوش آمدید
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
