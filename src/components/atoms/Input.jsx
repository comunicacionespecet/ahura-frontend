import React from "react";

const Input = ({ label, name, value, onChange, type = "text", placeholder = "" }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#137598]"
    />
  );
};

export default Input;
