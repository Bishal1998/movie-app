import React, { useState } from "react";
import { Button, Input } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateMutation } from "../redux/api/user";
import { toast } from "react-toastify";
import { login } from "../redux/features/auth/authSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: userData.username || "",
    email: userData.email || "",
    password: userData.password || "",
  });

  const [update, { isLoading }] = useUpdateMutation();
  const dispatch = useDispatch();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await update({ id: userData._id, data: formData }).unwrap();
      dispatch(login(res));
      toast.success("User Updated successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="w-full max-w-[1500px] mx-auto py-4">
      <form
        className="flex flex-col justify-center items-center gap-8 h-[75vh]"
        onSubmit={handleUserUpdate}
      >
        <h2 className="font-bold text-3xl">Update Your Profile</h2>
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
          value={formData.password || ""}
          onChange={handleFormData}
        />
        <Button text={"Update"} />
      </form>
    </section>
  );
};

export default Profile;
