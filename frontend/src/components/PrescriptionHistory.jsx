import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHistory,
  FaPills,
  FaFlask,
  FaCalendarAlt,
} from "react-icons/fa";

function PrescriptionHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/history`
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRiskLevel = (item) => {
    let score = 0;

    if (item.medicines_count >= 5) score += 20;
    if (item.tests_count >= 3) score += 10;

    if (score >= 30) return "High";
    if (score >= 20) return "Moderate";

    return "Low";
  };

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <FaHistory className="text-indigo-600 text-4xl" />

          <h2 className="text-4xl font-bold text-slate-800">
            Prescription History
          </h2>
        </div>

        <p className="text-slate-500">
          Previously analyzed prescriptions and
          healthcare insights
        </p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <p className="text-slate-500">
            No prescription history found.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {history.map((item) => {
            const risk = getRiskLevel(item);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-slate-500 font-medium">
                    Record #{item.id}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      risk === "High"
                        ? "bg-red-100 text-red-600"
                        : risk === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {risk} Risk
                  </span>
                </div>

                {/* Diagnosis */}
                <div className="mb-5">
                  <p className="text-xs uppercase text-slate-400 mb-2">
                    Diagnosis
                  </p>

                  <h3 className="text-xl font-bold text-slate-800">
                    {item.diagnosis}
                  </h3>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <FaPills className="text-blue-600 text-2xl mx-auto mb-2" />

                    <div className="text-3xl font-bold text-blue-600">
                      {item.medicines_count}
                    </div>

                    <div className="text-sm text-slate-600">
                      Medicines
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    <FaFlask className="text-green-600 text-2xl mx-auto mb-2" />

                    <div className="text-3xl font-bold text-green-600">
                      {item.tests_count}
                    </div>

                    <div className="text-sm text-slate-600">
                      Tests
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="border-t pt-4 flex items-center gap-2 text-slate-500">
                  <FaCalendarAlt />

                  <p className="text-sm">
                    {item.created_at}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PrescriptionHistory;