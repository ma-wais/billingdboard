import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import "./change.scss";

const Change = ({ id }) => {
  const navigate = useNavigate();
  const [oldEmployeeCode, setOldEmployeeCode] = useState("");
  const [newEmployeeCode, setNewEmployeeCode] = useState("");
  const [confirmEmployeeCode, setConfirmEmployeeCode] = useState("");

  const onChangeOldCode = (e) => {
    setOldEmployeeCode(e.target.value);
  };

  const onChangeNewCode = (e) => {
    setNewEmployeeCode(e.target.value);
  };

  const onChangeConfirmCode = (e) => {
    setConfirmEmployeeCode(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newEmployeeCode !== confirmEmployeeCode) {
      alert("Employee codes do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${server}/employees/code/${id}`,
        {
          oldEmployeeCode,
          newEmployeeCode,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/sales");
    } catch (error) {
      console.error("Employee code change failed", error);
    }
  };

  return (
    <div className="change">
      <input
        type="password"
        onChange={onChangeOldCode}
        placeholder="Old Employee Code"
      />
      <input
        type="password"
        onChange={onChangeNewCode}
        placeholder="New Employee Code"
      />
      <input
        type="password"
        onChange={onChangeConfirmCode}
        placeholder="Confirm New Code"
      />
      <button onClick={onSubmit}>Change</button>
    </div>
  );
};

export default Change;
