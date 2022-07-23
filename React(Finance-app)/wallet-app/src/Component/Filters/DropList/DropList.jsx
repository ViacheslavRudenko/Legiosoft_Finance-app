import "./index.scss";
// import { Field } from "formik";
import Dropdown from "react-bootstrap/Dropdown";

export default function DropList({ listName, dataArr, setGlobalFilter }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success">{listName}</Dropdown.Toggle>
      <Dropdown.Menu
        onClick={(e) => setGlobalFilter(e.target.innerText.split(" ")[1])}
      >
        {dataArr.map((data) => (
          <Dropdown.Item href={`#${data.id}`} key={data.id}>
            - {data.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  //Dropdown using Formik

  // return (
  //   <Field
  //     name={listName}
  //     as="select"
  //     className="drop-list"
  //     onFocus={() => console.log("ok")}
  //   >
  //     <option value="" disabled defaultChecked={true}>
  //       {listName.charAt(0).toUpperCase() + listName.slice(1)}
  //     </option>
  //     {dataArr.map((data) => (
  //       <option key={Math.random()} value={data.text}>
  //         - {data.text}
  //       </option>
  //     ))}
  //   </Field>
  // );
}
