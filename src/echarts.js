/**
 * 计算echarts的option
 * chartType: 图表类型
 * height: 图表高度
 * option: 图表配置
 * data: 数据源
 * */
import lodashGroupBy from 'lodash/groupBy';
import lodashUniq from 'lodash/uniq';

const defultOption = {
  id: null,
  type: null,
  legend: {
    data: [],
  },
  xAxis: {},
  yAxis: {},
  series: [],
};

export default function computedEchartsOption(
  chartType,
  height,
  option = defultOption,
  data,
  x,
  y,
  value,
) {
  const result = option;
  switch (chartType) {
    /**
     * 计算柱状图数据
     * */
    case 'BAR': {
      const barXAxis = [];
      const barLegend = [];
      const barSeries = [];
      const barGroup = lodashGroupBy(data, y);
      Object.keys(barGroup).forEach((one) => {
        const group = [];
        barGroup[one].forEach((item) => {
          group.push(item[value]);
          barXAxis.push(item[x]);
        });
        barLegend.push(one);
        barSeries.push({ name: one, data: group, type: 'bar' });
      });
      if (option.legend) {
        result.legend.data = lodashUniq(barLegend);
      }
      result.xAxis.data = lodashUniq(barXAxis);
      result.series = barSeries;
      break;
    }

    /**
     * 计算折线图数据
     * */
    case 'LINE': {
      const lineLegend = [];
      const lineXAxis = [];
      const lineSeries = [];
      const lineGroup = lodashGroupBy(data, y);
      Object.keys(lineGroup).forEach((one) => {
        const group = [];
        lineGroup[one].forEach((item) => {
          group.push(item[value]);
          lineXAxis.push(item[x]);
        });
        lineLegend.push(one);
        lineSeries.push({
          name: one, data: group, type: 'line', showSymbol: false, hoverAnimation: false,
        });
      });
      if (option.legend) {
        result.legend.data = lodashUniq(lineLegend);
      }
      result.xAxis.data = lodashUniq(lineXAxis);
      result.series = lineSeries;
      break;
    }
    default:
      break;
  }

  return {
    style: {
      width: '100%',
      textAlign: 'center',
      height,
    },
    option,
  };
}
