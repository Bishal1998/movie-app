import React, { useState } from "react";
import { Button, Input } from "../components";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.email ||
      !formData.cpassword
    ) {
      return toast.error("All Fields are required");
    }
    if (formData.cpassword !== formData.password) {
      return toast.error("Password didnot match");
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success("User registered successfully!!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
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
        <Button text="Register" isLoading={isLoading} />
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
