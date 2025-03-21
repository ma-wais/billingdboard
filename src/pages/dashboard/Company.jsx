import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable, usePagination, useSortBy } from "react-table";
import { server } from "../../App";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [citiesResponse, companiesResponse] = await Promise.all([
          axios.get(`${server}/cities`),
          axios.get(`${server}/companies`),
        ]);

        const formattedCities = citiesResponse.data.map((item) => ({
          value: item.name,
          label: item.name,
          ...item,
        }));

        setCities(formattedCities);
        setCompanies(companiesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = useMemo(() => companies, [companies]);

  const columns = useMemo(
    () => [
      {
        Header: "Code",
        accessor: "code",
        width: 100,
      },
      {
        Header: "C.Name",
        accessor: "companyName",
        width: 100,
      },
      {
        Header: "Short.Name",
        accessor: "shortName",
        width: 100,
      },
      {
        Header: "Phone",
        accessor: "phoneNumber",
        width: 100,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City/Address",
        accessor: "address",
        width: 100,
      },
      {
        Header: "Status",
        accessor: "status",
        width: 80,
      },
      {
        Header: "Action",
        accessor: "action",
        width: 20,
        Cell: ({ row }) => (
          <>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/company/${row.original._id}`)}
            >
              Edit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleDelete(row.original._id)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </>
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
    useSortBy,
    usePagination
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/companies/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
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
      alert("Company created successfully!");
    }
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Company</p>
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
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Select
                className="basic-single"
                classNamePrefix="custom-select"
                placeholder="City"
                unstyled
                options={cities}
                value={formData.city}
                onChange={(value) => setFormData({ ...formData, city: value })}
              />
            </div>
            <textarea
              rows="1"
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
            />
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
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        <span>{column.render("Header")}</span>
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <AiOutlineSortAscending />
                            ) : (
                              <AiOutlineSortDescending />
                            )
                          ) : (
                            ""
                          )}
                        </span>
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
                        <td
                          {...cell.getCellProps()}
                          // style={{ maxWidth: `${cell.column.width}px` }}
                        >
                          {cell.render("Cell")}{" "}
                        </td>
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
