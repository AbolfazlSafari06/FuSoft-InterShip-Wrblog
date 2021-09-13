import { connect } from "react-redux";
import { Link } from "react-router-dom";
import authservice from "../services/authservice";
import './HeaderStyle.css'
function Header({ title, user }) {

  const logOut = () => {
    try {
      authservice.Logout()
    } catch (error) {
      console.log(error);
    }
  }

  console.log("user = > ", user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light backgroundcolor"  >
      <div className="container">
        <Link className="navbar-brand" to="/mainpage">
          وبلاگ
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="categories">
                دسته بندی ها
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="search">
                جستجو
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="about">
                درباره ما
              </Link>
            </li>
          </ul>
        </div>
        {!user?.token &&
          <Link to="/auth" className="btn btn-primary">
            ورود / ثبت نام
          </Link>
        }
        <div>
          {!!user?.token &&
            <div className="dropdown">
              <div className="dropdown-toggle my-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"  >
                خوش آمدید  {user?.name}
              </div>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                  !user.IsAdmin && <li>
                    <Link to="/panel" className="dropdown-item my-1 p-2">
                      ورود به پنل
                    </Link>
                  </li>
                }
                <li><button className="dropdown-item my-1 p-2" onClick={logOut}> خروج از حساب کاربری</button></li>
              </ul>
            </div>
          }
        </div>
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
