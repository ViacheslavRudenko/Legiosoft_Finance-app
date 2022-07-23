import "./index.scss";
import Button from "../Button/Button";
import PropTypes from "prop-types";

export default function Modal({ closeModal, actionWithModal, content }) {
  return (
    <>
      <div className="modal-win">
        <div className="modal-win__box">
          <div className="modal-win__box--item">
            <div className="modal-win__header ">
              <p className="header__title">{content.title}</p>
              <div className="header__btn btn">
                <button className="btn__item" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>
            <div className="modal-win__main main">
              {content.content}
              {/* <div className="modal-win__btn btn">
                <Button btn={btn} btnAction={actionWithModal} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Modal.propTypes = {
//   modal: PropTypes.object,
//   product: PropTypes.object,
//   closeModal: PropTypes.func,
//   setShopingList: PropTypes.func,
// };
