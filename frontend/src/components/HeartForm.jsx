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
    <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 p-10 text-white">
        <h2 className="text-5xl font-extrabold">
          ❤️ Heart Disease Prediction
        </h2>

        <p className="mt-4 text-lg text-red-50">
          AI-powered cardiovascular risk assessment using machine
          learning.
        </p>
      </div>

      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>

          {/* Clinical Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              Clinical Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <select
                name="cp"
                value={formData.cp}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              >
                <option value="">Chest Pain Type</option>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-Anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>

              <input
                type="number"
                name="trestbps"
                placeholder="Resting Blood Pressure"
                value={formData.trestbps}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <input
                type="number"
                name="chol"
                placeholder="Cholesterol"
                value={formData.chol}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <input
                type="number"
                name="fbs"
                placeholder="Fasting Blood Sugar"
                value={formData.fbs}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />
            </div>
          </div>

          {/* ECG & Exercise */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              ECG & Exercise Data
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <select
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              >
                <option value="">ECG Result</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>

              <input
                type="number"
                name="thalach"
                placeholder="Maximum Heart Rate"
                value={formData.thalach}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <select
                name="exang"
                value={formData.exang}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              >
                <option value="">Exercise Angina</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              <input
                type="number"
                name="oldpeak"
                placeholder="Old Peak"
                value={formData.oldpeak}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <input
                type="number"
                name="slope"
                placeholder="Slope"
                value={formData.slope}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <input
                type="number"
                name="ca"
                placeholder="Number of Major Vessels"
                value={formData.ca}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              />

              <select
                name="thal"
                value={formData.thal}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-slate-300"
              >
                <option value="">Thalassemia</option>
                <option value="1">Normal</option>
                <option value="2">Fixed Defect</option>
                <option value="3">Reversible Defect</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl font-bold shadow-xl hover:scale-[1.01] transition"
          >
            Predict Heart Disease Risk
          </button>
        </form>

        {result && (
          <div
            className={`mt-10 rounded-3xl p-8 text-center shadow-xl ${
              result.includes("Detected")
                ? "bg-red-50 border border-red-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <p className="text-gray-500 uppercase tracking-wider mb-3">
              Risk Assessment Result
            </p>

            <div
              className={`inline-block px-6 py-2 rounded-full text-white font-bold mb-5 ${
                result.includes("Detected")
                  ? "bg-red-600"
                  : "bg-green-600"
              }`}
            >
              {result.includes("Detected")
                ? "HIGH RISK"
                : "LOW RISK"}
            </div>

            <h3 className="text-3xl font-bold">
              {result}
            </h3>

            <p className="mt-4 text-gray-600">
              {result.includes("Detected")
                ? "Further clinical evaluation is recommended."
                : "No significant cardiovascular risk detected."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeartForm;