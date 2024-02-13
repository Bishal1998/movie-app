import React from "react";

const Button = ({ isLoading, text }) => {
  return (
    <button
      className="outline-none text-xl px-5 rounded-lg w-screen sm:w-96 h-14 bg-[#37C6F3] text-white"
      disabled={isLoading}
    >
      {isLoading
        ? text === "Register"
          ? "Registering..."
          : "Logging in..."
        : text}
    </button>
  );
};

export default Button;
