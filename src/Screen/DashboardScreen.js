import React, { useMemo } from "react";

import Table from "../components/Table";
import { DataSectionWrapper } from "../components";

import { CSV_TABLE_SCHEMA } from "../constants";

const DashboardScreen = ({ tableData, resetData }) => {
  const columns = useMemo(() => CSV_TABLE_SCHEMA, []);
  const data = useMemo(() => tableData, [tableData]);

  return (
    <DataSectionWrapper>
      <Table columns={columns} data={data} />
    </DataSectionWrapper>
  );
};

export default DashboardScreen;
