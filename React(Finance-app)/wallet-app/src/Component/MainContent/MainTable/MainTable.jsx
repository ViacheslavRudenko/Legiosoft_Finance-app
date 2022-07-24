import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import "./index.scss";

export default function MainTable({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
}) {
  return (
    <Table striped bordered hover className="table " {...getTableProps()}>
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
  );
}

MainTable.propTypes = {
  getTableProps: PropTypes.func,
  headerGroups: PropTypes.array,
  getTableBodyProps: PropTypes.func,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
};
