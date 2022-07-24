import { userLoginData } from "./data";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CustomInput from "../Forms/CastomInput";
import CustomErrorMessage from "../Forms/CustomErrorMessage";

export default function Login({ setIsLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoginValidSubmit, setIsLoginValidSubmit] = useState(false);

  //console.log("try to log-in: ", userLoginData[0]);

  const isLoginValid = (values) => {
    console.log(values);
    return userLoginData.map((data) => {
      (data.userName === values.userName &&
        data.password === values.password &&
        setIsLogin(true)) ||
        setIsLoginValidSubmit(true);
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => isLoginValid(data))}
      className="form"
      onFocus={() => setIsLoginValidSubmit(false)}
    >
      <ul>
        <li className={"form__item"}>
          <CustomInput
            register={register}
            name={"User name"}
            formName={"userName"}
            err={{ required: true, minLength: 4 }}
          />
          <CustomErrorMessage
            condition={errors.userName && errors.userName.type === "minLength"}
            errorText={"Min length is 4 characters"}
          />
        </li>

        <li className={"form__item"}>
          <CustomInput
            register={register}
            name={"Password"}
            formName={"password"}
            formType={"password"}
            err={{ required: true, minLength: 6 }}
          />
          <CustomErrorMessage
            condition={errors.password && errors.password.type === "minLength"}
            errorText={"Min length is 6 characters"}
          />
          <CustomErrorMessage
            condition={
              (errors.userName && errors.userName.type === "required") ||
              (errors.password && errors.password.type === "required")
            }
            errorText={"All fields are required"}
          />

          <CustomErrorMessage
            condition={isLoginValidSubmit}
            errorText={"Username or password is incorrect"}
          />
        </li>
      </ul>
      <input type="submit" />
    </form>
  );
}

Login.propTypes = {
  setIsLogin: PropTypes.func,
};
