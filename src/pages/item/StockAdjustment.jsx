import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { server } from '../../App';

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    updateMyData(index, id, newValue);
  };

  return <input value={value} onChange={onChange} className="editableInput" />;
};

const ColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows } }) => (
  <input
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder="Search"
    className="editableInput border"
  />
);

const ItemTable = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${server}/items`);
        const itemsArray = Array.isArray(result.data) ? result.data : [];
        setData(itemsArray);
        setOriginalData(itemsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateMyData = useCallback((rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  }, []);

  const saveChanges = useCallback(async (rowIndex) => {
    const item = data[rowIndex];
    const originalItem = originalData[rowIndex];
    const updates = Object.keys(item).reduce((acc, key) => {
      if (item[key] !== originalItem[key]) acc[key] = item[key];
      return acc;
    }, {});

    if (Object.keys(updates).length > 0) {
      try {
        await axios.put(`${server}/items/${item._id}`, updates);
        setOriginalData(data);
        alert('Item updated successfully');
      } catch (error) {
        console.error('Error updating item:', error);
        alert('Error updating item');
      }
    } else {
      alert('No changes to save');
    }
  }, [data, originalData]);

  const columns = useMemo(() => [
    { Header: "Item Name", accessor: "itemName", Filter: ColumnFilter },
    { Header: "Current Stock", accessor: "stock", Filter: ColumnFilter },
    { Header: "Physical Stock Qty", accessor: "physicalStock", Filter: ColumnFilter },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <button className="btn btn-primary" onClick={() => saveChanges(row.index)}>
          Save
        </button>
      ),
      disableFilters: true,
    },
  ], [saveChanges]);

  const defaultColumn = useMemo(() => ({ Cell: EditableCell }), []);

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
    { columns, data, defaultColumn, updateMyData, initialState: { pageIndex: 0 } },
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
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
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
      <div className="pagination d-flex justify-content-center align-items-center">
        <button onClick={previousPage} disabled={!canPreviousPage} className="btn btn-secondary mx-1">
          {'<'}
        </button>
        <span>
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </span>
        <button onClick={nextPage} disabled={!canNextPage} className="btn btn-secondary mx-1">
          {'>'}
        </button>
      </div>
    </>
  );
};

export default ItemTable;
