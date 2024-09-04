import React, { forwardRef } from 'react';
import './styles.css';

const InputText = forwardRef((props, ref) => {
    return (
        <div className="flex-column">
            <label htmlFor={props.name}>{props.label}</label>

            <input
                id={props.name}
                type="text"
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </div>
    );
});

export default InputText;