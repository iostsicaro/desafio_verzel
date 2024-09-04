import React, { forwardRef } from 'react';
import './styles.css';

const InputText = forwardRef(({ label, placeholder, name, onChange, onBlur }, ref) => {
    return (
        <div className="flex-column">
            <label htmlFor={name}>{label}</label>

            <input
                id={name}
                type="text"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />
        </div>
    );
});

export default InputText;