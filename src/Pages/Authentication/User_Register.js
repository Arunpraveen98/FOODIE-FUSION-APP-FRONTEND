import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Stylesheet/User_Register.css";
import { registerUser } from "../../actions/User_Actions";
import { useDispatch } from "react-redux";
  // -----------------------

const User_Register = () => {
    // -----------------------
  //? React Hooks...
  const [Spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  // -----------------------------
  //? Formik for Form Validations...
  const My_Formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.FirstName) {
        errors.FirstName = "Enter your First Name";
      } else if (values.FirstName.length <= 3) {
        errors.FirstName = "First Name min 4 letters";
      } else if (values.FirstName.length > 15) {
        errors.FirstName = "First Name max 15 letters";
      }
      if (!values.LastName) {
        errors.LastName = "Enter your Last Name";
      } else if (values.LastName.length > 15) {
        errors.LastName = "Last Name max 15 letters";
      }
      if (!values.email) {
        errors.email = "Enter your Email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid Email address";
      }
      if (!values.password) {
        errors.password = "Enter your password";
      } else if (JSON.stringify(values.password.length) < 8) {
        errors.password = "Password must be at least 8 digits";
      }
      if (!values.cpassword) {
        errors.cpassword = "Re-enter your password";
      } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password do not match!";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        // -----------------------------
        // setSpinner(false);
        // -----------------------------
        //   setSpinner(true);
        const user = {
          name: `${values.FirstName} ${values.LastName}`,
          email: values.email,
          password: values.password,
        };
        dispatch(registerUser(user));
        My_Formik.resetForm();
        //   setSpinner(true);
        // -----------------------------
      } catch (error) {
        console.log(error);
        // My_Formik.resetForm();
      }
    },
  });
  // -----------------------------
  return (
    <div className="register-page-bg">
      <div className="container register-container">
        <div className="row">
          {/* ---------------- */}
          <div className="col-md-12 register-form">
            {/* ---------------- */}
            <form
              className="register-form-tag"
              onSubmit={My_Formik.handleSubmit}
            >
              <p className="title">Register </p>
              <p className="message">
                Signup now and get full access to our app.{" "}
              </p>
              {/* ---------------- */}
              <div className="flex">
                {/* ---------------- */}
                {/* FIRST NAME */}
                <div>
                  <label>
                    <input
                      name="FirstName"
                      value={My_Formik.values.FirstName}
                      onChange={My_Formik.handleChange}
                      required
                      type="text"
                      className="input"
                    />
                    <span>Firstname</span>
                  </label>
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
                      {My_Formik.errors.FirstName}
                    </span>
                  }
                </div>
                {/* ---------------- */}
                {/* LAST NAME */}
                <div>
                  <label>
                    <input
                      name="LastName"
                      value={My_Formik.values.LastName}
                      onChange={My_Formik.handleChange}
                      required
                      type="text"
                      className="input"
                    />
                    <span>Lastname</span>
                  </label>
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
                      {My_Formik.errors.LastName}
                    </span>
                  }
                </div>
              </div>
              {/* ---------------- */}
              {/* EMAIL*/}
              <label>
                <input
                  name="email"
                  value={My_Formik.values.email}
                  onChange={My_Formik.handleChange}
                  required
                  type="email"
                  className="input"
                />
                <span>Email</span>
              </label>
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
              {/* ---------------- */}
              {/* PASSWORD */}
              <label>
                <input
                  name="password"
                  value={My_Formik.values.password}
                  onChange={My_Formik.handleChange}
                  required
                  type="password"
                  className="input"
                />

                <span>Password</span>
              </label>
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
              {/* ---------------- */}
              {/* CONFIRM PASSWORD */}
              <label>
                <input
                  name="cpassword"
                  value={My_Formik.values.cpassword}
                  onChange={My_Formik.handleChange}
                  required
                  type="password"
                  className="input"
                />
                <span>Confirm password</span>
              </label>
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
                  {My_Formik.errors.cpassword}
                </span>
              }
              {/* ---------------- */}
              {/* REGISTER BUTTON */}
              <button className="submit" type="submit" value="SUBMIT">
                {Spinner ? (
                  "Register"
                ) : (
                  <div className="spinner-div">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>
              {/* ---------------- */}
              <p className="signin">
                Already have an acount ? <Link to={"/login"}>Signin</Link>{" "}
              </p>
              {/* ---------------- */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Register;
