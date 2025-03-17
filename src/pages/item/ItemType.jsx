import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const ItemType = () => {
  const [show, setShow] = useState("menu");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    itemTypeName: "",
    itemTypeShortName: "",
    itemTypeActive: "",
    itemTypeRemarks: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server}/item-types`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the item types!", error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Item Type Name",
        accessor: "itemTypeName",
      },
      {
        Header: "Item Type Short Name",
        accessor: "itemTypeShortName",
      },
      {
        Header: "Item Type Active",
        accessor: "itemTypeActive",
      },
      {
        Header: "Item Type Remarks",
        accessor: "itemTypeRemarks",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/item-type/${row.original._id}`)}
          >
            Edit
          </button>
        ),
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
      .post(`${server}/item-types`, formData)
      .then((response) => {
        setData([...data, response.data]);
        setFormData({
          itemTypeName: "",
          itemTypeShortName: "",
          itemTypeActive: "",
          itemTypeRemarks: "",
        });
        alert("Item type created successfully!");
        setShow("list");
      })
      .catch((error) => {
        console.error("There was an error saving the item type!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Item Type</p>
      </div>
      <div className="buttons">
        <button
          className={show === "menu" && "focused"}
          onClick={() => setShow("menu")}
        >
          Add New
        </button>
        <button
          className={show === "list" && "focused"}
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
              name="itemTypeName"
              placeholder="Item Type Name"
              value={formData.itemTypeName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="itemTypeShortName"
              placeholder="Item Type Short Name"
              value={formData.itemTypeShortName}
              onChange={handleChange}
            />
            <div className="row-inputs">
              <label htmlFor="itemTypeActive">Item Type Active</label>
              <select
                name="itemTypeActive"
                id="itemTypeActive"
                value={formData.itemTypeActive}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <textarea
              name="itemTypeRemarks"
              id="remarks"
              placeholder="Remarks"
              value={formData.itemTypeRemarks}
              onChange={handleChange}
            ></textarea>
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

export default ItemType;
