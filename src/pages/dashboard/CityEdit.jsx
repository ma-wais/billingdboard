import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const CityEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    axios
      .get(`${server}/cities/${id}`)
      .then((response) => {
        setData(response.data);
        setCityName(response.data.name);
      })
  }, []);

  const handleSave = () => {
    axios
      .put(`${server}/cities/${id}`, { name: cityName })

      navigate(`/city`)
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Edit City</p>
      </div>
      <div className="inputs">
        <input
          type="text"
          placeholder="City Name"
          style={{ maxWidth: "300px" }}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </div>
      <div className="submit">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CityEdit;
