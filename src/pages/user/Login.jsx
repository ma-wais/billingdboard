import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = ({setToken, setUser, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/users/login`,
        {
          emailOrUsername: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(response.data.user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="name"
        name="email"
        placeholder="Email or Username"
        value={email}
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

export default Login;
