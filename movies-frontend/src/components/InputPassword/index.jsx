import React, { useState, forwardRef } from 'react';
import './styles.css';
import IconEyeOpen from '../../assets/openEye.svg';
import IconEyeClosed from '../../assets/closedEye.svg';

const InputPassword = forwardRef(({ label, placeholder, passwordValue, onChange, onBlur }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="flex-column input-password">
            <label htmlFor={passwordValue}>{label}</label>

            <input
                id={passwordValue}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                name={passwordValue}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
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