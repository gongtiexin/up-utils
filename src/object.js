/**
 * 根据key去取obj里面的value
 * 例如: this.delve({ a: { b: { c: 1 } } }, 'a.b.c') 输出 1
 * */
const delve = (obj, key) =>
  key
    .split('.')
    .map(p => {
      obj = obj && obj[p];
      return obj;
    })
    .pop();

/**
 * 清除对象中值为空的属性包括("",null,undefined)
 * */
const filterNull = obj => {
  const newPar = {};
  Object.keys(obj).forEach(key => {
    if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      newPar[key] = obj[key];
    }
  });
  return newPar;
};

export { delve, filterNull };
