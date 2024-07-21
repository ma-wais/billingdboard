import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { server } from "../../App";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("menu");
  const [cities, setCities] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountType: "",
    accountCode: "",
    accountName: "",
    phoneNumber: "",
    email: "",
    status: "",
    city: "",
    address: "",
    remarks: "",
    openingDebit: 0,
    closingCredit: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResult, accountsResult] = await Promise.all([
          axios.get(`${server}/cities`),
          axios.get(`${server}/accounts`)
        ]);
        const items = citiesResult.data.map((item) => ({
          value: item.name,
          label: item.name,
          ...item,
        }));
        setCities(items);
        setAccounts(accountsResult.data);
        console.log("Data fetched:", accountsResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/accounts`, formData);
      setAccounts([...accounts, response.data]);
      setFormData({
        accountType: "",
        accountCode: "",
        accountName: "",
        email: "",
        status: "",
        city: "",
        phone: "",
        address: "",
        remarks: "",
        openingDebit: 0,
        closingCredit: 0,
      });
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account. Please try again.");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Account Type",
        accessor: "accountType",
        Filter: ColumnFilter,
      },
      {
        Header: "Account Name",
        accessor: "accountName",
        Filter: ColumnFilter,
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: ColumnFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: ColumnFilter,
      },
      {
        Header: "City",
        accessor: "city.name",
        Filter: ColumnFilter,
      },
      { 
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => <button className="btn btn-primary" onClick={() => navigate(`/account/${row.original._id}`)}>Edit</button>,
      }
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
    { columns, data: accounts, initialState: { pageIndex: 0 } },
    usePagination
  );

  return (
    <div className="box">
      <div className="heading">
        <p>Add Account</p>
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
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="row-inputs">
              <label htmlFor="accountType"> Account Type:</label>
              <select
                name="accountType"
                id="accountType"
                onChange={handleChange}
                value={formData.accountType}
              >
                <option value="">Select</option>
                <option value="Customer">Customer</option>
                <option value="Supplier">Supplier</option>
                <option value="Expenses">Expenses</option>
                <option value="Trading">Trading</option>
              </select>
              <input
                type="text"
                placeholder="Account Code:"
                name="accountCode"
                onChange={handleChange}
                value={formData.accountCode}
              />
            </div>
            <input
              type="text"
              placeholder="Account Name"
              name="accountName"
              onChange={handleChange}
              value={formData.accountName}
            />
            <div className="row-inputs">
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="row-inputs">
              <label htmlFor="status">Status</label>
              <select 
                name="status" 
                id="status" 
                onChange={handleChange}
                value={formData.status}
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Select
                className="basic-single"
                isSearchable={true}
                isClearable={true}
                options={cities.map(city => ({ value: city._id, label: city.name }))}
                name="city"
                placeholder="City"
                onChange={(selectedOption) => setFormData({...formData, city: selectedOption ? selectedOption.value : ""})}
                value={cities.find(city => city._id === formData.city)}
              />
            </div>
            <textarea
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
            <textarea
              type="text"
              placeholder="Remarks"
              name="remarks"
              onChange={handleChange}
              value={formData.remarks}
            />
            <div className="row-inputs">
              <label htmlFor="openingDebit"> Opening Credit</label>
              <input
                type="number"
                placeholder="Opening Debit"
                name="openingDebit"
                onChange={handleChange}
                value={formData.openingDebit}
              />
              <label htmlFor="closingCredit"> Closing Credit</label>
              <input
                type="number"
                placeholder="Closing Credit"
                name="closingCredit"
                onChange={handleChange}
                value={formData.closingCredit}
              />
            </div>
          </div>
          <div className="submit">
            <button type="submit">Save</button>
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
                        <div>{column.canFilter ? column.render("Filter") : null}</div>
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

const ColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search ${count} records...`}
      className="form-control"
    />
  );
};

export default Account;