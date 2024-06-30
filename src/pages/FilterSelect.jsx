import React, { useState, useEffect, useRef } from 'react';

const FilterableDropdown = () => {
  const [filter, setFilter] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    'MAALOX ADV SF 240ML / SYP',
    'IMATET / INJ',
    'BROMALEX 3MG / TAB',
    'MAXPAN 400MG / CAPS',
    'MAXEF 1G IV / INJ',
    'MALGO 30ML / SYP',
    'LEVOMA 25MG / TAB',
    'LEVOMA 50MG / TAB',
    'A MAL / INJ'
  ];

  const handleFilterChange = (event) => {
    const input = event.target.value.toLowerCase();
    setFilter(input);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setFilter(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(filter)
  );

  return (
    <div 
      ref={dropdownRef} 
      style={{ 
        position: 'relative', 
        width: '300px' 
      }}
    >
      <label htmlFor="item">Item:</label>
      <input
        type="text"
        id="item"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Type to search..."
        onClick={() => {setIsOpen(true);}}
        style={{width: '100%',padding: '8px'}}
      />
      {isOpen && (
        <ul style={{
          position: 'absolute',
          width: '100%',
          maxHeight: '200px',
          overflowY: 'auto',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          zIndex: '1000',
          padding: '0',
        }}>
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
                {option}
              </li>
            ))
          ) : (
            <li> No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterableDropdown;
