const upObject = {
  /**
   * 根据key去取obj里面的value
   * 例如: this.delve({ a: { b: { c: 1 } } }, 'a.b.c') 输出 1
   * */
  delve: (obj, key) => {
    key
      .split(".")
      .map(p => {
        obj = obj && obj[p];
        return obj;
      })
      .pop();
  },

  /**
   * 检测对象是否是空对象(不包含任何可读属性)。
   * 方法只既检测对象本身的属性，不检测从原型继承的属性。
   * */
  isOwnEmpty: obj => {
    Object.keys(obj).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    });
    return true;
  },

  /**
   * 清除对象中值为空的属性包括("",null,undefined)
   * */
  filterNull: obj => {
    const newPar = {};
    Object.keys(obj).forEach(key => {
      if (
        (obj[key] === 0 || obj[key]) &&
        obj[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== ""
      ) {
        newPar[key] = obj[key];
      }
    });
    return newPar;
  },
};

export default upObject;
