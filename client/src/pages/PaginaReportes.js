import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageReportsLending from "../Reports/PageReportsLending";
import PageReportLendingForDate from "../Reports/PageReportLendingForDate";
import Grafic1 from "../grafics/Grafic1";
import facadeImage from "../img/fachada.jpg";

const PaginaReportes = () => {
  const [reportType, setReportType] = useState("normal");

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div
        className="flex-grow p-6"
        style={{
          backgroundImage: `url(${facadeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",     
        }}
      >
        <div className="flex-grow p-6 flex flex-col items-center justify-center border-gray-300 shadow-lg bg-white rounded-lg">
          <h1 className="text-2xl font-bold">Pagina Reportes</h1>
        </div>
        <div className="w-1/2 h-2/5 bg-red-600 mb-4 mt-4 rounded border border-gray-300">
          <div className="mb-4 mt-4 flex flex-col items-center justify-center">
            <div className="relative z-10">
              <label className="mr-4 text-white">
                <input
                  type="radio"
                  name="reportType"
                  value="normal"
                  checked={reportType === "normal"}
                  onChange={() => setReportType("normal")}
                  className="mr-2"
                />
                Reporte Simple
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  name="reportType"
                  value="date"
                  checked={reportType === "date"}
                  onChange={() => setReportType("date")}
                  className="mr-2"
                />
                Reporte Por Fecha
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center h-1/2">
            {reportType === "normal" ? (
              <div className="flex items-center justify-center">
                <PageReportsLending />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <PageReportLendingForDate />
              </div>
            )}
          </div>
        </div>
        <Grafic1 />
      </div>
    </div>
  );
};

export default PaginaReportes;
