import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { server } from "../../App";

const PurchaseList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/purchase/return`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Supplier",
        accessor: "supplier",
        Filter: ColumnFilter,
      },
      {
        Header: "Bill No",
        accessor: "billNumber",
        Filter: ColumnFilter,
      },
      {
        Header: "Purchase Date",
        accessor: "dateOfPurchase",
        Filter: ColumnFilter,
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Total Items",
        accessor: "totalItems",
        Filter: ColumnFilter,
      },
      {
        Header: "Bill Amount",
        accessor: "billAmount",
        Filter: ColumnFilter,
      },
      {
        Header: "Discount",
        accessor: "discountAmount",
        Filter: ColumnFilter,
      },
      {
        Header: "Advance Tax",
        accessor: "advanceTaxAmount",
        Filter: ColumnFilter,
      },
      {
        Header: "Net Amount",
        accessor: "netAmount",
        Filter: ColumnFilter,
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  );

  return (
    <div className="box">
      <div className="heading">
        <p>Purchase Return List</p>
      </div>
      {/* <div className="more-inputs">
        <label htmlFor="account"> Account </label>
        <select name="account" id="account">
          <option value="sample">Sample Account</option>
        </select>
        <label htmlFor="from">From Date</label>
        <input type="date" id="from" />
        <label htmlFor="to">To Date</label>
        <input type="date" id="to" />
        <button
          style={{ background: "#739e73", color: "white", marginLeft: "auto", marginRight: "10px" }}
        >
          Search
        </button>
      </div> */}
      <div className="table-responsive">
        <table {...getTableProps()} className="table table-striped table-bordered">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th style={{ fontSize: "12px" }} {...column.getHeaderProps()}>
                    <div style={{ width: "80px", marginBottom: "8px" }}>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    <div>{column.render("Header")}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"Prev"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {"Next"}
        </button>{" "}
      </div>
    </div>
  );
};

const ColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`${id}`}
      className="form-control"
    />
  );
};

export default PurchaseList;
