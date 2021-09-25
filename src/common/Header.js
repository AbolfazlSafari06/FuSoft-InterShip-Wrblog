import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LoginOrRegister from './Panel/LoginOrRegister';
import fusoft from './fusoft.png'
import './HeaderStyle.css'

function Header({ title, user }) {


  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light backgroundcolor"  >
    <nav className="navbar navbar-expand-lg shadow p-3 mb-5 bg-white rounded "  >
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/mainpage">
          <img className="Header-logo" src={fusoft} alt="Logo" />
        </Link>
    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex  align-items-baseline">
            <li className="nav-item">
              <Link style={{ color: "black" }} className="nav-link " to="/categories">
                دسته بندی ها
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ color: "black" }} className="nav-link " to="/about">
                درباره ما
              </Link>
            </li>
          </ul>
        </div>
        <div className=" ">
          {!user?.token &&
            <Link to="/auth" className="btn btn-primary">
              ورود / ثبت نام
            </Link>
          }
          {!!user?.token &&
            <LoginOrRegister user={user} />
          }
        </div>
        <button className="btn btn-light ms-4  fa fa-bars" id="elementID" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" />
      </div>
    </nav>
  );
}

const mapSate = (state) => {
  return {
    user: state?.user
  }
}

export default connect(mapSate, null)(Header);
