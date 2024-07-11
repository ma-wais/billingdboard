import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { server } from "../../App";
import Select from "react-select";

const Company = () => {
  const [show, setShow] = useState("menu");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    shortName: "",
    code: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    status: "Active",
    remarks: "",
  });
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get(`${server}/cities`).then((response) => {
      const items = response.data.map((item) => ({
        value: item.name,
        label: item.name,
        ...item,
      }));
      setCities(items);
    });
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${server}/companies`);
        setCompanies(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const data = useMemo(() => companies, [companies]);

  const columns = useMemo(
    () => [
      {
        Header: "Company Code",
        accessor: "code",
      },
      {
        Header: "Company Name",
        accessor: "companyName",
      },
      {
        Header: "Short Name",
        accessor: "shortName",
      },
      {
        Header: "Phone",
        accessor: "phoneNumber",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City",
        accessor: "address",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      // {
      //   Header: "Action",
      //   accessor: "action",
      //   Cell: () => <button className="btn btn-primary">Edit</button>,
      // },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${server}/companies`, formData);
      setCompanies([...companies, res.data]);
      setShow("list");
    } catch (error) {
      console.error("Error saving company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Company</p>
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
          <form className="inputs" onSubmit={handleSubmit}>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
            <div className="row-inputs">
              <input
                type="text"
                name="shortName"
                placeholder="Short Name"
                value={formData.shortName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="code"
                placeholder="Code"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
            <div className="row-inputs">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone #"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="row-inputs">
              <textarea
                style={{ width: "40%" }}
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <Select
                className="basic-single"
                placeholder="City"
                options={cities}
                value={formData.city}
                onChange={(value) => setFormData({ ...formData, city: value })}
              />
            </div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <textarea
              type="text"
              name="remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
            <div className="submit">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
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

export default Company;
