import { useState } from "react";
import Filters from "../../Component/Filters/Filters";
import ImportExport from "../../Component/ImportExport/ImportExport";
import Login from "../../Component/Login/Login";
import MianTable from "../../Component/MainTable/MainTable";
import Modal from "../../Component/Modal";
import TransactionsBox from "../../Component/Transactions/Transactions";
import "./index.scss";

export default function MainTransactions() {
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      {!isLogin && <Login setIsLogin={setIsLogin} isLogin={isLogin} />}
      {isLogin && (
        <div className="main">
          <div className="main__aside aside">
            <TransactionsBox />
          </div>
          <div className="main__body body">
            <div className="body__header">
              <Filters />
              <ImportExport
                toggleModal={toggleModal}
                setModalContent={setModalContent}
              />
            </div>
            <div className="body__content">
              <MianTable />
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <Modal closeModal={toggleModal} content={modalContent} />}
    </>
  );
}
