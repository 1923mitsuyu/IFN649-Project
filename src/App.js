import React from 'react';
import TemperatureChart from './component/TemperatureChart';

function App() {
  return (
    <div className='bg-slate-50 min-h-screen'>
    <div className="font-san">
      <header className="bg-sky-700 p-3 text-white mb-10">
        <h1 className="text-lg">Temperature Visualization App</h1>
      </header>
      <TemperatureChart />
    </div>
    </div>
  );
}

export default App;