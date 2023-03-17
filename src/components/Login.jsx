import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import TodoContext from "../context/TodoContext";
function Login(props) {
  const [formData, setFormData] = useState();
  const { login, message, setMessage } = useContext(TodoContext);

  useEffect(() => {
    setMessage("");
  }, [setMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form>
      <div className="mb-3">
        <label className="form-label fw-bold" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <p>{message}</p>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={onSubmit}>
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
