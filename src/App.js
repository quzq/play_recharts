import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './containers/SimpleLineChart'
import SimpleBarChart from './containers/SimpleBarChart'
import ThreeDimScatterChart from './containers/ThreeDimScatterChart'
import TwoLevelPieChart from './containers/TwoLevelPieChart'
import TwoSimplePieChart from './containers/TwoSimplePieChart'



function App() {
  return (
    <div className="App">
      <SimpleLineChart/>
      <SimpleBarChart/>
      <ThreeDimScatterChart/>
      <TwoLevelPieChart/>
      <TwoSimplePieChart/>
    </div>
  );
}

export default App;
