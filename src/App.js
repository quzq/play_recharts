import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './containers/SimpleLineChart'
import SimpleBarChart from './containers/SimpleBarChart'
import ThreeDimScatterChart from './containers/ThreeDimScatterChart'



function App() {
  return (
    <div className="App">
      <SimpleLineChart/>
      <SimpleBarChart/>
      <ThreeDimScatterChart/>
    </div>
  );
}

export default App;
