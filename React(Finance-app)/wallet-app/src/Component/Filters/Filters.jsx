import "./index.scss";
import { statusData, typeData } from "./data.js";
import { Formik, Form, Field } from "formik";
import DropList from "./DropList/DropList";
import { useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";

export default function Filters({}) {
  return (
    <>
      <Formik
        initialValues={{
          status: "",
          type: "",
        }}
      >
        {(propsFormik) => {
          console.log(propsFormik.values);
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
