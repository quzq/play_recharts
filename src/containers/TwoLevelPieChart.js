import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,Legend, Tooltip
} from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
const COLORS =['#110000', '#FF0000', '#88FF00', '#0088FF' ]

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/w6wsrc52/';

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie 
          data={data01} 
          dataName="name"
          dataKey="value" 
          cx={190} cy={200} 
          outerRadius={60} 
          fill="#8884d8" 
          legendType={'cross'} // legend上のアイコン形状
        >
          { //円グラフの色を各領域ごとに分けるように指定
            data01.map((entry, index) =>
              <Cell fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Pie 
          data={data02} 
          dataKey="value" 
          cx={200} cy={200} /* 中心の位置 */
          innerRadius={70} outerRadius={90} /* 内径と外径サイズ */ 
          startAngle={90} endAngle={450}  /* topを頂点にしたい場合は、90,450を指定する */
          fill="#82ca9d" 
          label={true}   /* bool。trueで値をラベル表示する。 */
          labelLine={false}
          legendType={'line'} // legend上のアイコン形状
          activeIndex={0} // 
          activeShape={null}  // アクティブなセクターの形状
          isAnimationActive={true}
          animationBegin={800}
          animationDuration={1000}
          animationEasing={'linear'}  // 違いがわからない
        >
        </Pie>
        <Tooltip content={({ active, payload, label }) => {
          if (active) {
            return (
              <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className="desc">Anything you want can be displayed here.</p>
              </div>
            );
          }
          return null;
        }} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    );
  }
}