import "./index.scss";
import { statusData, typeData } from "./data.js";
import { Formik, Form } from "formik";
import DropList from "./DropList/DropList";

export default function Filters({ setGlobalFilter }) {
  return (
    <div className="filter">
      <DropList
        listName={"status"}
        dataArr={statusData}
        setGlobalFilter={setGlobalFilter}
      />

      <DropList
        listName={"type"}
        dataArr={typeData}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
