import { useState } from "react";
import axios from "axios";

function HeartForm() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          ...formData,
          age: Number(formData.age),
          sex: Number(formData.sex),
          cp: Number(formData.cp),
          trestbps: Number(formData.trestbps),
          chol: Number(formData.chol),
          fbs: Number(formData.fbs),
          restecg: Number(formData.restecg),
          thalach: Number(formData.thalach),
          exang: Number(formData.exang),
          oldpeak: Number(formData.oldpeak),
          slope: Number(formData.slope),
          ca: Number(formData.ca),
          thal: Number(formData.thal),
        }
      );

      setResult(response.data.prediction);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Heart Disease Prediction</h2>

      <form onSubmit={handleSubmit}>

        {Object.keys(formData).map((key) => (
          <div key={key}>
            <input
              type="text"
              name={key}
              placeholder={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit">Predict</button>
      </form>

      {result && <h3>{result}</h3>}
    </div>
  );
}

export default HeartForm;