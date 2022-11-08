import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Pagination from "./Pagination/Pagination";
import { deleteData } from "../../Api/api";
import { deleteItem, editData } from "../../store/actions/transactions/data";
import CustomForm from "./MainTable/EditForm";
import { putData } from "../../Api/api";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Filters from "./Filters/Filters";
import ImportExport from "./ImportExport/ImportExport";
import MainTable from "./MainTable/MainTable";
import PropTypes from "prop-types";
import { Button } from "../../App";

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
        <>
          <p>
            Are you sure you want to delete this transaction from the database?
          </p>
          <Button
            onClick={() => {
              deleteData(props.data[0].TransactionId);
              dispatch(deleteItem(props.data[0].TransactionId));
              setIsModalOpen(false);
            }}
          >
            YES
          </Button>
        </>
      ),
    });
  };

  //Edit Transaction

  const editDataValue = (values) => {
    dispatch(editData(values));
    putData(values.TransactionId, values);
    setIsModalOpen(false);
  };

  const editTransactions = (cell) => {
    toggleModal();
    const clickData = cell?.row?.original;
    let data = {};
    for (let key in clickData) {
      key !== "action" && (data = { ...data, [key]: clickData[key] });
    }

    setModalContent({
      title: "Edit transaction",
      content: <CustomForm initialValue={data} editData={editDataValue} />,
    });
  };

  //render Table
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
              className="btn__item"
              onClick={() => editTransactions(props)}
            >
              Edit
            </Button>
            <Button
              className="btn__item"
              onClick={() => deleteTransaction(props)}
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const transactionsData = useMemo(() => [...data], [data]);

  const {
    rows,
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
          filteredData={rows}
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
