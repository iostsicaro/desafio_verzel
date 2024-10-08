import React, { useState, forwardRef } from 'react';
import './styles.css';
import IconEyeOpen from '../../assets/openEye.svg';
import IconEyeClosed from '../../assets/closedEye.svg';

const InputPassword = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="flex-column input-password">
            <label htmlFor={props.name}>{props.label}</label>

            <input
                id={props.name}
                type={showPassword ? 'text' : 'password'}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />

            <img
                src={showPassword ? IconEyeOpen : IconEyeClosed}
                className="eye-password"
                onClick={toggleShowPassword}
                alt={showPassword ? 'Hide password' : 'Show password'}
            />
        </div>
    );
});

export default InputPassword;