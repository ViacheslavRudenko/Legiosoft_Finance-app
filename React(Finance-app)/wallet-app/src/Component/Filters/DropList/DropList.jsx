import "./index.scss";
import { Field } from "formik";

export default function DropList({ listName, dataArr }) {
  return (
    <Field name={listName} as="select" className="drop-list">
      <option value="" disabled defaultChecked={true}>
        {listName.charAt(0).toUpperCase() + listName.slice(1)}
      </option>
      {dataArr.map((data) => (
        <option key={Math.random()} value={data.text}>
          - {data.text}
        </option>
      ))}
    </Field>
  );
}
