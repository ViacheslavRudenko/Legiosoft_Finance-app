import "./index.scss";
import { getData } from "../../Api/api";
import { useState } from "react";
// const data = [
//   { id: 1, status: "adad", type: "ad", clientName: "kjnbjk", amount: "20" },
//   { id: 2, status: "adad", type: "ad", clientName: "kjnbjk", amount: "400" },
// ];
export default function MianTable() {
  const [dataDD, setData] = useState([]);
  const resp = getData();
  resp.then((resp) => {
    setData(resp);
  });
  console.log(dataDD);

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
        {/* {data.map((dataItem) => {
          console.log(dataItem);
        })} */}
      </tbody>
    </table>
  );
}
