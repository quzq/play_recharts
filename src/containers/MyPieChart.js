import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,Legend, Tooltip, ResponsiveContainer
} from 'recharts';
import * as _ from 'lodash'

const data = [
  { code: '001', value: 58 },
  { code: '002', value: 40 },
  { code: '003', value: 36 },
  { code: '004', value: 15 },
  { code: '005', value: 12 },
  { code: '006', value: 5 },
];

const master = [
  { code: '003', name: '伊藤園', },
  { code: '004', name: 'ＵＣＣ上島珈琲', },
  { code: '001', name: 'サントリーホールディングス', },
  { code: '002', name: '日本コカ・コーラ', },
  { code: '005', name: '日本サンガリアベバレッジカンパニー', },
  { code: '006', name: 'キリンビバレッジ', },
]

const COLORS = [
  "#c867b5",
  "#7bb94a",
  "#8361cc",
  "#d3a242",
  "#688bcd",
  "#ce5d3f",
  "#4fb99e",
  "#c45071",
  "#558641",
  "#977a3d",
]

const getName = cd => _.get(_.find(master, i => i.code === cd), 'name')

const renderActiveShape = (props) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius -5 }
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active) return null
  return (
    <div >
      <p className="label">{getName(payload[0].name)}</p>
    </div>
  );
};


export default class Example extends PureComponent {
  state = {
    activeIndex: null,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const dataSource = _.orderBy(data, 'value', 'desc')
    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={dataSource}
            nameKey="code"
            dataKey="value"
            cx="50%" cy="50%" /* 中心の位置 */
            innerRadius="40%" outerRadius="80%" /* 内径と外径サイズ */
            startAngle={450} endAngle={90}  /* topを頂点にしたい場合は、90,450を指定する */
            label={true}   /* bool。trueで値をラベル表示する。 */
            labelLine={false}
            legendType={'square'} // legend上のアイコン形状
            activeIndex={this.state.activeIndex} // 
            activeShape={renderActiveShape}  // アクティブなセクターの形状
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={1000}
            animationEasing={'linear'}  // 違いがわからない
            onMouseEnter={this.onPieEnter}
          >
            { //各セクターの色分け
              _.orderBy(dataSource).map((i, index) =>
                <Cell fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend verticalAlign="bottom" formatter={(value, entry) => {
            return <span >{getName(entry.payload.code)}</span>;
          }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}