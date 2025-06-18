import React from 'react';

const TextArea = ({ name, value, onChange, placeholder = '', rows = 4 }) => {
    return (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#137598]"
        />
    );
};

export default TextArea;
