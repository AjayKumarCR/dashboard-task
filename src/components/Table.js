import React from "react";
import styled from "styled-components";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { fuzzyTextFilter } from "../utils/FilterUtils";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, Header },
}) {
  const count = preFilteredRows.length;
  const isDateField = Header === "Order Date";
  const processFieldValue = (filterValue) => {
    if (isDateField) {
      return filterValue?.split("/")?.reverse()?.join("-");
    }
    return filterValue;
  };
  const handleFilterChange = (e) => {
    if (isDateField) {
      const formattedDate = e.target.value.split("-").reverse().join("/");
      setFilter(formattedDate || undefined);
    } else {
      setFilter(e.target.value || undefined);
    }
  };
  const clearFilter = (e) => {
    setFilter(undefined);
  };
  return (
    <span>
      {Header === "Delivery Pincode"
        ? "Pincode"
        : Header === "Order Date"
        ? "Date"
        : Header}{" "}
      {": "}
      <input
        type={isDateField ? "date" : "text"}
        value={processFieldValue(filterValue) || ""}
        onChange={handleFilterChange}
        //style={isDateField ? { justifyContent: "left" } : {}}
      />
      {filterValue === undefined ? null : (
        <ClearButton onClick={clearFilter}> Clear..</ClearButton>
      )}
    </span>
  );
}

fuzzyTextFilter.autoRemove = (val) => !val;

const Table = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilter,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,

    useGlobalFilter,
    useSortBy
  );

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          <TableFilters>
            <FilterItem colSpan={visibleColumns.length}></FilterItem>
            {headerGroups.map((headerGroup) => (
              <>
                {headerGroup.headers.map((column) => {
                  return (
                    <>
                      {column.canFilter &&
                      (column.Header === "Delivery Pincode" ||
                        column.Header === "Order Date") ? (
                        <FilterItem>{column.render("Filter")}</FilterItem>
                      ) : null}
                    </>
                  );
                })}
              </>
            ))}
          </TableFilters>

          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th>
                  <HeaderWithIcon>{column.render("Header")}</HeaderWithIcon>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </TableWrapper>
  );
};

const TableFilters = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
const FilterItem = styled.div`
  display: block;
  span {
    font-weight: 700;
    input {
      border: 1px solid #ccc;
      font-size: 1.1rem;
    }
  }
`;
const ClearButton = styled.span`
  cursor: pointer;
  text-decoration: underline;

  justify-content: space-around;
`;
const TableWrapper = styled.div`
  width: 100%;
  table {
    table-layout: fixed;
    width: 100%;
    thead {
      tr {
        background: #93e2d3;
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
        }
      }
    }
  }
  table,
  td,
  tr {
    border: 2px solid black;
    border-collapse: collapse;
  }
`;

const HeaderWithIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
  }
`;

export default Table;
