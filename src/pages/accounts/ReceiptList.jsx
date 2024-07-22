import React, { useEffect, useMemo, useState } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { server } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReceiptList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    account: "",
    from: "",
    to: "",
    type: "CashReceipt",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountChange = (selectedOption) => {
    setFormData({
      ...formData,
      account: selectedOption ? selectedOption.value : "",
    });
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsResult = await axios.get(`${server}/accounts`);
        const items = accountsResult.data.map((item) => ({
          value: item._id,
          label: item.accountName,
        }));
        setAccounts(items);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  const fetchCashVouchers = async () => {
    try {
      const response = await axios.get(`${server}/accounts/cashvoucher`, {
        params: {
          dateFrom: formData.from,
          dateTo: formData.to,
          account: formData.account,
          type: formData.type,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cash vouchers:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "account.accountName",
        Filter: ColumnFilter,
      },
      {
        Header: "Description",
        accessor: "description",
        Filter: ColumnFilter,
      },
      {
        Header: "Amount",
        accessor: "amount",
        Filter: ColumnFilter,
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        Filter: ColumnFilter,
      },
      {
        Header: "Creation Date Time",
        accessor: "creationDate",
        Cell: ({ value }) => new Date(value).toLocaleString(),
        Filter: ColumnFilter,
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => navigate(`/receipt-voucher/${row.original._id}`)}
              className="btn btn-primary"
            >
              Edit
            </button>{" "}
            <button
              className="btn btn-primary"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </button>
          </div>
        ),

        disableFilters: true,
      },
    ],
    []
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/accounts/cashvoucher/${id}`);
      fetchCashVouchers();
    } catch (error) {
      console.error("Error deleting cash voucher:", error);
    }
  };

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
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
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  );

  return (
    <>
      <div className="inputs">
        <div className="row-inputs">
          <Select
            className="basic-single"
            name="account"
            placeholder="Account"
            isSearchable={true}
            isClearable={true}
            options={accounts}
            onChange={handleAccountChange}
            value={accounts.find(
              (account) => account.value === formData.account
            )}
          />
        </div>
        <div className="row-inputs">
          <label htmlFor="from"> From</label>
          <input
            type="date"
            name="from"
            id="from"
            value={formData.from}
            onChange={handleChange}
          />
          <label htmlFor="to"> To</label>
          <input
            type="date"
            name="to"
            id="to"
            value={formData.to}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={fetchCashVouchers}>
          {" "}
          Search
        </button>
      </div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-striped table-bordered"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th style={{ fontSize: "12px" }} {...column.getHeaderProps()}>
                    <tr>
                      <div style={{ width: "80px", marginBottom: "8px" }}>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </tr>
                    <tr>{column.render("Header")}</tr>
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
    </>
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
      placeholder={`Filter`}
      className="form-control"
    />
  );
};

export default ReceiptList;
