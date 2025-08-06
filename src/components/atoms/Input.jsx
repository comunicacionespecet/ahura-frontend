import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, name, value, onChange, type = 'text', placeholder }) => {
    return (
        <input
            id={id || name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="block w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring focus:[#35944B]"
        />
    );
};

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;
