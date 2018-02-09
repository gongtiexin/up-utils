import lodashGroupBy from "lodash/groupBy";

const defultOption = {
  dataset: {
    source: [],
  },
  series: [],
};

/**
 * 计算echarts渲染所需option
 * @param  option: 基础配置项
 * @param  data: 数据源
 * @param  row: 横坐标上的属性(对于data里面的key)
 * @param  column: 纵坐标上的属性(对于data里面的key)
 * @param  value: 图上的属性(对于data里面的key)
 * @param  seriesTemplates: 每个series的配置
 * @return Object
 * */
const computedEchartsOption = ({
  option,
  data,
  row = "x",
  column = "y",
  value = "value",
  seriesTemplates,
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
              Object.assign({}, seriesTemplates[values[0].seriesType])
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

export default computedEchartsOption;
