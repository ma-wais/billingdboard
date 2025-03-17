import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${server}/users/check-auth`, {
          withCredentials: true,
        });

        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/users/login`,
        {
          emailOrUsername: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="name"
        name="email"
        placeholder="Email or Username"
        value={formData.email}
        onChange={onChange}
      />
      <input
        type={"password"}
        name="password"
        placeholder="Password"
        value={formData.password}
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
