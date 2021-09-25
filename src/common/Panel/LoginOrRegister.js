import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import authservice from '../../services/authservice';

function LoginOrRegister({ user }) {

    const logOut = () => {
        try {
            authservice.Logout()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="dropdown my-3" id="dropdownitem">
                <div className="dropdown-toggle  " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"  >
                    خوش آمدید  {user?.name}
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                        !user?.IsAdmin && <li>
                            <Link to="/panel" className="dropdown-item my-1 p-2">
                                ورود به پنل
                            </Link>
                        </li>
                    }
                    <li><button className="dropdown-item my-1 p-2" onClick={logOut}> خروج از حساب کاربری</button></li>
                </ul>
            </div>
        </div>
    )
}

const mapSate = (state) => {
    return {
        user: state?.user
    }
}

export default connect(null, mapSate)(LoginOrRegister)
