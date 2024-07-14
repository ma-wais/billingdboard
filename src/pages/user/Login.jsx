import axios from "axios";
import React, { useState } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/users/login`, {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type={"password"}
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        required
      />
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
