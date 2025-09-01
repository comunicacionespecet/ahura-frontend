import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    id,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    required = false,
    className = '',
    onBlur,
}) => {
    return (
        <input
            id={id || name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            className={`block w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B] ${className}`}
        />
    );
};

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onBlur: PropTypes.func,
};

export default Input;
