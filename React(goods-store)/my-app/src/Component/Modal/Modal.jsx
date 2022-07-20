import React from "react";
import "./modal.scss";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function Modal({ closeModal, actionWithModal, product }) {
  const modal = useSelector((store) => store.modal);
  const { title, btn, isBtnClose } = modal;

  return (
    <div className="modal">
      <div className="modal__box">
        <div className="modal__box--item">
          <div className="modal__header ">
            <p className="header__title">{title}</p>
            {isBtnClose && (
              <div className="header__btn btn">
                <button className="btn__item" onClick={closeModal}>
                  X
                </button>
              </div>
            )}
          </div>
          <div className="modal__main main">
            {
              <div className="main__text goods">
                <img className="goods__img" src={product.img} alt="" />
                <div className="goods__info info">
                  <p className="info__title">{product.Title}</p>

                  <p className="info__price">
                    <span>Article: {product.article}</span> Price:{" "}
                    {product.price}
                  </p>
                </div>
              </div>
            }
            <div className="main__btn btn">
              <Button btn={btn} actionWithModal={actionWithModal} />
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
