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
  series: []
};

const computedEchartsOption = (option, data, x, y, value, seriesTempletes) => {
  const isOnlyPie = Object.values(seriesTempletes)[0].type === "pie";
  const result = Object.assign(
    {},
    defultOption,
    isOnlyPie ? undefined : { xAxis: {} },
    option
  );
  const xAxis = [];
  const legend = [];
  const series = [];
  const lodashGroupBySeriesType = lodashGroupBy(data, "seriesType");
  Object.entries(seriesTempletes).forEach(([key, seriesTemplete]) => {
    const isPie = seriesTemplete.type === "pie";
    const lodashGroup = lodashGroupBy(lodashGroupBySeriesType[key], y);
    Object.keys(lodashGroup).forEach(one => {
      const seriesData = [];
      lodashGroup[one].forEach(item => {
        if (isPie) {
          legend.push(item[x]);
          seriesData.push({ value: item[value], name: item[x] });
        } else {
          legend.push(one);
          seriesData.push(item[value]);
        }
        xAxis.push(item[x]);
      });
      series.push(
        Object.assign({}, seriesTemplete, {
          name: isPie ? seriesTemplete.name || "饼图" : one,
          data: seriesData
        })
      );
    });
  });
  return lodashDefaultsDeep(
    {},
    result,
    { legend: { data: lodashUniq(legend) } },
    isOnlyPie ? undefined : { xAxis: { data: lodashUniq(xAxis) } },
    { series }
  );
};

export default computedEchartsOption;
