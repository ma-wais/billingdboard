import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { server } from "../../App";

const UpdateQty = () => {
  const [data, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${server}/items`);
        const itemsArray = Array.isArray(result.data) ? result.data : [];
        setOriginalData(itemsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOriginalData([]);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "itemName",
      },
      {
        Header: "Company",
        accessor: "companyName",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => <button className="btn btn-primary">Edit</button>,
      },
    ],
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
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className="box">
      <div className="heading">Update Quantity</div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-striped table-bordered"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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

export default UpdateQty;
