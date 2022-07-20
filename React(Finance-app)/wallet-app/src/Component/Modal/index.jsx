import "./index.scss";
import Button from "../Button/Button";
import PropTypes from "prop-types";

export default function Modal({ closeModal, actionWithModal, content }) {
  const btn = [];
  return (
    <div className="modal">
      <div className="modal__box">
        <div className="modal__box--item">
          <div className="modal__header ">
            <p className="header__title">{content.title}</p>
            <div className="header__btn btn">
              <button className="btn__item" onClick={closeModal}>
                X
              </button>
            </div>
          </div>
          <div className="modal__main main">
            {content.content}
            <div className="main__btn btn">
              <Button btn={btn} btnAction={actionWithModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  modal: PropTypes.object,
  product: PropTypes.object,
  closeModal: PropTypes.func,
  setShopingList: PropTypes.func,
};
