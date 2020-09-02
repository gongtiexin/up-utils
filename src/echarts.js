import lodashGroupBy from 'lodash/groupBy';

const defultOption = {
    dataset: {
        source: []
    },
    series: []
};

/**
 * 计算echarts渲染所需option
 * @param option: 基础配置项
 * @param data: 数据源
 * @param row: 横坐标上的属性(对于data里面的key)
 * @param column: 纵坐标上的属性(对于data里面的key)
 * @param value: 图上的属性(对于data里面的key)
 * @param seriesType: 对应seriesTemplates的key
 * @param seriesTemplates: 每个series的配置
 * @param fillText: 补位数据形式
 * @return Object
 * */
const computedEchartsOption = ({
    option,
    data,
    row = 'x',
    column = 'y',
    value = 'value',
    seriesType = 'seriesType',
    seriesTemplates,
    fillText = 0
}) => {
    const newOption = { ...defultOption, ...option };

    if (data && data.length === 0) {
        return newOption;
    }

    const series = [];
    const lodashGroupByRow = lodashGroupBy(data, row);
    const lodashGroupByColumn = lodashGroupBy(data, column);

    /* init */
    const sources = new Array(Object.keys(lodashGroupByRow).length + 1).fill(
        new Array(Object.keys(lodashGroupByColumn).length + 1).fill(fillText)
    );

    /* dataset source first row */
    sources[0] = ['product', ...Object.keys(lodashGroupByColumn)];

    /* dataset source tail row */
    Object.keys(lodashGroupByRow).forEach((rowItem, rowIdx) => {
        sources[rowIdx + 1][0] = rowItem;
        Object.entries(lodashGroupByColumn).forEach(([columnItem, values], columnIdx) => {
            const one = data.find((item) => rowItem === item[row] && columnItem === item[column]);
            if (one) {
                sources[rowIdx + 1][columnIdx + 1] = one[value];
            }

            /* series */
            if (rowIdx === 0) {
                if (values && values.length > 0 && values[0][seriesType]) {
                    series.push({ ...seriesTemplates[values[0][seriesType]] });
                } else {
                    series.push({});
                }
            }
        });
    });

    return { ...newOption, series, dataset: { source: sources } };
};

export default computedEchartsOption;
