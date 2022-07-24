import "./index.scss";
import PropTypes from "prop-types";
import Button from "../Button/Button";

export default function Modal({ closeModal, content }) {
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
              {content.btn && (
                <Button btn={content.btn} btnAction={content.btnAction} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  modal: PropTypes.object,
  product: PropTypes.object,
  closeModal: PropTypes.func,
  setShopingList: PropTypes.func,
};
