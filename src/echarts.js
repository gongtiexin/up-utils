/**
 * 计算echarts的option
 * option: 图表配置
 * data: 数据源
 * x: x坐标的指标
 * y: y坐标的指标
 * value: 展示的值
 * seriesTemplete: series模板
 * */
import lodashGroupBy from "lodash/groupBy";
import lodashUniq from "lodash/uniq";
import lodashDefaultsDeep from "lodash/defaultsDeep";

const defultOption = {
  legend: {
    data: []
  },
  xAxis: {},
  series: []
};

export default function computedEchartsOption(
  option,
  data,
  x,
  y,
  value,
  seriesTemplete
) {
  const result = Object.assign({}, defultOption, option);
  const xAxis = [];
  const legend = [];
  const series = [];
  const lodashGroup = lodashGroupBy(data, y);
  Object.keys(lodashGroup).forEach(one => {
    const seriesData = [];
    lodashGroup[one].forEach(item => {
      seriesData.push(item[value]);
      xAxis.push(item[x]);
    });
    legend.push(one);
    series.push(
      Object.assign({}, seriesTemplete, { name: one, data: seriesData })
    );
  });
  return lodashDefaultsDeep(
    {},
    result,
    { legend: { data: lodashUniq(legend) } },
    { xAxis: { data: lodashUniq(xAxis) } },
    { series }
  );
}

export function computedEchartsOption$(
  option,
  data,
  x,
  y,
  value,
  seriesTempletes
) {
  const result = Object.assign({}, defultOption, option);
  const xAxis = [];
  const legend = [];
  const series = [];
  const lodashGroupBySeriesType = lodashGroupBy(data, "seriesType");
  Object.entries(seriesTempletes).forEach(([key, seriesTemplete]) => {
    const lodashGroup = lodashGroupBy(lodashGroupBySeriesType[key], y);
    Object.keys(lodashGroup).forEach(one => {
      const seriesData = [];
      lodashGroup[one].forEach(item => {
        seriesData.push(item[value]);
        xAxis.push(item[x]);
      });
      legend.push(one);
      series.push(
        Object.assign({}, seriesTemplete, { name: one, data: seriesData })
      );
    });
  });
  return lodashDefaultsDeep(
    {},
    result,
    { legend: { data: lodashUniq(legend) } },
    { xAxis: { data: lodashUniq(xAxis) } },
    { series }
  );
}
