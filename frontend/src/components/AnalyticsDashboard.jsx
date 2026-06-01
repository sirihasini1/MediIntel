import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  FaPills,
  FaFlask,
  FaClipboardList,
  FaStethoscope,
  FaChartLine,
} from "react-icons/fa";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b"];

function AnalyticsDashboard({ analysis }) {
  if (!analysis) return null;

  const medicines = Array.isArray(analysis.medicines)
    ? analysis.medicines
    : [];

  const tests = Array.isArray(analysis.tests)
    ? analysis.tests
    : [];

  const totalMedicines = medicines.length;
  const totalTests = tests.length;

  const diagnosisCount =
    analysis.diagnosis &&
    analysis.diagnosis !== "Not detected"
      ? 1
      : 0;

  const instructionCount = medicines.filter(
    (med) => med.instructions && med.instructions.trim() !== ""
  ).length;

  const pieData = [
    {
      name: "Medicines",
      value: totalMedicines,
    },
    {
      name: "Tests",
      value: totalTests,
    },
    {
      name: "Instructions",
      value: instructionCount,
    },
  ];

  const barData = [
    {
      name: "Diagnosis",
      count: diagnosisCount,
    },
    {
      name: "Medicines",
      count: totalMedicines,
    },
    {
      name: "Tests",
      count: totalTests,
    },
  ];

  let riskScore = 0;

  if (totalMedicines >= 5) riskScore += 20;
  if (totalTests >= 3) riskScore += 10;

  if (
    typeof analysis.diagnosis === "string" &&
    (
      analysis.diagnosis.toLowerCase().includes("asthma") ||
      analysis.diagnosis.toLowerCase().includes("copd")
    )
  ) {
    riskScore += 30;
  }

  if (
    medicines.some(
      (med) =>
        med.name &&
        (
          med.name.toLowerCase().includes("moxclav") ||
          med.name.toLowerCase().includes("azithro") ||
          med.name.toLowerCase().includes("amox")
        )
    )
  ) {
    riskScore += 20;
  }

  if (riskScore > 100) riskScore = 100;

  let riskLevel = "Low";

  if (riskScore >= 70) {
    riskLevel = "High";
  } else if (riskScore >= 40) {
    riskLevel = "Moderate";
  }

  const insights = [];

  if (riskLevel === "High") {
    insights.push(
      "Patient profile indicates elevated clinical complexity."
    );
  }

  if (riskLevel === "Moderate") {
    insights.push(
      "Moderate monitoring may be required."
    );
  }

  if (totalMedicines >= 5) {
    insights.push(
      "Multiple medicines prescribed (Polypharmacy Pattern)"
    );
  }

  if (
    typeof analysis.diagnosis === "string" &&
    (
      analysis.diagnosis.toLowerCase().includes("asthma") ||
      analysis.diagnosis.toLowerCase().includes("copd") ||
      analysis.diagnosis.toLowerCase().includes("cough")
    )
  ) {
    insights.push(
      "Respiratory-related condition detected"
    );
  }

  if (
    medicines.some(
      (med) =>
        med.name &&
        (
          med.name.toLowerCase().includes("moxclav") ||
          med.name.toLowerCase().includes("azithro") ||
          med.name.toLowerCase().includes("amox")
        )
    )
  ) {
    insights.push(
      "Antibiotic medication identified"
    );
  }

  if (totalTests >= 3) {
    insights.push(
      "Multiple diagnostic investigations recommended"
    );
  }

  return (
    <div className="mt-10">

      <div className="flex items-center justify-center gap-3 mb-8">
        <FaChartLine className="text-indigo-600 text-3xl" />

        <h2 className="text-4xl font-bold text-indigo-600">
          Healthcare Analytics Dashboard
        </h2>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-xl">
          <FaPills className="text-3xl mb-4" />

          <p className="text-blue-100">
            Medicines
          </p>

          <h3 className="text-4xl font-bold">
            {totalMedicines}
          </h3>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-3xl shadow-xl">
          <FaFlask className="text-3xl mb-4" />

          <p className="text-green-100">
            Tests
          </p>

          <h3 className="text-4xl font-bold">
            {totalTests}
          </h3>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-3xl shadow-xl">
          <FaClipboardList className="text-3xl mb-4" />

          <p className="text-yellow-100">
            Instructions
          </p>

          <h3 className="text-4xl font-bold">
            {instructionCount}
          </h3>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-6 rounded-3xl shadow-xl">
          <FaStethoscope className="text-3xl mb-4" />

          <p className="text-red-100">
            Diagnosis
          </p>

          <h3 className="text-4xl font-bold">
            {diagnosisCount}
          </h3>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Prescription Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Clinical Overview
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Risk Assessment */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
        <h3 className="text-2xl font-semibold mb-5">
          Clinical Risk Assessment
        </h3>

        <div className="flex flex-col items-center">

          <div className="text-7xl font-bold text-red-600">
            {riskScore}
          </div>

          <div className="text-lg mt-3 font-medium">
            Risk Score
          </div>

          <div
            className={`mt-4 px-6 py-2 rounded-full text-white font-semibold ${
              riskLevel === "High"
                ? "bg-red-600"
                : riskLevel === "Moderate"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {riskLevel} Risk
          </div>

        </div>
      </div>

      {/* Insights */}

      <div className="bg-white rounded-3xl shadow-xl p-6">
        <h3 className="text-2xl font-semibold mb-5">
          Smart Clinical Insights
        </h3>

        {insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl"
              >
                {insight}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No major clinical insights detected.
          </p>
        )}
      </div>

    </div>
  );
}

export default AnalyticsDashboard;