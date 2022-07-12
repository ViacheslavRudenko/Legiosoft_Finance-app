import "./form.scss";
import { Formik, Form } from "formik";
import { object, string, number } from "yup";
import { removeAllCartList } from "../../store/actions/cart/cart";
import { useDispatch } from "react-redux";
import CustomForm from "./CustomForm";
import { useState } from "react";

export default function Forms({ cartList }) {
  const forms = [
    { formName: "userName", text: "Name" },
    { formName: "userLastName", text: "Last name" },
    { formName: "phoneNumber", text: "Phone number" },
    { formName: "adress", text: "Your adress for delivery" },
    { formName: "age", text: "Your age" },
  ];

  const valuesValidation = object({
    userName: string().required("The field is required"),
    userLastName: string().required("The field is required"),
    phoneNumber: number()
      //.required("The field is required")
      .typeError("Phone number is not valid"),

    adress: string().required("The field is required"),

    age: number()
      .required("The field is required")
      .typeError("Age is not valid"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const orderData = { customerData: { ...values }, products: cartList };
    dispatch(removeAllCartList());
    console.log("Order: ", orderData);
  };

  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const updateData = (value) => setPhoneNumberValue(value);

  return (
    <Formik
      initialValues={{
        userName: "",
        userLastName: "",
        phoneNumber: "",
        adress: "",
        age: "",
      }}
      onSubmit={(values, action) => {
        values = { ...values, phoneNumber: phoneNumberValue };
        handleSubmit(values);
        action.resetForm();
      }}
      validationSchema={valuesValidation}
    >
      {(props) => {
        return (
          <Form onSubmit={props.handleSubmit} className="form">
            <ul>
              {forms.map((form) => (
                <li key={form.formName} className={"form__item"}>
                  <CustomForm
                    formName={form.formName}
                    text={form.text}
                    updateData={updateData}
                  />
                </li>
              ))}
            </ul>
            <div>
              <button className="btn form__btn" type="submit">
                Checkout
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

// function Form() {
//       const [values, setValues] = useState({
//       userName: "",
//       userLastName: "",
//       phoneNumber: "",
//       adress: "",
//       age: "",
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("saf");
//       };

//         const handleChanges = (e) => {
//           let name = e.target.id;
//           setValues({
//             ...values,
//             [name]: e.target.value,
//           });
//         };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <div className="form__item">
//         <label htmlFor="userName">Name</label>
//         <input
//           id="userName"
//           type="text"
//           onChange={handleChanges}
//           value={values.userName}
//         />
//       </div>
//       <div className="form__item">
//         <label htmlFor="userLastName">Last name</label>
//         <input
//           id="userLastName"
//           type="text"
//           onChange={handleChanges}
//           value={values.userLastName}
//         />
//       </div>
//       <div className="form__item">
//         <label htmlFor="age">Age</label>
//         <input
//           id="age"
//           type="number"
//           onChange={handleChanges}
//           value={values.age}
//         />
//       </div>
//       <div className="form__item">
//         <label htmlFor="adress">Adress of delivery</label>
//         <input
//           id="adress"
//           type="text"
//           onChange={handleChanges}
//           value={values.adress}
//         />
//       </div>
//       <div className="form__item">
//         <label htmlFor="phoneNumber">Phone number</label>
//         <input
//           id="phoneNumber"
//           type="text"
//           onChange={handleChanges}
//           value={values.phoneNumber}
//         />
//       </div>
//       <div>
//         <button>Checkout</button>
//       </div>
//     </form>
//   );
// }
