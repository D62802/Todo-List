import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import illustration from "../images/illustration.png";
function Home(props) {
  let activeClassName = "bg-white text-primary py-3 w-50";
  let nonActiveClass = "py-3 bg-primary text-white w-50";
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-md-6 bg-primary text-white text-center h-100 d-flex flex-column align-items-center justify-content-center">
          <h1 className="title">
            An App to <br />
            make your life
            <br />
            <span className="text-uppercase display-1">easy</span>
          </h1>
          <img className="img-fluid" src={illustration} alt="illustration" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card home-card w-50 shadow-sm rounded-0">
            <div className="card-header d-flex p-0 text-center border-0 bg-white ">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : nonActiveClass
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : nonActiveClass
                }
                to="/register"
              >
                Register
              </NavLink>
            </div>
            <div className="card-body p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
