import { Link } from "react-router-dom";

function Header({ title }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header"  >
      <div className="container">
        <Link className="navbar-brand" to="/mainpage">
         وبلاگ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                کاربران
              </Link>
            </li>
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
      </div>
    </nav>
  );
}

export default Header;
