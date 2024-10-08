import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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

const TemperatureChart = () => {
  const [temperatures, setTemperatures] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [warning, setWarnings] = useState(false);
  const MAX_SIZE = 10; 
  const chart_name = "Temperature Chart";
  const warning_message = "Please drink water"

  useEffect(() => {

    // Declare a func to fetch temperature values with a validation
    const fetchTemperature = async () => {
      try {
        const response = await fetch('http://your-backend-url/temperature'); // Adjust the URL
        const data = await response.json();
        if (data.temperature) {
          const currentTime = new Date().toLocaleTimeString(); 
          checkWarning(data.temperature);
          setTemperatures((prev) => {
            // Declare a list to add a new value to the list
            const updatedTemperatures = [...prev, data.temperature];
            // Check the length of the list 
            return updatedTemperatures.length > MAX_SIZE 
              // Chop off the excessive values from the list and return it
              ? updatedTemperatures.slice(updatedTemperatures.length - MAX_SIZE) 
              // Just return the list as it is
              : updatedTemperatures;
          });
          setTimestamps((prev) => {
            const updatedTimestamps = [...prev, currentTime];
            return updatedTimestamps.length > MAX_SIZE 
              ? updatedTimestamps.slice(updatedTimestamps.length - MAX_SIZE) 
              : updatedTimestamps;
          });

        }
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    // Initial fetch
    fetchTemperature();

    // Fetch temperature every 10 seconds
    const interval = setInterval(fetchTemperature, 5000); // Set to 10000 ms (10 seconds)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const checkWarning = (temp) => {
    if (temp > 30) {
      setWarnings(true);
    } else {
      setWarnings(false); // 温度が30度以下の場合は警告を解除
    }
  };

  const data = {
    // labels: temperatures.map((_, index) => index + 1),
    labels: timestamps, // 時刻をX軸のラベルに設定
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: temperatures.map(temp => (temp >= 28 ? 'red' : 'blue')),
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center mb-5">{chart_name}</h2>
      { warning && (
        <div className="text-red-600 font-bold">{warning_message}</div>
      )}
      <Line data={data} />
    </div>
  );
};

export default TemperatureChart;
