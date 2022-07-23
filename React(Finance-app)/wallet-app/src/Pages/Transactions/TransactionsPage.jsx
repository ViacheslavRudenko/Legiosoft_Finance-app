import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../Component/Filters/Filters";
import ImportExport from "../../Component/ImportExport/ImportExport";
import Login from "../../Component/Login/Login";
import MianTable from "../../Component/MainTable/MainTable";
import Modal from "../../Component/Modal/Modal";
import TransactionsBox from "../../Component/Transactions/Transactions";
import { axiosData } from "../../store/actions/transactions/data";
import "./index.scss";

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
      {!isLogin && <Login setIsLogin={setIsLogin} isLogin={isLogin} />}
      {isModalOpen && <Modal closeModal={toggleModal} content={modalContent} />}
      {isLogin && (
        <div className="main">
          <div className="main__aside aside">
            <TransactionsBox />
          </div>
          <div className="main__body body">
            <div className="body__content">
              {isLoaded ? (
                <MianTable
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
