import React, { useState } from "react";
import { Button, Input } from "../components";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.cpassword !== formData.password) {
      return console.log("Password didnot match");
    }

    console.log(formData);
  };

  return (
    <section className="w-full max-w-7xl h-screen mx-auto flex flex-col items-center justify-center gap-8 px-8">
      <h2 className="font-bold text-6xl sm:text-8xl">
        The <br /> Movie <br /> Tracker
      </h2>
      <form
        className="flex flex-col gap-8 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleFormData}
        />
        <Input
          placeholder="Email Address"
          type="e-email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormData}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleFormData}
        />
        <Button />
      </form>
      <p className="text-base text-[#6D6D6D]">
        Already have an account?{" "}
        <Link to={"/login"} className="font-bold">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
