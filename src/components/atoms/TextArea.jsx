import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ id, name, value, onChange, placeholder, rows = 4 }) => {
    return (
        <textarea
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
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
    rows: PropTypes.number,
};

export default TextArea;
