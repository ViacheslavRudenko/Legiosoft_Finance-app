import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Pagination from "./Pagination/Pagination";
import { deleteData } from "../../Api/api";
import { deleteItem, editData } from "../../store/actions/transactions/data";
import CustomForm from "../Forms/CustomForm";
import { object, string } from "yup";
import { putData } from "../../Api/api";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Filters from "./Filters/Filters";
import ImportExport from "./ImportExport/ImportExport";
import MainTable from "./MainTable/MainTable";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

export default function MainContent({
  toggleModal,
  setModalContent,
  setIsModalOpen,
}) {
  let data = useSelector((store) => store.dataLoad.data && store.dataLoad.data);

  const dispatch = useDispatch();

  //Delete Transaction
  const deleteTransaction = (props) => {
    toggleModal();
    setModalContent({
      title: "Press YES to confirm the deletion",
      content: (
        <p>
          Are you sure you want to delete this transaction from the database?
        </p>
      ),
      btn: [{ id: 1, text: "YES" }],
      btnAction: () => {
        deleteData(props.data[0].TransactionId);
        dispatch(deleteItem(props.data[0].TransactionId));
        setIsModalOpen(false);
      },
    });
  };

  //Edit Transaction
  const valuesValidation = object({
    TransactionId: string().required("The field is required"),
    Status: string().required("The field is required"),
    Type: string().required("The field is required"),
    ClientName: string().required("The field is required"),
    Amount: string().required("The field is required"),
  });

  const editDataFunc = (values, action) => {
    dispatch(editData(values));
    putData(values.TransactionId, values);
    setIsModalOpen(false);
  };

  const getInitialValue = (data) => {
    let newObj = {};
    data.map((dataItem) => {
      newObj = { ...newObj, [dataItem.text]: dataItem.value };
      return newObj;
    });
    return newObj;
  };

  const editTransactions = (cell) => {
    toggleModal();
    const clickData = cell?.row?.original;
    let data = [];
    for (let key in clickData) {
      let dataObj = key !== "action" && {
        typeName: "text",
        text: key,
        formName: key,
        value: clickData[key],
      };

      dataObj && (data = [...data, dataObj]);
    }

    setModalContent({
      title: "Edit transaction",
      content: (
        <CustomForm
          forms={data}
          valuesValidation={valuesValidation}
          initialValue={getInitialValue(data)}
          isValid={editDataFunc}
          setIsModalOpen={setIsModalOpen}
          btn={[{ id: 1, text: "Save" }]}
        />
      ),
    });
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "TransactionId" },
      { Header: "Status", accessor: "Status" },
      { Header: "Type", accessor: "Type" },
      { Header: "Client name", accessor: "ClientName" },
      { Header: "Amount", accessor: "Amount" },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => (
          <>
            <Button
              btn={[{ id: 1, text: "Edit" }]}
              btnAction={() => editTransactions(props)}
            />
            <Button
              btn={[{ id: 2, text: "Delete" }]}
              btnAction={() => deleteTransaction(props)}
            />
          </>
        ),
      },
    ],
    []
  );

  const transactionsData = useMemo(() => [...data], [data]);

  const {
    page,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: transactionsData,
    },

    useGlobalFilter,
    usePagination
  );

  return (
    <>
      <div className="body__header">
        <Filters setGlobalFilter={setGlobalFilter} />
        <ImportExport
          toggleModal={toggleModal}
          setModalContent={setModalContent}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      <MainTable
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={page}
        prepareRow={prepareRow}
      />

      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        nextPage={nextPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
      />
    </>
  );
}

MainContent.propTypes = {
  toggleModal: PropTypes.func,
  setModalContent: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};
