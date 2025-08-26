import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ id, name, value, onChange, placeholder, rows = 4, required = false }) => {
    return (
        <textarea
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className="block w-full p-2 border border-[#8DC63F] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};

TextArea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.number,
};

export default TextArea;
