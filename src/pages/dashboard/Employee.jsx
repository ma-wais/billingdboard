import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import { server } from "../../App";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("menu");
  const [employees, setEmployees] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    fatherName: "",
    cnic: "",
    gender: "",
    dateOfBirth: "",
    status: "Active",
    address: "",
    city: "",
    remarks: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [result, cities] = await Promise.all([
        axios.get(`${server}/employees`),
        axios.get(`${server}/cities`),
      ]);

      const items = cities.data.map((item) => ({
        value: item.name,
        label: item.name,
        ...item,
      }));

      setEmployees(result.data);
      setCities(items);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "dateOfBirth") {
      const formattedDate = value.split("T")[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/employees/${id}`);
      const result = await axios.get(`${server}/employees`);
      setEmployees(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      setLoading(true);
      await axios.post(`${server}/employees`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShow("list");
      const result = await axios.get(`${server}/employees`);
      setEmployees(result.data);
      setLoading(false);
      alert("Employee created successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Father Name", accessor: "fatherName" },
      { Header: "DOB", accessor: "dateOfBirth" },
      { Header: "CNIC", accessor: "cnic" },
      { Header: "City", accessor: "city" },
      { Header: "Address", accessor: "address" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/employee/${row.original._id}`);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleDelete(row.original._id)}
              >
                Delete
              </button>
            </>
          );
        },
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
    { columns, data: employees, initialState: { pageIndex: 0 } },
    usePagination
  );

  return (
    <div className="box">
      <div className="heading">
        <p>Add Employee</p>
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
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="text"
              placeholder="Employee code (Password)"
              name="employeeCode"
              onChange={handleChange}
            />
            <div className="row-inputs">
              <input
                type="text"
                placeholder="Name"
                name="employeeName"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Father Name"
                name="fatherName"
                onChange={handleChange}
              />
            </div>
            <div className="row-inputs">
              <select name="gender" id="gender" onChange={handleChange}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="dob"> Date/Birth: </label>
              <input
                style={{ width: "195px" }}
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                id="dob"
                onChange={handleChange}
              />
            </div>
            <div className="row-inputs">
              <input
                type="text"
                placeholder="CNIC"
                name="cnic"
                onChange={handleChange}
              />
              <label htmlFor="status">Status</label>
              <select name="status" id="status" onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Left">Left</option>
              </select>
            </div>
            <div className="row-inputs">
              <textarea
                rows="1"
                type="text"
                placeholder="Address"
                name="address"
                cols={40}
                onChange={handleChange}
              />
              <Select
                unstyled
                className="basic-single"
                classNamePrefix="custom-select"
                options={cities}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.value });
                }}
              />
            </div>
            <textarea
              type="text"
              placeholder="Remarks"
              name="remarks"
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className="submit">
            <button type="submit">{loading ? "Saving..." : "Save"}</button>
          </div>
        </form>
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
            <span>
              | Go to page:{" "}
              <input
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
