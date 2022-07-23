import "./index.scss";
import Papa from "papaparse";
import { postData } from "../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { getNewData } from "../../store/actions/transactions/data";

export default function ImportExport({
  toggleModal,
  setModalContent,
  setIsModalOpen,
}) {
  let data = useSelector((store) => store.dataLoad.data && store.dataLoad.data);
  const dispatch = useDispatch();
  //Export from JSOn to csv
  const exportCSVFile = () => {
    let items = data;
    const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(items[0]);
    const csv = [
      header.join(","), // header row first
      ...items.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      ),
    ].join("\r\n");
    downloadBlob(csv, "export.csv", "text/csv;charset=utf-8;");
  };

  function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
    // Create a link to download it
    var pom = document.createElement("a");
    pom.href = url;
    pom.setAttribute("download", filename);
    pom.click();
  }

  //Import csv to JSON
  const convertFromCSV = (e) => {
    const files = e.target.files;
    files &&
      Papa.parse(files[0], {
        complete: function (results) {
          const data = results.data.filter(
            (dataItem) => typeof dataItem === "object" && !isNaN(dataItem[0])
          );
          data.map((dataItems) => {
            const dataToPost = {
              TransactionId: dataItems[0],
              Status: dataItems[1],
              Type: dataItems[2],
              ClientName: dataItems[3],
              Amount: dataItems[4],
            };
            postData(dataToPost);
            dispatch(getNewData(dataToPost));
          });

          setIsModalOpen(false);
        },
      });
  };

  const importFile = () => {
    toggleModal();
    setModalContent({
      title: "Import cvs file",
      content: <input type="file" accept=".csv" onChange={convertFromCSV} />,
    });
  };

  return (
    <div className="import-export">
      <button id="import" className="btn" onClick={importFile}>
        Import
      </button>

      <button id="export" className="btn" onClick={exportCSVFile}>
        Export
      </button>
    </div>
  );
}
