import "./index.scss";
import { statusData, typeData } from "./data.js";
import { Formik, Form, Field } from "formik";
import DropList from "./DropList/DropList";

export default function Filters() {
  return (
    <>
      <Formik
        initialValues={{
          status: "",
          type: "",
        }}
      >
        {(propsFormik) => {
          //console.log(propsFormik);
          return (
            <>
              <Form className="filter">
                <DropList listName={"status"} dataArr={statusData} />
                <DropList listName={"type"} dataArr={typeData} />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
}
