import React, { useMemo } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemList = () => {
  const data = useMemo(
    () => [
      {
        name: "A MAL",
        itemType: "Item Type",
        company: "EFROZE CHEMICAL IND(PTV)LIT",
        unit: "INJ",
        qtyInPack: 20,
        retailPrice: 200,
        minQty: 0,
        maxQty: 0,
        status: "Active",
      },
      {
        name: "A MAL",
        itemType: "Item Type",
        company: "EFROZE CHEMICAL IND(PTV)LIT",
        unit: "INJ",
        qtyInPack: 20,
        retailPrice: 200,
        minQty: 0,
        maxQty: 0,
        status: "Active",
      },
      // Add more data as needed
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Item Type",
        accessor: "itemType",
        Filter: ColumnFilter,
      },
      {
        Header: "Company",
        accessor: "company",
        Filter: ColumnFilter,
      },
      {
        Header: "Unit",
        accessor: "unit",
        Filter: ColumnFilter,
      },
      {
        Header: "Qty in pack",
        accessor: "qtyInPack",
        Filter: ColumnFilter,
      },
      {
        Header: "Retail Price",
        accessor: "retailPrice",
        Filter: ColumnFilter,
      },
      {
        Header: "Min Qty",
        accessor: "minQty",
        Filter: ColumnFilter,
      },
      {
        Header: "Max Qty",
        accessor: "maxQty",
        Filter: ColumnFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: ColumnFilter,
      },
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
    <>
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
                    <tr>
                      <div style={{ width: "80px", marginBottom: "8px" }}>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </tr>
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
    </>
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

export default ItemList;
