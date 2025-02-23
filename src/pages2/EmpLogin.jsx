import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../App";
import { useNavigate } from "react-router-dom";

const EmpLogin = ({ setToken2, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/sales");
    }
  }, [token, navigate]);
  
  const { name, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/employees/login`,
        {
          name: formData.name,
          password: formData.password,
        },
        { withCredentials: true }
      );
      const token = response.data.employee._id;
      localStorage.setItem("token2", token);
      setToken2(token);

      navigate("/sales");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
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

export default EmpLogin;
