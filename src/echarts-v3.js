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
    data: [],
  },
  series: [],
};

/* 补零函数 */
const fillIn = ({ data, x, y, value, seriesType, isFillIn }) => {
  if (isFillIn && data && data.length > 0) {
    const copy = [];
    const xList = Object.keys(lodashGroupBy(data, x));
    const yList = Object.keys(lodashGroupBy(data, y));
    xList.forEach((xItem, idx) => {
      yList.forEach(yItem => {
        const one = data.find(item => xItem === item[x] && yItem === item[y]);
        if (!one) {
          copy.push({
            x: xItem,
            y: yItem,
            [value]: 0,
            seriesType,
            sort: idx,
          });
        } else {
          copy.push({ ...one, sort: idx });
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
  seriesTemplates,
  seriesSpecialConfig,
  isFillIn = false,
}) => {
  /* 如果只有饼图不能有x轴 */
  const isOnlyPie = Object.values(seriesTemplates)[0].type === "pie";
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
  Object.entries(seriesTemplates).forEach(([key, seriesTemplete]) => {
    const isPie = seriesTemplete.type === "pie";
    /* 补零 */
    const lodashGroupBySeriesTypeData = fillIn({
      data: lodashGroupBySeriesType[key],
      x,
      y,
      value,
      seriesType: seriesTemplete.type,
      isFillIn,
    });
    const lodashGroupByY = lodashGroupBy(lodashGroupBySeriesTypeData, y);
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
        Object.assign(
          {},
          seriesTemplete,
          {
            name: isPie ? seriesTemplete.name || "饼图" : one,
            data: seriesData,
          },
          seriesSpecialConfig ? seriesSpecialConfig[one] : undefined
        )
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
