import React from 'react';
import './styles.css';

export default function InputSearch({ placeholder, value, setValue }) {
  return (
    <div className="input-search flex-column">
      <input
        id="text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}