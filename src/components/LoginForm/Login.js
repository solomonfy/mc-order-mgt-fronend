import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./login.css";

export default function Login() {
  const schema = yup.object().shape({
    username: yup.string().required("Username cannot be empty"),
    password: yup.string().required("Password cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="logo"></div>
        <div className="title-text">
          <div className="titles login">Login Form</div>
          <div className="titles signup">Sign Up Form</div>
        </div>
        <div className="form-container">
          <div className="form-inner">
            <form
              action="#"
              className="login"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="field">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  
                />
                <p>{errors.username?.message}</p>
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <p>{errors.password?.message}</p>
              </div>
              <div className="pass-link">
                <a href="#" onClick={() => console.log("Reset password")}>
                  Forgot Password ?
                </a>
              </div>
              <div className="login-btn btn">
                <button onClick={() => console.log("Logged in")}>
                  {" "}
                  Login{" "}
                </button>
              </div>
              <div className="signup-link">
                Not a member?
                <a href="#" onClick={() => console.log("Sign Up now")}>
                  Sign Up now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
