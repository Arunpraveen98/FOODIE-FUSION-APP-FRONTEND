import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/User_Actions";
import { Link } from "react-router-dom";
import "../../Stylesheet/User_Login.css";
// -----------------------
const User_Login = () => {
  //? React Hooks...
  const [Spinner, setSpinner] = useState(true);
  // ----------------------
  const dispatch = useDispatch();
  // -----------------------
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  // ----------------------
  //? Formik for Form Validations...
  const My_Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      // ---------------------------------------
      //? EMAIL ...
      if (!values.email) {
        errors.email = "Please enter your email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      // ----------------------------------------
      //? PASSWORD ...
      if (!values.password) {
        errors.password = "Please enter your Password";
      }
      // ---------------------------------------
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // ----------------------
        // setSpinner(false);
        // ----------------------
        const user = { email: values.email, password: values.password };
        dispatch(loginUser(user));
        // ----------------------

        //   setSpinner(true);

        My_Formik.resetForm();
        //   setSpinner(true);

        // ----------------------
      } catch (errors) {
        console.log(errors);
        My_Formik.resetForm();
      }
    },
  });
  // ----------------------
  return (
    <div className="login-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 login-div">
            <div className="Login-form-container">
              <p className="Login-title">Login</p>
              {/* -------------------------------- */}
              <form className="Login-form" onSubmit={My_Formik.handleSubmit}>
                {/* -------------------------------- */}
                {/* EMAIL */}
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={My_Formik.values.email}
                    onChange={My_Formik.handleChange}
                  />
                  {
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        fontWeight: "bold",
                        fontFamily: "Philosopher, sans-serif",
                        letterSpacing: "1px",
                      }}
                    >
                      {My_Formik.errors.email}
                    </span>
                  }
                </div>
                {/* -------------------------------- */}
                {/* PASSWORD */}
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={My_Formik.values.password}
                    onChange={My_Formik.handleChange}
                  />
                  {
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        fontWeight: "bold",
                        fontFamily: "Philosopher, sans-serif",
                        letterSpacing: "1px",
                      }}
                    >
                      {My_Formik.errors.password}
                    </span>
                  }
                </div>
                {/* -------------------------------- */}
                <div className="forgot">
                  <a rel="noopener noreferrer" href="#">
                    {/* Forgot Password ? */}
                  </a>
                </div>
                {/* -------------------------------- */}
                <button type={"submit"} value={"Login"} className="sign">
                  {Spinner ? (
                    "Login"
                  ) : (
                    <div className="spinner-div">
                      <div className="spinner"></div>
                    </div>
                  )}
                </button>
                {/* -------------------------------- */}
              </form>
              {/* -------------------------------- */}
              <div className="social-message">
                <div className="line"></div>
                <p className="message">Don't have an account?</p>
                <div className="line"></div>
              </div>
              {/* -------------------------------- */}
              <p className="signup">
                <Link to={"/register"} className="">
                  Sign up
                </Link>
              </p>
              {/* -------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Login;
