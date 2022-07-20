import "./index.scss";
import { getData } from "../../Api/api";
const data = [
  { id: 1, status: "adad", type: "ad", clientName: "kjnbjk", amount: "20" },
  { id: 2, status: "adad", type: "ad", clientName: "kjnbjk", amount: "400" },
];
export default function MianTable() {
  getData();
  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Type</th>
          <th>Client name</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dataItem) => {
          return (
            <tr key={dataItem.id}>
              <th>{dataItem.id}</th>
              <th>{dataItem.status}</th>
              <th>{dataItem.type}</th>
              <th>{dataItem.clientName}</th>
              <th>{dataItem.amount}</th>
              <th>{dataItem.action}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
