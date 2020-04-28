import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,Legend, Tooltip, ResponsiveContainer
} from 'recharts';
import {Typography} from "@material-ui/core"
import * as _ from 'lodash'

const data = [
  { code: '001', value: 58, name: 'ああああああ', color: 'red' },
  { code: '002', value: 40, name: 'いいいいいいいいいいいいいいいい', color: 'blue' },
  { code: '003', value: 36, name: 'ううううう', color: 'green' },
  { code: '004', value: 15, name: 'ええええええええええええええ', color: 'orange' },
  { code: '005', value: 12, name: 'おおおおおおおおおお', color: 'brown' },
  { code: '006', value:  5, name: 'んんんんんんんんんんんんんんん', color: 'grey' },
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
        innerRadius={innerRadius -35 }
        outerRadius={outerRadius + 0}
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
    <div style={{background:'#ffffbb'}}>
      <p className="label">{getName(payload[0].name)}</p>
    </div>
  );
};
const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div style={{display:'block'}}>
  {      
    payload.map((entry, index) => (
    //         <span style={{display:'inline', whiteSpace:'nowrap',}} >
    // <Typography variant="caption" style={{display:'inline', backgroundColor:entry.color, border:'solid 2px #fff', width:'16px'}} >{'　'}</Typography>
    //         <Typography variant="caption" color="black" style={{display:'inline'}} >*** {entry.value}</Typography>

    //         </span>
		<div style={{display:'inline', whiteSpace: 'nowrap',fontSize:'small',}}>
      <svg width="14" height="14" viewBox="0 0 32 32" style={{display: 'inline-block', verticalAlign: 'middle', border: 'solid 2px #fff',}}>
        <path fill={entry.color} cx="16" cy="16" type="square" transform="translate(16, 16)" d="M-16,-16h32v32h-32Z"></path>
      </svg>{entry.value}
    </div>

          // <li key={`item-${index}`}>{entry.value}</li>
        ))
        // payload.map((entry, index) => (
        //   <li key={`item-${index}`}><Typography variant="body2"> {entry.value}</Typography> </li>
        // ))
    }
    </div>
  );
}

const renderLegend__ = (props) => {
  const { payload } = props;
  const styles = () => ({
    progressCell: {
      width: 45,
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: "center"
    }
  })

  return (
        // payload.map((entry, index) => (
        //   <li key={`item-${index}`}>{JSON.stringify(entry)}</li>
        // ))
        payload.map((entry, index) => (
            <div style={{whiteSpace:'nowrap'}} >
    <Typography variant="caption" style={{backgroundColor:entry.color, border:'solid 2px #fff',width:'20px'}} >{' '}</Typography>
            <Typography variant="caption" color="black" style={{}} > {entry.value}</Typography>

            </div>
        ))
  );
}
const renderLegend_ = (props) => {
  const { payload } = props;

  return (
    <ul>
      {
        payload.map((entry, index) => (
          <li key={`item-${index}`}>{entry.value}</li>
        ))
        // payload.map((entry, index) => (
        //   <li key={`item-${index}`}><Typography variant="body2"> {entry.value}</Typography> </li>
        // ))
      }
    </ul>
  );
}
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

    const customLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, percent }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text x={x} y={y} fill="white" textAnchor={'middle'} verticalAlign={'middle'} style={{ fontSize: ((outerRadius - innerRadius) / 5).toFixed(0) }} >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }

    return (
      <ResponsiveContainer style={{width:300,height:300}}>
        <PieChart>
          <Pie
            data={dataSource}
            nameKey="code"
            dataKey="value"
            cx="50%" cy="50%" /* 中心の位置 */
            innerRadius="40%" outerRadius="90%" /* 内径と外径サイズ */
            startAngle={450} endAngle={90}  /* topを頂点にしたい場合は、90,450を指定する */
            label={customLabel}   
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
          <Tooltip content={({ active, payload, label }) => {
            if (!active) return null
            return (
              <div style={{ background: '#ffffbb' }}>
                <p className="label">{getName(payload[0].name)}</p>
              </div>
            );
          }} />
            <Legend 
              layout={null} 
              align={'left'} 
              verticalAlign={'bottom'} 
              content={renderLegend}
            />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}