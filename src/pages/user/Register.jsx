import axios from "axios";
import React, { useState } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      try {
        const response = await axios.post(`${server}/users/register`, {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }, { withCredentials: true });
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={onChange}
        required
      />
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
      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={password2}
        onChange={onChange}
        required
      />
      <button className="btn btn-primary" type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
