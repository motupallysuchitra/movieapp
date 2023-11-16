import { useState } from "react";
import Navbar from "../Navbar/navbar";
import * as Yup from "yup";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { useNavigate } from "react-router";
import "../Register/login.css";
import { Link } from "react-router-dom";
import Footer from "../Navbar/Footer";
function Login() {
  const navigate = useNavigate();

  const initialvalues = {
    username: "",
    password: "",
  };

  const validationschema = Yup.object({
    username: Yup.string().required("Username is Required!!"),
    password: Yup.string().required("Password is Required!!"),
  });

  const [responseData, setResponseData] = useState({
    responseText: "",
    responseClass: "",
  });

  async function onSubmit(values, { resetForm }) {
    await axios
      .post("http://127.0.0.1:8000/api/users/login/", values)
      .then(
        (response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);

          setResponseData({
            responseText: "Login Successfull",
            responseClass: "alert alert-success",
          });
          setTimeout(() => {
            navigate("/", true);
          }, 1000);
        },
        (error) => {
          setResponseData({
            responseText: "Invalid username or password ",
            responseClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error);
      });
    resetForm();
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="signinForm">
        <div className="container maincontainer">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="mainform">
                <h2 className="welcomeText">HELLO</h2>
                <h2 className="welcomeSubText">WELCOME BACK</h2>
                {/* <h1 className="logg">Login</h1> */}
                <div className={responseData.responseClass} role="alert">
                  {responseData.responseText}
                </div>
                <br></br>
                <Formik
                  initialValues={initialvalues}
                  onSubmit={onSubmit}
                  validateOnMount
                  validationSchema={validationschema}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Username"
                            type="text"
                            name="username"
                            className="form-control"
                          />
                          <ErrorMessage name="username">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Password"
                            type="password"
                            name="password"
                            className="form-control"
                          />
                          <ErrorMessage name="password">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          className="Reg"
                          value="login"
                          disabled={!formik.isValid}
                        >
                          Submit
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
                <br />

                <p className="text-center">
                  New user? <Link to="/signup">Click here</Link>
                </p>
                <p className="text-center">
                  Forget Password? <Link to="/forgetpassword">Click here</Link>
                </p>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
