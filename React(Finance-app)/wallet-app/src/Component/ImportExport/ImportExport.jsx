import "./index.scss";
import Button from "../Button/Button";
import Papa from "papaparse";
import { postData } from "../../Api/api";

export default function ImportExport({ toggleModal, setModalContent }) {
  const importFile = () => {
    toggleModal();
    setModalContent({
      title: "Import cvs file",
      content: (
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const files = e.target.files;
            files &&
              Papa.parse(files[0], {
                complete: function (results) {
                  postData(results.data);
                },
              });
          }}
        />
      ),
    });
  };

  return (
    <div className="import-export">
      <button id="import" onClick={importFile}>
        Import
      </button>

      <button id="export">Export</button>
      {/* <Button
        btnAction={importFile}
        btn={[
          { id: "import", text: "Import" },
          { id: "export", text: "Export" },
        ]}
      /> */}
    </div>
  );
}
