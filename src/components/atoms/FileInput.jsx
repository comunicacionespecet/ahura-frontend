import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ name, onChange }) => {
    return (
        <input
            name={name}
            type="file"
            accept="image/*"
            onChange={onChange}
            data-testid="file-input"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#137598] file:text-white hover:file:bg-[#0e5c78]"
        />
    );
};

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default FileInput;
