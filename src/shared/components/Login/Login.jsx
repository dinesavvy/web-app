/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../../../assets/css/Login.css";
import login from "../../../assets/images/login.jpg";
import logo from "../../../assets/images/logo.svg";
import emailInput from "../../../assets/images/emailInput.svg";
import passwordInput from "../../../assets/images/passwordInput.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../../store/slices/auth";
import { showToast } from "../Toast";
const Login = (props) => {
  const { endPoint, route } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  return (
    <>
      <div className="loginFlex pc">
        <div className="w-50 h-100 position-relative mobileHide fixLeft">
          <img src={login} alt="" className="w-100 h-100 object-cover" />
        </div>
        <div className="d-flex align-center justify-center w-lg-50 loginside overflowy">
          <div className="mx-450 mx-auto">
            <div className="logo mb-30 text-center">
              <img src={logo} alt="" />
            </div>
            <div className="fs-28 text-center fw-500 mb-40">Welcome back</div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // try {
                //   await dispatch(handleLogin({ endPoint, values })).unwrap();
                //   // Navigate on success
                //   setSubmitting(false);
                //   navigate(route);
                // } catch (error) {
                //   // Navigate on error
                //   showToast(error, "error");
                //   setSubmitting(false);
                // }
                navigate(route);
              }}
            >
              {({
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form>
                  <div className="mb-30">
                    <label className="fs-14 fw-500 mb-10" htmlFor="email">
                      Email
                    </label>
                    <div className="line">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        id="email"
                      />
                      <img src={emailInput} alt="" className="absoluteImage" />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <div className="mb-60">
                    <label className="fs-14 fw-500 mb-10" htmlFor="password">
                      Password
                    </label>
                    <div className="line">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                      />

                      <img
                        src={passwordInput}
                        alt=""
                        className="absoluteImage"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-10 fw-500 fs-14 error"
                    />
                  </div>
                  <button
                    className="btn w-100"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Enter your Email address
                  </button>

                  {/* <div
                    className="btn"
                    role="button" // Add role for accessibility
                  >
                    Enter your Email address
                  </div> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
