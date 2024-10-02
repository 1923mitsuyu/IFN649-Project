import React from 'react'
import { useEffect, useState } from 'react'; // Import useState here
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend);

const socket = io('http://your-backend-url'); 

const TemperatureChart = () => {

  const [temperatures, setTemperatures] = useState([25, 28, 32, 30, 29]);
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    socket.on('temperatureUpdate', (newTemperature) => {
      // setTemperatures((prev) => [...prev, newTemperature]);
      // checkWarning(newTemperature);
  });
  
  checkWarning(temperatures);
  return () => {
    socket.off('temperatureUpdate');
  };
}, []);

  const checkWarning = (temp) => {
    if (temp > 30) {
      setWarnings((prev) => [...prev, "水を飲もう"]);
    }
  };

  const data = {
    labels: temperatures.map((_, index) => index + 1),
    datasets: [
      {
        label: '温度 (°C)',
        data: temperatures,
        borderColor: temperatures.map(temp => (temp >= 28 ? 'red' : 'blue')),
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <h2>温度グラフ</h2>
      {warnings.length > 0 && (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          {warnings[warnings.length - 1]}
        </div>
      )}
      <Line data={data} />
    </div>
  );
};

export default TemperatureChart;