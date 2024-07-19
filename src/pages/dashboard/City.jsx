import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const City = () => {
  const [show, setShow] = useState("menu");
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server}/cities`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cities!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${server}/cities/${id}`)
      .then((response) => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the city!", error);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "City name",
        accessor: "name",
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row }) => (
          <button
            onClick={() => navigate(`/city/${row.original._id}`)}
            className="btn btn-primary"
          >
            Edit
          </button>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => <button onClick={() => handleDelete(row.original._id)} className="btn btn-primary">Delete</button>,
      },
    ],
    [navigate]
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

  const handleSave = () => {
    axios
      .post(`${server}/cities`, { name: cityName })
      .then((response) => {
        setData([...data, response.data]);
        setCityName("");
        setShow("list");
      })
      .catch((error) => {
        console.error("There was an error saving the city!", error);
      });
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add City</p>
      </div>
      <div className="buttons">
        <button
          style={{
            borderLeft: show === "menu" ? `5px solid blue` : "none",
            background: show === "menu" ? "#fffbf8" : "none",
            fontWeight: show === "menu" ? "600" : "normal",
          }}
          onClick={() => setShow("menu")}
        >
          Add New
        </button>
        <button
          style={{
            borderLeft: show === "list" ? `5px solid blue` : "none",
            background: show === "list" ? "#fffbf8" : "none",
            fontWeight: show === "list" ? "600" : "normal",
          }}
          onClick={() => setShow("list")}
        >
          List
        </button>
      </div>

      {show === "menu" ? (
        <>
          <div className="inputs">
            <input
              type="text"
              placeholder="City Name"
              style={{ maxWidth: "300px" }}
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <div className="submit">
            <button onClick={handleSave}>Save</button>
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
            {/* <span className="goto">
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
            </span>{" "} */}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
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

export default City;
