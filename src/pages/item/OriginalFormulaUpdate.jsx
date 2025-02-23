import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const OriginalFormula = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    composition: "",
  });


  useEffect(() => {
    axios
      .get(`${server}/formula/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios
      .put(`${server}/formula/${id}`, {
        name: formData.name,
        composition: formData.composition,
      })
      .then(() => {
        navigate("/formula");
      })
      .catch((error) => {
        console.error("There was an error saving the formula!", error);
      });
  };

  return (
    <div className="box">
      <div className="heading">
        <p>Add Formula</p>
      </div>
      <form className="inputs" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Formula Name"
          name="name"
          style={{ maxWidth: "300px" }}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Composition"
          name="composition"
          style={{ maxWidth: "300px" }}
          value={formData.composition}
          onChange={handleChange}
        />
        <div className="submit">
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default OriginalFormula;
