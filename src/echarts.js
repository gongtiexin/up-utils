/**
 * 计算echarts的option
 * chartType: 图表类型
 * height: 图表高度
 * option: 图表配置
 * data: 数据源
 * */
import lodashGroupBy from "lodash/groupBy";
import lodashUniq from "lodash/uniq";

const option = {
  id: null,
  type: null,
  legend: {
    data: []
  },
  xAxis: {},
  yAxis: {},
  series: []
};

export default function computedEchartsOption(chartType, height, option = option, data, x, y, value) {

  switch (chartType) {
    /**
     * 计算柱状图数据
     * */
    case "BAR": {
      const barXAxis = [];
      const barLegend = [];
      const barSeries = [];
      const barGroup = lodashGroupBy(data, y);
      for (const one of Object.keys(barGroup)) {
        const group = [];
        barGroup[one].map(item => {
          group.push(item[value]);
          barXAxis.push(item[x]);
        });
        barLegend.push(one);
        barSeries.push({name: one, data: group, type: 'bar'})
      }
      if (option.legend) {
        option.legend.data = lodashUniq(barLegend);
      }
      option.xAxis.data = lodashUniq(barXAxis);
      option.series = barSeries;
      break;
    }

    /**
     * 计算折线图数据
     * */
    case "LINE": {
      const lineLegend = [];
      const lineXAxis = [];
      const lineSeries = [];
      const lineGroup = lodashGroupBy(data, y);
      for (const one of Object.keys(lineGroup)) {
        const group = [];
        lineGroup[one].map(item => {
          group.push(item[value]);
          lineXAxis.push(item[x]);
        });
        lineLegend.push(one);
        lineSeries.push({name: one, data: group, type: 'line', showSymbol: false, hoverAnimation: false,});
      }
      if (option.legend) {
        option.legend.data = lodashUniq(lineLegend);
      }
      option.xAxis.data = lodashUniq(lineXAxis);
      option.series = lineSeries;
      break;
    }


  }

  return {
    style: {
      width: '100%',
      textAlign: "center",
      height: height,
    },
    option: option
  }
};