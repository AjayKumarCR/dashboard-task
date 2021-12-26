import { COLUMN_SCHEMA } from "../constants";

// Validates CSV Structure to have same headers as specified
const ValidateCSV = (headers) => {
  if (
    !(
      JSON.stringify(headers).toLowerCase() ===
      JSON.stringify(COLUMN_SCHEMA).toLowerCase()
    )
  ) {
    return true;
  }

  return false;
};

// Processes the BinaryString read from csv to give table data also gives an array of errors
export const ProcessBinaryString = (BinaryString) => {
  const ProcessedData = [];
  const errors = [];
  try {
    const rows = BinaryString.split("\n");
    const headers = rows.shift().split(",");
    //console.log(headers);
    // console.log(COLUMN_SCHEMA);
    if (ValidateCSV(headers)) {
      //console.log("Hi");
      errors.push("The Headers do not exactly match the expected headers");
    }
    rows.map((row, Rowindex) => {
      const cols = row.split(",");
      const cellData = {};
      cols.map((col, index) => {
        if (col === "\r" || col === "") {
          errors.push(`Empty Terminator at row ${Rowindex} Col ${index}`);
        }
        return (cellData[headers[index]] = col);
      });

      return ProcessedData.push(cellData);
    });
  } catch (error) {
    errors.push(`Malformed CSV or bad data error Details: ${error}`);
  } finally {
    return [ProcessedData, errors];
  }
};
