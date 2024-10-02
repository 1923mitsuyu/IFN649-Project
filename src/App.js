import React from 'react';
import TemperatureChart from './component/TemperatureChart';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>温度可視化アプリ</h1>
      <TemperatureChart />
    </div>
  );
}

export default App;