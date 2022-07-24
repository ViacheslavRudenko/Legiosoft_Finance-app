import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../Component/Login/Login";
import MianContent from "../../Component/MainContent/MainContent";
import Modal from "../../Component/Modal/Modal";
import TransactionsBox from "../../Component/Aside/Transactions";
//import { axiosData } from "../../store/actions/transactions/data";
import "./index.scss";
import { axiosData } from "../../store/reducers/transactions/data";

export default function MainTransactions() {
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(axiosData());
  }, []);
  const isLoaded = useSelector((store) => store.dataLoad.isLoaded);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      {!isLogin && <Login setIsLogin={setIsLogin} />}
      {isModalOpen && <Modal closeModal={toggleModal} content={modalContent} />}
      {isLogin && (
        <div className="main">
          <div className="main__aside aside">
            <TransactionsBox />
          </div>
          <div className="main__body body">
            <div className="body__content">
              {isLoaded ? (
                <MianContent
                  toggleModal={toggleModal}
                  setModalContent={setModalContent}
                  setIsModalOpen={setIsModalOpen}
                />
              ) : (
                "Add your first transaction!"
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
