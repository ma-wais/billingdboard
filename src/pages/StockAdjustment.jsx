import React, { useMemo } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";

const StockAdjustment = () => {
  const data = useMemo(
    () => [
      {
        itemName: "A MAL",
        currentStock: "Item Type",
        physicalStockQty: "EFROZE CHEMICAL IND(PTV)LIT",
      },
    //   {
    //     name: "A MAL",
    //     itemType: "Item Type",
    //     company: "EFROZE CHEMICAL IND(PTV)LIT",
    //     unit: "INJ",
    //     qtyInPack: 20,
    //     retailPrice: 200,
    //     minQty: 0,
    //     maxQty: 0,
    //     status: "Active",
    //   },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Item Name",
        accessor: "itemName",
        Filter: ColumnFilter,
      },
      {
        Header: "Current Stock",
        accessor: "currentStock",
        Filter: ColumnFilter,
      },
      {
        Header: "Physical Stock Qty",
        accessor: "physicalStockQty",
        Filter: ColumnFilter,
      },
    //   {
    //     Header: "Status",
    //     accessor: "status",
    //     Filter: ColumnFilter,
    //   },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => <button className="btn btn-primary">Edit</button>,
        disableFilters: true,
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
    pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
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
        <p>Purchase List</p>
      </div>
      <div className="more-inputs">
        <label htmlFor="account">Supplier Name</label>
        <select name="account" id="account"></select>
        <button style={{background: "#739e73", color: "white", marginLeft: "auto", marginRight: "10px"}}>Add To Table</button>
        </div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-striped table-bordered"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    style={{ fontSize: "12px"}}
                    {...column.getHeaderProps()}
                  >
                    <tr>{column.render("Header")}</tr>
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
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="goto">
          Go to page:{" "}
          <input
            className="table-input"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
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

export default StockAdjustment;
