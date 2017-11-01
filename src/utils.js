const utils = {

  /**
   * sortBy根据数值大小排序,从大到小
   * */
  by(name) {
    return (o, p) => {
      let a, b;
      if (typeof o === 'object' && typeof p === 'object' && o && p) {
        a = parseInt(o[name] * 1000, 10);
        b = parseInt(p[name] * 1000, 10);
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a < b ? 1 : -1;
        }
        return typeof a < typeof b ? 1 : -1;
      }
      throw new Error('error');
    };
  },

  /**
   * 取2位小数
   * */
  toDecimal2(x) {
    let f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(x * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  },

  /**
   * 检测对象是否是空对象(不包含任何可读属性)。
   * 方法只既检测对象本身的属性，不检测从原型继承的属性。
   * */
  isOwnEmpty(obj) {
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    });
    return true;
  },

  /**
   * 清除对象中值为空的属性包括("",null,undefined)
   * */
  filterNull(obj) {
    const newPar = {};
    Object.keys(obj).forEach((key) => {
      if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
        newPar[key] = obj[key];
      }
    });
    return newPar;
  },

  /**
   * 评分
   * */
  rate(rate) {
    return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
  },

  /**
   * 随机13位字符串
   * */
  randomString13() {
    return Math.random().toString(16).substring(2); // 13位
  },

  /**
   * 随机11位字符串
   * */
  randomString11() {
    return Math.random().toString(36).substring(2); // 11位
  },

  /**
   * 金钱格式化
   * */
  menoyFormat(menoy) {
    return menoy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * 全屏
   * */
  // 判断各种浏览器，找到正确的方法
  launchFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  },
  fullScreen(element = 'all') {
    if (element === 'all') {
      this.launchFullScreen(document.documentElement);
    } else this.launchFullScreen(document.getElementById(element));
  },
};


export default utils;