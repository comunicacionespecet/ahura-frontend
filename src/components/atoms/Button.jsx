import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    text,
    icon = null,
    type = 'primary',
    onClick = () => {},
    className = '',
    htmlType = 'button',
}) => {
    const baseStyle = `flex flex-col items-center justify-center rounded p-4 transition-transform duration-200 hover:scale-105 text-center`;

    const typeStyles = {
        primary: 'bg-[#137598] text-white hover:bg-[#0f5e77]',
        secondary: 'bg-[#70205B] text-white hover:bg-[#561946]',
        success: 'bg-[#8DC63F] text-white hover:bg-[#76a92f]',
        light: 'bg-[#EDEDED] text-black hover:bg-gray-200',
    };

    return (
        <button
            type={htmlType}
            onClick={onClick}
            className={`${baseStyle} ${typeStyles[type] || typeStyles.primary} ${className}`}
        >
            {icon && <div className="mb-2 text-2xl">{icon}</div>}
            <span className="text-md font-semibold">{text}</span>
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
    type: PropTypes.oneOf(['primary', 'secondary', 'success', 'light']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
