import "./index.scss";
import PropTypes from "prop-types";

export default function Button({ btn, btnAction }) {
  return (
    <>
      {btn.map((e) => (
        <div className="btn" key={e.id}>
          <button className="btn__item" id={e.id} onClick={btnAction}>
            {e.text}
          </button>
        </div>
      ))}
    </>
  );
}

Button.propTypes = {
  btn: PropTypes.array,
  setLS: PropTypes.func,
};
