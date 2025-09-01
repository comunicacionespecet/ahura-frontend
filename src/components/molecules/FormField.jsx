import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ label, htmlFor, children }) => {
    return (
        <div className="flex flex-col gap-1 mb-4 w-full">
            <label
                htmlFor={htmlFor}
                className="text-base md:text-lg lg:text-xl font-medium text-black"
            >
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
