import "./App.css";
import * as xlsx from "xlsx";
import { output2Json } from "./utils";

function App() {
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, { raw: true });
        if (json) {
          output2Json(json);
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label htmlFor="upload">Upload File</label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
          <p>You can select the cn.xslx which is in the src folder</p>
        </form>
      </header>
    </div>
  );
}

export default App;
