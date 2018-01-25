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

const defultOption = {
  dataset: {
    source: []
  },
  series: []
};

const computedEchartsOptionForV4 = ({
  option,
  data,
  row = "x",
  column = "y",
  value = "value",
  seriesTempletes
}) => {
  const result = Object.assign({}, defultOption, option);

  if (data && data.length === 0) {
    return result;
  }

  const series = [];
  const lodashGroupByRow = lodashGroupBy(data, row);
  const lodashGroupByColumn = lodashGroupBy(data, column);

  /* init */
  const sources = Array(Object.keys(lodashGroupByRow).length + 1)
    .fill(null)
    .map(_ => Array(Object.keys(lodashGroupByColumn).length + 1).fill(0));

  /* dataset source first row */
  sources[0] = ["product", ...Object.keys(lodashGroupByColumn)];

  /* dataset source tail row */
  Object.keys(lodashGroupByRow).forEach((rowItem, rowIdx) => {
    sources[rowIdx + 1][0] = rowItem;
    Object.entries(lodashGroupByColumn).forEach(
      ([columnItem, values], columnIdx) => {
        const one = data.find(
          item => rowItem === item[row] && columnItem === item[column]
        );
        if (one) {
          sources[rowIdx + 1][columnIdx + 1] = one[value];
        }

        /* series */
        if (rowIdx === 0) {
          if (values && values.length > 0 && values[0].seriesType) {
            series.push(
              Object.assign({}, seriesTempletes[values[0].seriesType])
            );
          } else {
            series.push({});
          }
        }
      }
    );
  });

  return Object.assign(
    {},
    result,
    { series },
    { dataset: { source: sources } }
  );
};

export default computedEchartsOptionForV4;
