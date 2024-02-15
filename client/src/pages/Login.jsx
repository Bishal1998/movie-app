import React, { useState } from "react";
import { Button, Input } from "../components";
import { Link, Navigate } from "react-router-dom";
import { useLoginApiMutation } from "../redux/api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginApi, { isLoading, isError }] = useLoginApiMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.email) {
      return toast.error("All Fields are required");
    }

    try {
      const res = await loginApi({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(login(res));
      toast.success("Login Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (userData) return <Navigate to={"/profile"} />;

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
        <Button text="Login" isLoading={isLoading} />
      </form>
      <p className="text-base text-[#6D6D6D]">
        Didn't have an account?{" "}
        <Link to={"/register"} className="font-bold">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
