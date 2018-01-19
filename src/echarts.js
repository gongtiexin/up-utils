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
import utils from "./utils";

const defultOption = {
  legend: {
    data: []
  },
  series: []
};

/* 补零函数 */
const fillIn = ({ data, x, y, seriesType }) => {
  if (data && data.length > 0) {
    const copy = [];
    const xList = Object.keys(lodashGroupBy(data, x));
    const yList = Object.keys(lodashGroupBy(data, y));
    xList.forEach((xItem, idx) => {
      yList.forEach(yItem => {
        const one = data.find(item => xItem === item[x] && yItem === item[y]);
        if (!one) {
          copy.push(
            Object.assign(seriesType, {
              x: xItem,
              y: yItem,
              value: 0,
              seriesType,
              sort: idx
            })
          );
        } else {
          copy.push(Object.assign({}, one, { sort: idx }));
        }
      });
    });
    return copy.sort(utils.by("sort")).reverse();
  }
  return data;
};

const computedEchartsOption = ({
  option,
  data,
  x,
  y,
  value,
  seriesTempletes,
  isFillIn = false
}) => {
  /* 如果只有饼图不能有x轴 */
  const isOnlyPie = Object.values(seriesTempletes)[0].type === "pie";
  const result = Object.assign(
    {},
    defultOption,
    isOnlyPie ? undefined : { xAxis: {} },
    option
  );
  /* 计算option */
  const xAxis = [];
  const legend = [];
  const series = [];
  const lodashGroupBySeriesType = lodashGroupBy(data, "seriesType");
  Object.entries(seriesTempletes).forEach(([key, seriesTemplete]) => {
    const isPie = seriesTemplete.type === "pie";
    /* 补零 */
    let group = [];
    if (isFillIn) {
      group = fillIn({
        data: lodashGroupBySeriesType[key],
        x,
        y,
        seriesType: seriesTemplete.type
      });
    } else {
      group = data;
    }
    const lodashGroupByY = lodashGroupBy(group, y);
    Object.keys(lodashGroupByY).forEach(one => {
      const seriesData = [];
      lodashGroupByY[one].forEach(item => {
        /* 饼图为一维图,统一用x计算 */
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
