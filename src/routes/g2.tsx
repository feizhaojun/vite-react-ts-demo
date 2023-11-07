import React from 'react';
import { Chart } from '@antv/g2';

// // 准备数据
// const data = [
//   { genre: 'Sports', sold: 275 },
//   { genre: 'Strategy', sold: 115 },
//   { genre: 'Action', sold: 120 },
//   { genre: 'Shooter', sold: 350 },
//   { genre: 'Other', sold: 150 },
// ];

// 初始化图表实例
const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart
.point()
.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
})
.transform({ type: 'stackY', y1: 'y' })
.encode('x', (d) => 2021 - d.birth)
.encode('y', (d) => (d.gender === 'M' ? 1 : -1))
.encode('color', 'gender')
.encode('shape', 'point')
.scale('x', { nice: true })
.axis('y', false)
.axis('x', { title: 'Age →' })
.legend('color', { title: 'Gender' })
.tooltip({ channel: 'x', name: 'age' })
.slider('x', {});

// chart.lineY().data([0]).style('stroke', 'black');
// chart
//   .interval() // 创建一个 Interval 标记
//   .data(data) // 绑定数据
//   .encode('x', 'genre') // 编码 x 通道
//   .encode('y', 'sold'); // 编码 y 通道

console.log(chart)
// 渲染可视化
chart.render();

function G2() {

  return (
    <div>
      <div id="container"></div>
    </div>
  );
}

export default G2;
