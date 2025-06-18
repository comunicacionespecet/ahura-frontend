import React from 'react';

const FileInput = ({ name, onChange }) => {
    return (
        <input
            type="file"
            name={name}
            onChange={onChange}
            accept="image/*"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#137598] file:text-white hover:file:bg-[#0e5c78]"
        />
    );
};

export default FileInput;
