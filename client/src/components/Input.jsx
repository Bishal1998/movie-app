import React from "react";

const Input = ({ placeholder, type, name, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      className="bg-[#D9D9D9] outline-none text-xl px-5 rounded-lg w-screen sm:w-96 h-14"
    />
  );
};

export default Input;
