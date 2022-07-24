import { Field } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";
import { Form, Formik } from "formik";
import Button from "../Button/Button";
import PropTypes from "prop-types";
export default function CustomForm({
  forms,
  valuesValidation,
  initialValue,
  isValid,
  btn,
  incorectUserData,
  setIncorectUserData,
  incorectDataText,
}) {
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
              onClick={
                incorectDataText ? () => setIncorectUserData(false) : null
              }
            >
              <ul>
                {forms.map((form) => (
                  <li key={form.formName} className={"form__item"}>
                    <>
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
                    </>
                  </li>
                ))}
              </ul>
              {incorectUserData && (
                <p className="form__error">{incorectDataText}</p>
              )}
              <div className="col-md-12 text-center">
                <Button typeName={"submit"} btn={btn} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

CustomForm.propTypes = {
  forms: PropTypes.array,
  valuesValidation: PropTypes.object,
  initialValue: PropTypes.object,
  isValid: PropTypes.func,
  btn: PropTypes.array,
  incorectUserData: PropTypes.bool,
  setIncorectUserData: PropTypes.func,
  incorectDataText: PropTypes.string,
};
