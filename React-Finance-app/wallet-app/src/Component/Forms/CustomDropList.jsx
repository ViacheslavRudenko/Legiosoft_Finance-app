import PropTypes from "prop-types";
import "./index.scss";

export default function CustomDropList({ name, arr, register }) {
  return (
    <>
      <label>{name}</label>
      <select {...register(name)}>
        {arr.map((data) => (
          <option key={Math.random()} value={data.text}>
            {data.text}
          </option>
        ))}
      </select>
    </>
  );
}

CustomDropList.propTypes = {
  name: PropTypes.string,
  arr: PropTypes.array,
};
