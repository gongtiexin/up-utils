/**
 * 计算echarts的option
 * option: 图表配置
 * data: 数据源
 * x: x坐标的指标
 * y: y坐标的指标
 * value:　展示的值
 * seriesTemplete:　series模板
 * */
import lodashGroupBy from 'lodash/groupBy';
import lodashUniq from 'lodash/uniq';

const defultOption = {
  legend: {
    data: [],
  },
  xAxis: {},
  series: [],
};

const defultSeriesTemplete = { name: null, data: null };

export default function computedEchartsOption(option = defultOption, data, x, y, value, seriesTemplete = defultSeriesTemplete) {
  const result = option;
  const xAxis = [];
  const legend = [];
  const series = [];
  const lodashGroup = lodashGroupBy(data, y);
  Object.keys(lodashGroup).forEach((one) => {
    const seriesData = [];
    lodashGroup[one].forEach((item) => {
      seriesData.push(item[value]);
      xAxis.push(item[x]);
    });
    legend.push(one);
    Object.assign(seriesTemplete, { name: one, data: seriesData });
    series.push(seriesTemplete);
  });
  if (option.legend) {
    result.legend.data = lodashUniq(legend);
  }
  result.xAxis.data = lodashUniq(xAxis);
  result.series = series;
  return result;
}
