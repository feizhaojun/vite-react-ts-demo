import * as echarts from 'echarts';
import { useLayoutEffect } from 'react';


function Echarts() {
  console.log('Echarts')

  useLayoutEffect(()=>{
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      grid: {
        show: false,
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
      ],
      tooltip: {},
      xAxis: {
        position: 'top',
        splitLine: {
          show: false,
        },
        data: ['2023-10-1','2023-10-2','2023-10-3','2023-10-4']
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          name: 'series - name',
          type: 'scatter',
          symbolSize: 10,
          itemStyle: {
            color: function(item) {
              return '#' + (Math.random().toFixed(6) * 1000000).toString();
            },
          },
          data: [
            ['2023-10-1', 1],
            ['2023-10-1', 2],
            ['2023-10-1', 3],
            ['2023-10-1', 4],
            ['2023-10-2', 1],
            ['2023-10-2', 2],
            ['2023-10-2', 3],
            ['2023-10-3', 4],
            ['2023-10-4', 1],
            ['2023-10-4', 2],
            ['2023-10-4', 3],
            ['2023-10-4', 4],
          ]
        }
      ],
      title: {
        text: 'title - text'
      },
    });
  }, [])

  return (
    <div>
      <div id="main" style={{width: '1000px', height: '300px'}}></div>
    </div>
  );
}

export default Echarts;