import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ label, htmlFor, children }) => {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            {children}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    htmlFor: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default FormField;
