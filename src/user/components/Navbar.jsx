import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark pt-4 py-3">
      <div className="container d-flex align-items-center">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/src/assets/img/logo.png"
            alt="AU Sport Connect"
            className="logo-img me-2 mt-1"
          />
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active" : ""}`
                }
              >
                Booking
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/buddies"
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active" : ""}`
                }
              >
                Sport Buddies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active" : ""}`
                }
              >
                History
              </NavLink>
            </li>

          </ul>
          <br/>
          {/* PROFILE BUTTON */}
          <div className="d-flex ms-lg-0 ms-auto">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `btn rounded-circle profile-btn ac_b d-flex justify-content-center align-items-center ${
                isActive ? "profile-active" : ""
              }`
            }
          >
            <i className="bi bi-person icon_a"></i>
          </NavLink>
          </div>
        </div>

      </div>
    </nav>
  );
}
