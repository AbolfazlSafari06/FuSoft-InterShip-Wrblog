import React from 'react'
import { Link } from 'react-router-dom'
import authservice from '../../../services/authservice';
import './style.scss';

function Header({ onToggelSidebars }) {

    const logOut = () => {
        try {
            authservice.Logout()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="header" className="row">
            <div className="col-2 d-sm-none">
                <button className="  btn btn-light ms-4 d-sm-none" onClick={() => onToggelSidebars(true)}>
                    <i className="fa fa-bars" />
                </button>
            </div>
            <div className="col-2 offset-6 offset-sm-8">
                <Link to="/" className="py-0 text-dark ">
                   
                        مشاهده وبسایت
                    
                </Link>
            </div>
            <div className="col-2 ">
                <div className="dropdown">
                    <div className="dropdown-toggle my-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        خوش آمدید
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item my-1 p-2" href="#">Action</a></li>
                        <li><a className="dropdown-item my-1 p-2" href="#">Another action</a></li>
                        <li><button className="dropdown-item my-1 p-2" onClick={logOut}> خروج از حساب کاربری</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Header
