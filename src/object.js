/**
 * 清除对象中值为空的属性包括("",null,undefined)
 * */
export const filterNull = (obj) => {
    const newPar = {};
    Object.keys(obj).forEach((key) => {
        if (
            (obj[key] === 0 || obj[key]) &&
            obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
        ) {
            newPar[key] = obj[key];
        }
    });
    return newPar;
};
