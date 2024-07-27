import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { server } from '../../App';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} className="form-control" />;
};

const ColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search ${count} records...`}
      className="form-control"
    />
  );
};
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
        setData([]);
        setOriginalData([]);
      }
    };

    fetchData();
  }, []);

  const updateMyData = useCallback((rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  }, []);

  const saveChanges = useCallback(async (rowIndex) => {
    const item = data[rowIndex];
    const originalItem = originalData[rowIndex];
    const updates = {};

    Object.keys(item).forEach((key) => {
      if (item[key] !== originalItem[key]) {
        updates[key] = item[key];
      }
    });

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

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'itemName',
        Filter: ColumnFilter,
      },
      {
        Header: 'Company',
        accessor: 'companyName',
        Filter: ColumnFilter,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        Filter: ColumnFilter,
      },
      {
        Header: 'Unit',
        accessor: 'unit',
        Filter: ColumnFilter,
      },
      // {
      //   Header: 'Stock Type',
      //   accessor: 'stockType',
      //   Filter: ColumnFilter,
      // },
      {
        Header: 'Rack',
        accessor: 'itemRackNumber',
        Filter: ColumnFilter,
      },
      {
        Header: 'Qty in pack',
        accessor: 'quantityInPack',
        Filter: ColumnFilter,
      },
      {
        Header: 'Retail Price',
        accessor: 'retailPrice',
        Filter: ColumnFilter,
      },
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
    ],
    [saveChanges]
  );

  const defaultColumn = useMemo(() => ({
    Cell: EditableCell,
  }), []);

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
      updateMyData,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  );

  return (
    <div className='box'>
      <div className='heading'>
        <p>Update Items</p>
      </div>
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
    </div>
  );
};

export default ItemTable;