import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,Legend, Tooltip, ResponsiveContainer
} from 'recharts';
import * as _ from 'lodash'

const data = [
  { code: '4901777', value: 800 },
  { code: '4902102', value: 700 },
  { code: '4901085', value: 500 },
  { code: '4901201', value: 100 },
  { code: '4902179', value: 80 },
  { code: '4909411', value: 50 },
];

const master = [
  { code: '4514603', name: 'アサヒ飲料', },
  { code: '456033875', name: '安曇野食品工房', },
  { code: '458045581', name: 'トーヨービバレッジ', },
  { code: '458240917', name: 'ポッカサッポロフード＆ビバレッジ', },
  { code: '458240918', name: 'ポッカサッポロフード＆ビバレッジ', },
  { code: '458985082', name: 'ポッカサッポロフード＆ビバレッジ', },
  { code: '4901085', name: '伊藤園', },
  { code: '4901111', name: '味の素ＡＧＦ', },
  { code: '4901201', name: 'ＵＣＣ上島珈琲', },
  { code: '4901201', name: 'ユーシーシー上島珈琲', },
  { code: '4901372', name: 'キーコーヒー', },
  { code: '4901777', name: 'サントリーホールディングス', },
  { code: '4902054', name: 'トモヱ乳業', },
  { code: '4902102', name: '日本コカ・コーラ', },
  { code: '4902179', name: '日本サンガリアベバレッジカンパニー', },
  { code: '4902201', name: 'ネスレ日本', },
  { code: '4902471', name: 'ポッカサッポロフード＆ビバレッジ', },
  { code: '4902705', name: '明治', },
  { code: '4902720', name: '森永乳業', },
  { code: '4902837', name: '守山乳業', },
  { code: '4902986', name: '南日本酪農協同', },
  { code: '4903110', name: '山崎製パン', },
  { code: '4904910', name: 'ダイドードリンコ', },
  { code: '4908011', name: '雪印メグミルク', },
  { code: '4908728', name: '四国乳業', },
  { code: '4909411', name: 'キリンビバレッジ', },
  { code: '4968442', name: 'ファミリーマート', },
  { code: '4970020', name: 'オハヨー乳業', },
  { code: '4971666', name: '江崎グリコ', },
  { code: '4972050', name: '小岩井乳業', },
  { code: '4989729', name: '珈琲実験室', },

]

const COLORS =["#c867b5",
"#7bb94a",
"#8361cc",
"#d3a242",
"#688bcd",
"#ce5d3f",
"#4fb99e",
"#c45071",
"#558641",
"#977a3d"]

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


export default class Example extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const getName = cd => _.get(_.find( master, i => i.code === cd), 'name')
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
          { //円グラフの色を各領域ごとに分けるように指定
            _.orderBy(dataSource).map((i, index) =>
              <Cell fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip/>
          <Legend verticalAlign="bottom" formatter={(value, entry) => {
            return <span >{getName(entry.payload.code)}</span>;
          }} />
      </PieChart>

      </ResponsiveContainer>
    );
  }
}