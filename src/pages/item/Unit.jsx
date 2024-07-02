import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { server } from "../../App";

const Unit = () => {
  const [show, setShow] = useState("menu");
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({
    unitName: "",
    unitStatus: "active",
    remarks: ""
  });

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`${server}/units`);
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnit({ ...newUnit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/units`, newUnit);
      setUnits([...units, response.data]);
      setShow("list");
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Unit Name",
        accessor: "unitName",
      },
      {
        Header: "Status",
        accessor: "unitStatus",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
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
      data: units,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className="box">
      <div className="heading">
        <p>Add Unit</p>
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
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                type="text"
                placeholder="Unit Name"
                name="unitName"
                value={newUnit.unitName}
                onChange={handleInputChange}
                required
              />
              <div className="row-inputs">
                <label htmlFor="unitStatus">Unit Status</label>
                <select
                  name="unitStatus"
                  value={newUnit.unitStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <textarea
                name="remarks"
                placeholder="Remarks"
                value={newUnit.remarks}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="submit">
              <button type="submit">Save</button>
            </div>
          </form>
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

export default Unit;
