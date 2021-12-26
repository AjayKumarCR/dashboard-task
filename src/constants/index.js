import { getDateObject, parseItemList } from "../utils";

export const COLUMN_SCHEMA = [
  "orderId",
  "customerId",
  "deliveryPincode",
  "orderDate",
  "items\r",
];
export const CSV_TABLE_SCHEMA = [
  {
    Header: "Order ID",
    accessor: "orderId",
    disableFilters: true,
  },
  {
    Header: "Customer ID",
    accessor: "customerId",
    disableFilters: true,
  },
  {
    Header: "Delivery Pincode",
    accessor: "deliveryPincode",
  },
  {
    Header: "Order Date",
    accessor: "orderDate",
    sortMethod: (a, b) => {
      var aDate = getDateObject(a);
      var bDate = getDateObject(b);
      if (aDate < bDate) return 1;
      else if (aDate < bDate) return -1;
      else return 0;
    },
  },
  {
    Header: "Items",
    accessor: "items\r",
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }) => {
      const itemList = row.values["items\r"];
      return (
        <div>
          {parseItemList(itemList).map((item) => (
            <p>{item}</p>
          ))}
        </div>
      );
    },
  },
];
