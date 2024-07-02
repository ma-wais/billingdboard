import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { server } from '../../App';

const ItemMapSupplier = () => {
  const [filter, setFilter] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]); // Initialize as an empty array
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/items`);
        const items = response.data;
        const itemNames = items.map(item => item.itemName);
        setOptions(itemNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleFilterChange = (event) => {
    const input = event.target.value.toLowerCase();
    setFilter(input);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option); // Use the selected option directly
    setFilter(option);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!supplier || !selectedOption || !quantity) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${server}/item-map-suppliers`,
        {
          supplierName: supplier,
          item: selectedOption,
          quantity: parseInt(quantity, 10),
        }
      );

      if (response.status === 201) {
        setMessage("Item map supplier added successfully.");
      } else {
        setMessage("Failed to add item map supplier.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(
        `Error: ${error.response ? error.response.data.message : "Server error"}`
      );
    }
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(filter)
  );

  return (
    <div className="box">
      <div className="heading">Item Map Supplier Add</div>
      <div className="inputs">
        <div className="row-inputs">
          <label htmlFor="supplier">Supplier:</label>
          <select
            name="supplier"
            id="supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            style={{ marginBottom: '8px' }}
          >
            <option value="" disabled>
              Select supplier
            </option>
            <option value="Supplier 1">Supplier 1</option>
            <option value="Supplier 2">Supplier 2</option>
          </select>
        </div>

        <div className="row-inputs">
          <div
            ref={dropdownRef}
            style={{
              position: 'relative',
              width: '300px',
              marginBottom: '8px',
            }}
          >
            <label htmlFor="item" style={{ marginRight: '8px', display: 'inline-block' }}>
              Item:
            </label>
            <input
              type="text"
              id="item"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Type to search..."
              onClick={() => setIsOpen(true)}
              style={{
                width: '100%',
                padding: '8px',
              }}
            />
            {isOpen && (
              <ul
                style={{
                  position: 'absolute',
                  width: '80%',
                  maxHeight: '200px',
                  left: '40px',
                  overflowY: 'auto',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  padding: '0',
                  zIndex: 10,
                  backgroundColor: 'white',
                  listStyle: 'none',
                  margin: '0',
                  padding: '0',
                }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      style={{
                        padding: '8px',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                      {option} {/* Display the name */}
                    </li>
                  ))
                ) : (
                  <li style={{ padding: '8px' }}>No options found</li>
                )}
              </ul>
            )}
          </div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ marginBottom: '8px', padding: '8px', width: '100px' }}
          />
          <div className="submit" style={{ borderTop: 'none' }}>
            <button onClick={handleSubmit}>Add To Table</button>
          </div>
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ItemMapSupplier;
