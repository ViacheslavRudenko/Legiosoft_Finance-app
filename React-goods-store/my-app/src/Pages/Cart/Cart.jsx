import { useEffect } from "react";
import ProductCard from "../../Component/ProductCard/ProductCard";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import setModal from "../../store/actions/modal/modal";
import setPageData from "../../store/actions/pageData/pageData";
import { toggleModal } from "../../Component/ProductList/ProductList";
import Form from "../../Component/Form/Form";

export default function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setModal({
        isOpen: false,
        title: "Are you sure you want to delete this product from the cart?",
        isBtnClose: true,
        btn: [{ id: 1, text: "Yes" }],
      })
    );
    dispatch(
      setPageData({
        isInCartPage: true,
        productOnClick: {},
      })
    );
  }, []);

  const cartList = useSelector((store) => store.cartList);
  const modal = useSelector((store) => store.modal);
  const pageData = useSelector((store) => store.pageData);

  const modalAction = (e) => {
    !modal.isOpen &&
      dispatch(
        setPageData({
          ...pageData,
          productOnClick: cartList
            .filter(
              (product) => product.article === e.target.getAttribute("data-id")
            )
            .shift(),
        })
      );
    toggleModal(dispatch, modal);
  };

  const cartListRender = cartList.map((productInCart) => {
    return (
      <li key={productInCart.Id} className={"cart__item"}>
        <ProductCard toggleModal={modalAction} product={productInCart} />
      </li>
    );
  });

  return (
    <>
      <div className="cart">
        <div>
          <div className="cart__header">
            {cartList.length
              ? "Your cart"
              : "Your cart is empty! Time to start shopping!"}
          </div>
          <ul className="cart__list">{cartListRender}</ul>
        </div>

        {cartList.length && (
          <div>
            <Form cartList={cartList} />
          </div>
        )}
      </div>
    </>
  );
}
