import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { server } from "../../App";

const Formula = () => {
  const [show, setShow] = useState("menu");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    composition: "",
  });

  useEffect(() => {
    axios
      .get(`${server}/formula`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cities!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Formula name",
        accessor: "name",
      },
      {
        Header: "Composition",
        accessor: "composition",
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
    nextPage,
    previousPage,
    state: { pageIndex },
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
      .post(`${server}/formula`, {
        name: formData.name,
        composition: formData.composition,
      })
      .then((response) => {
        setData([...data, response.data]);
        setFormData("");
        setShow("list");
      })
      .catch((error) => {
        console.error("There was an error saving the city!", error);
      });
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Formula</p>
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
          <form className="inputs" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Formula Name"
              name="name"
              style={{ maxWidth: "300px" }}
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Composition"
              name="composition"
              style={{ maxWidth: "300px" }}
              value={formData.composition}
              onChange={handleChange}
            />
            <div className="submit">
              <button type="button" onClick={handleSave}>
                Save
              </button>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Formula;