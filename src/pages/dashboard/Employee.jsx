import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";

const Employee = () => {
  const [show, setShow] = useState("menu");
  const data = useMemo(
    () => [
      {
        company: "001",
        name: "A MAL",
        shortName: "AMAL",
        phone: "1234567890",
        email: "bWj7M@example.com",
        city: "Lahore",
        status: "Active",
      },
      // Add more data as needed
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Company Code",
        accessor: "company",
      },
      {
        Header: "Company Name",
        accessor: "name",
      },
      {
        Header: "Short Name",
        accessor: "shortName",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Status",
        accessor: "status",
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
      <div className="heading">
        <p>Add Employee</p>
      </div>
      <div className="buttons">
        <button
          style={{
            borderLeft: show === "menu" ? `5px solid blue` : "none",
            background: show === "menu" ? "#fffbf8" : "none",
            fontWeight: show === "menu" ? "600" : "normal",
          }}
          onClick={() => {
            setShow("menu");
          }}
        >
          Add New
        </button>
        <button
          style={{
            borderLeft: show === "list" ? `5px solid blue` : "none",
            background: show === "list" ? "#fffbf8" : "none",
            fontWeight: show === "list" ? "600" : "normal",
          }}
          onClick={() => {
            setShow("list");
          }}
        >
          List
        </button>
      </div>

      {show === "menu" ? (
        <>
          <div className="inputs">
            <input type="text" placeholder="Employee code (Password)" />
            <div className="row-inputs">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Father Name" />
            </div>
            <div className="row-inputs">
              <label htmlFor="gender"> Gender: </label>
              <select name="gender" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="dob"> Date of Birth: </label>
              <input style={{ width: "195px" }} type="date" name="" id="dob" />
            </div>
            <div className="row-inputs">
              <input type="text" placeholder="CNIC" />
              <label htmlFor="status">Status</label>
              <select name="status" id="">
                <option value="">Active</option>
                <option value="">Left</option>
              </select>
            </div>
            <div className="row-inputs">
              <textarea
                style={{ width: "40%" }}
                type="text"
                placeholder="Address"
              />
              <select name="" id="">
                <option value="Gujrat">Gujrat</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
              </select>
            </div>
            <textarea type="text" placeholder="Remarks" />
            <input type="file" accept="image/*" id="image" />
          </div>
          <div className="submit">
            <button>Save</button>
          </div>
        </>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Employee;
