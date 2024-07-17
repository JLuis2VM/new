import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(i * 360) / count}, 100%, 50%)`);
  }
  return colors;
};

const Grafic1 = () => {
  const [chartData, setChartData] = useState(null);
  const [sorted, setSorted] = useState(false);

  const sortData = (data, ascending = true) => {
    return data.sort((a, b) => (ascending ? a.Cantidad - b.Cantidad : b.Cantidad - a.Cantidad));
  };

  const fetchData = async (ascending = true) => {
    try {
      const response = await axios.get('http://localhost:5000/tablaprestamosmaestro');
      let data = response.data;

      if (data && Array.isArray(data)) {
        data = sortData(data, ascending);
        const names = data.map(item => item.Nombre);
        const quantities = data.map(item => item.Cantidad);
        const colors = generateColors(data.length);

        setChartData({
          labels: names,
          datasets: [
            {
              label: 'Prestamos Docentes',
              data: quantities,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (ascending) => {
    fetchData(ascending);
    setSorted(ascending);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        <FontAwesomeIcon icon={faChartBar} className="mr-2" />
        Número de prestamos de Docentes
      </h2>
      <div className="mb-4">
        <button
          onClick={() => handleSort(true)}
          className={`px-4 py-2 mr-2 text-white rounded ${sorted ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Ordenar Ascendente
        </button>
        <button
          onClick={() => handleSort(false)}
          className={`px-4 py-2 text-white rounded ${!sorted ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Ordenar Descendente
        </button>
      </div>
      {chartData ? (
        <div className="w-1/2 h-1/8">
          <Bar data={chartData} />
        </div>
      ) : (
        <p>Cargando Datos...</p>
      )}
    </div>
  );
};

export default Grafic1;
