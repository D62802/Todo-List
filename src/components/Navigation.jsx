import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TodoContext from "../context/TodoContext";
import logo from "../images/logo.png";

function Navigation(props) {
  const { setLoggedUser, loggedUser } = useContext(TodoContext);
  useEffect(() => {
    const getUser = async () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const response = await fetch(
          `http://localhost:5000/users?email=${localUser}`,
          { method: "GET" }
        );
        if (response.ok) {
          const userDetails = await response.json();
          console.log(userDetails);
          if (userDetails) {
            setLoggedUser((prev) => ({
              ...prev,
              user: userDetails[0],
              isLoggedIn: true,
            }));
          }
        }
      }
    };
    getUser();
  }, [setLoggedUser]);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedUser(() => ({
      user: {},
      isLoggedIn: false,
    }));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Todo App" />
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
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {loggedUser.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasklist">
                    Task List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createtask">
                    Create Task
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {loggedUser.isLoggedIn ? (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {loggedUser?.user?.name}
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      {" "}
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="dropdown-item" onClick={logout}>
                      Logout
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
