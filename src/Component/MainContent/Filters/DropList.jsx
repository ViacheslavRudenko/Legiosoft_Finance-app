import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";

export default function DropList({ listName, dataArr, setGlobalFilter }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success">{listName}</Dropdown.Toggle>
      <Dropdown.Menu
        onClick={(e) =>
          setGlobalFilter && setGlobalFilter(e.target.innerText.split(" ")[1])
        }
      >
        {dataArr.map((data) => (
          <Dropdown.Item href={`#${data.id}`} key={Math.random()}>
            - {data.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

DropList.propTypes = {
  listName: PropTypes.string,
  dataArr: PropTypes.array,
  setGlobalFilter: PropTypes.func,
};
