import "./index.scss";
import PropTypes from "prop-types";
import { Button } from "../../App";

export default function Modal({ closeModal, content }) {
  return (
    <>
      <div className="modal-win">
        <div className="modal-win__box">
          <div className="modal-win__box--item">
            <div className="modal-win__header ">
              <p className="header__title">{content.title}</p>
              <div className="header__btn btn">
                <Button className="btn__item" onClick={closeModal}>
                  X
                </Button>
              </div>
            </div>
            <div className="modal-win__main main">{content.content}</div>
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
