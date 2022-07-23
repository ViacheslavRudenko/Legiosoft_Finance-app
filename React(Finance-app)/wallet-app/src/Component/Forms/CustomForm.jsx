import { Field } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";
import { Form, Formik } from "formik";
import { useState } from "react";
import DropList from "../Filters/DropList/DropList";
import { statusData, typeData } from "../Filters/data";

export default function CustomForm({
  forms,
  valuesValidation,
  initialValue,
  isValid,
  btn,
}) {
  const [incorectData, setIncorectData] = useState(false);

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={isValid}
        validationSchema={valuesValidation}
      >
        {(props) => {
          return (
            <Form
              onSubmit={props.handleSubmit}
              className="form"
              onClick={() => setIncorectData(false)}
            >
              <ul>
                {forms.map((form) => (
                  <li key={form.formName} className={"form__item"}>
                    <label htmlFor={form.formName}>{form.text}</label>
                    <Field
                      type={form.typeName}
                      name={form.formName}
                      id={form.formName}
                      className={"form__input"}
                      disabled={
                        form.formName !== "TransactionId" ? false : true
                      }
                    />
                    <CustomErrorMessage name={form.formName} />
                  </li>
                ))}
              </ul>
              {incorectData && (
                <p className="form__error">Invalid login or Password</p>
              )}
              <div>
                <button className="btn form__btn" type="submit">
                  {btn}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
