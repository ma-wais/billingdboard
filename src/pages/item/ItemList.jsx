import React, { useEffect, useMemo, useState } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { server } from "../../App";

const ItemList = () => {
  const [data, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${server}/items`);
        const itemsArray = Array.isArray(result.data) ? result.data : [];
        setOriginalData(itemsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOriginalData([]);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "itemName",
        Filter: ColumnFilter,
      },
      {
        Header: "Item Type",
        accessor: "itemType",
        Filter: ColumnFilter,
      },
      {
        Header: "Company",
        accessor: "companyName",
        Filter: ColumnFilter,
      },
      {
        Header: "Unit",
        accessor: "unit",
        Filter: ColumnFilter,
      },
      {
        Header: "Qty in pack",
        accessor: "quantityInPack",
        Filter: ColumnFilter,
      },
      {
        Header: "Retail Price",
        accessor: "retailPrice",
        Filter: ColumnFilter,
      },
      {
        Header: "Min Qty",
        accessor: "minimumQuantity",
        Filter: ColumnFilter,
      },
      {
        Header: "Max Qty",
        accessor: "maximumQuantity",
        Filter: ColumnFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: ColumnFilter,
      },
    ],
    []
  );

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
    nextPage,
    previousPage,
    state: { pageIndex },
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
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-striped table-bordered">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div style={{width: '80px'}}>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="pagination">
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
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
      placeholder={`${id}`}
      className="form-control"
    />
  );
};

export default ItemList;
