import React, { useState } from "react";

import DashboardScreen from "../Screen/DashboardScreen";

const HomeScreen = () => {
  const [tableData, setTableData] = useState([]);

  const processCSV = (data) => {
    const ProcessCSVData = [];
    const rows = data.split("\n");
    const headers = rows.shift().split(",");

    rows.map((row) => {
      const colums = row.split(",");
      const singleData = {};
      colums.map((col, index) => {
        return (singleData[headers[index]] = col);
      });

      return ProcessCSVData.push(singleData);
    });
    setTableData(ProcessCSVData);
  };

  const ReadFile = (e) => {
    const csvfile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      processCSV(data);
    };

    reader.readAsBinaryString(csvfile);
  };

  const resetData = () => {
    setTableData([]);
  };

  return (
    <>
      {tableData.length === 0 ? (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <input type="file" accept=".csv" onChange={ReadFile}></input>
        </div>
      ) : (
        <DashboardScreen tableData={tableData} resetData={resetData} />
      )}
    </>
  );
};

export default HomeScreen;
