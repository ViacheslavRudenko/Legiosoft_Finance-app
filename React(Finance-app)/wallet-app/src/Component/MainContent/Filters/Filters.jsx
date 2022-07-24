import "./index.scss";
import { statusData, typeData } from "./data.js";
import DropList from "./DropList";
import PropTypes from "prop-types";

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

DropList.propTypes = {
  setGlobalFilter: PropTypes.func,
};
