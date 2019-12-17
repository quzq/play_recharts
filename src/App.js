import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './containers/SimpleLineChart'
import SimpleBarChart from './containers/SimpleBarChart'
import ThreeDimScatterChart from './containers/ThreeDimScatterChart'
import TwoLevelPieChart from './containers/TwoLevelPieChart'
import TwoSimplePieChart from './containers/TwoSimplePieChart'
import CustomContentOfTooltip from './containers/CustomContentOfTooltip'
import MyPieChart from './containers/MyPieChart'
import CustomActiveShapePieChart from './containers/CustomActiveShapePieChart'

function App() {
  return (
    <div className="App">
      <div style={{ height: 500, width: 400, background:'#eeeeee' }} >
        <MyPieChart />
      </div>
      <CustomActiveShapePieChart />
      <SimpleLineChart />
      <SimpleBarChart />
      <ThreeDimScatterChart />
      <TwoLevelPieChart />
      <TwoSimplePieChart />
      <CustomContentOfTooltip/>
    </div>
  );
}

export default App;
