import React from 'react';

const FormField = ({ label, children }) => {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            {children}
        </div>
    );
};

export default FormField;
