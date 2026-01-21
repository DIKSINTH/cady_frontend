import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api.js";

const API_URL = `${API_BASE}/api/visiting-card-design-process`;

const DesignProcess = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result[0] || null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data: {error}
      </div>
    );
  if (!data) return <div className="text-center py-20">No data found.</div>;

  return (
    <div className="bg-white py-16 px-4 font-sans">
      <h2 className="text-3xl font-semibold text-center mb-16 text-gray-800">
        Our Design Process
      </h2>

      {/* ================= MOBILE & TABLET VIEW ================= */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:hidden">
        {[
          {
            title: data.Design_Process1,
            points: [data.Design_Process11, data.Design_Process12],
          },
          {
            title: data.Design_Process2,
            points: [data.Design_Process21, data.Design_Process22],
          },
          {
            title: data.Design_Process3,
            points: [data.Design_Process31],
          },
          {
            title: data.Design_Process4,
            points: [data.Design_Process41, data.Design_Process42],
          },
          {
            title: data.Design_Process5,
            points: [data.Design_Process51, data.Design_Process52],
          },
        ].map((item, index) => (
          <div
            key={index}
            className="w-full max-w-sm mx-auto border-2 border-cyan-200 rounded-3xl p-8 bg-white shadow-sm min-h-[250px] text-center"
          >
            <h3 className="cady-text font-bold text-xl mb-4">{item.title}</h3>
            <ul className="text-gray-700 text-sm space-y-3 list-disc text-left px-4">
              {item.points.map((point, i) => point && <li key={i}>{point}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW (UNCHANGED) ================= */}
      <div className="max-w-7xl mx-auto relative hidden lg:block">
        {/* ====== BOX 1 ====== */}
        <div className="absolute left-30 top-0 w-1/3 flex justify-center">
          <div className="w-full max-w-sm border-2 border-cyan-200 rounded-3xl p-8 bg-white shadow-sm min-h-[250px] text-center">
            <h3 className="cady-text font-bold text-xl mb-4">
              {data.Design_Process1}
            </h3>
            <ul className="text-gray-700 text-sm space-y-3 list-disc text-left px-4">
              {data.Design_Process11 && <li>{data.Design_Process11}</li>}
              {data.Design_Process12 && <li>{data.Design_Process12}</li>}
            </ul>
          </div>
        </div>

        <img
          src="/dart1.png"
          alt="dart"
          className="absolute w-70 left-[41%] top-24"
        />

        {/* ====== BOX 2 ====== */}
        <div className="absolute right-15 top-0 w-1/3 flex justify-center">
          <div className="w-full max-w-sm border-2 border-cyan-200 rounded-3xl p-8 bg-white shadow-sm min-h-[250px] text-center">
            <h3 className="cady-text font-bold text-xl mb-4">
              {data.Design_Process2}
            </h3>
            <ul className="text-gray-700 text-sm space-y-3 list-disc text-left px-4">
              {data.Design_Process21 && <li>{data.Design_Process21}</li>}
              {data.Design_Process22 && <li>{data.Design_Process22}</li>}
            </ul>
          </div>
        </div>

        <img
          src="/dart2.png"
          alt="dart"
          className="absolute w-32 right-30 top-63"
        />

        {/* ====== BOX 3 ====== */}
        <div className="absolute left-300 top-[380px] -translate-x-1/2 w-1/3 flex justify-center">
          <div className="w-full max-w-sm border-2 border-cyan-200 rounded-3xl p-8 bg-white shadow-sm min-h-[250px] text-center">
            <h3 className="cady-text font-bold text-xl mb-4">
              {data.Design_Process3}
            </h3>
            <ul className="text-gray-700 text-sm space-y-3 list-disc text-left px-4">
              {data.Design_Process31 && <li>{data.Design_Process31}</li>}
            </ul>
          </div>
        </div>

        <img
          src="/dart3.png"
          alt="dart"
          className="absolute w-50 right-68 top-[500px]"
        />

        {/* ====== BOX 4 ====== */}
        <div className="absolute right-113 top-[440px] w-1/3 flex justify-center">
          <div className="w-full max-w-sm border-2 border-cyan-200 rounded-3xl p-8 bg-white shadow-sm min-h-[250px] text-center">
            <h3 className="cady-text font-bold text-xl mb-4">
              {data.Design_Process4}
            </h3>
            <ul className="text-gray-700 text-sm space-y-3 list-disc text-left px-4">
              {data.Design_Process41 && <li>{data.Design_Process41}</li>}
              {data.Design_Process42 && <li>{data.Design_Process42}</li>}
            </ul>
          </div>
        </div>

        <img
          src="/dart4.png"
          alt="dart"
          className="absolute w-42 left-[20%] top-[550px]"
        />

        {/* ====== BOX 5 ====== */}
        <div className="absolute right-251 top-[460px] w-1/3 flex justify-center">
          <div className="w-full max-w-sm border-2 border-cyan-200 rounded-3xl p-8 bg-white shadow-sm min-h-[250px] text-center">
            <h3 className="cady-text font-bold text-xl mb-4">
              {data.Design_Process5}
            </h3>
            <ul className="text-gray-700 text-sm space-y-3 list-disc text-left px-4">
              {data.Design_Process51 && <li>{data.Design_Process51}</li>}
              {data.Design_Process52 && <li>{data.Design_Process52}</li>}
            </ul>
          </div>
        </div>

        <div className="h-[700px]" />
      </div>
    </div>
  );
};

export default DesignProcess;
