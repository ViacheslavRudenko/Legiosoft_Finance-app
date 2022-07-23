import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "./Pagination/Pagination";
import { deleteData } from "../../Api/api";
import { deleteItem, editData } from "../../store/actions/transactions/data";
import CustomForm from "../Forms/CustomForm";
import { object, string } from "yup";
import { putData } from "../../Api/api";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Filters from "../Filters/Filters";
import ImportExport from "../ImportExport/ImportExport";

export default function MianTable({
  toggleModal,
  setModalContent,
  setIsModalOpen,
}) {
  let data = useSelector((store) => store.dataLoad.data && store.dataLoad.data);

  const dispatch = useDispatch();

  //Delete Transaction
  const deleteTransaction = (props) => {
    deleteData(props.data[0].TransactionId);
    dispatch(deleteItem(props.data[0].TransactionId));
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
          btn={"Edit"}
        />
      ),
    });
  };
  //set Table
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
            <button className="btn1" onClick={() => editTransactions(props)}>
              Edit
            </button>
            <button className="btn1" onClick={() => deleteTransaction(props)}>
              Delete
            </button>
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
  useEffect(() => {
    console.log(globalFilter);
  }, [globalFilter]);
  console.log(pageCount);
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

      <Table {...getTableProps()} striped hover size="sm" className="table">
        <thead className="table__header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

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
