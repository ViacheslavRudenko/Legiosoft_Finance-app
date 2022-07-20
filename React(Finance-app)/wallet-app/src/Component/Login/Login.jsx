import "./index.scss";
import CustomForm from "../Forms/CustomForm";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { userLoginData } from "./data";
import { useState } from "react";

export default function Login({ setIsLogin, isLogin }) {
  const [incorectUserData, setIncorectUserData] = useState(false);
  const forms = [
    { formName: "userName", text: "User name", typeName: "text" },
    { formName: "password", text: "Password", typeName: "password" },
  ];

  const valuesValidation = object({
    userName: string()
      .required("The field is required")
      .min(5, "User name is too short"),
    password: string()
      .required("Please provide a valid password")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      onSubmit={(values, action) => {
        userLoginData.map((data) => {
          (data.userName === values.userName &&
            data.password === values.password &&
            setIsLogin(true)) ||
            setIncorectUserData(true);
          isLogin && action.resetForm();
        });
      }}
      validationSchema={valuesValidation}
    >
      {(props) => {
        return (
          <Form
            onSubmit={props.handleSubmit}
            className="login"
            onClick={() => setIncorectUserData(false)}
          >
            <ul>
              {forms.map((form) => (
                <li key={form.formName} className={"login__item"}>
                  <CustomForm form={form} />
                </li>
              ))}
            </ul>
            {incorectUserData && (
              <p className="login__error">Invalid login or Password</p>
            )}
            <div>
              <button className="btn login__btn" type="submit">
                Login
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
