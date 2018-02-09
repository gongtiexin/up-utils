const utils = {
  /**
   * sortBy根据数值大小排序,从大到小
   * */
  by: name => (o, p) => {
    let a;
    let b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
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
    throw new Error("error");
  },

  /**
   * 评分
   * */
  rate: rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate),

  /**
   * 金钱格式化
   * */
  menoyFormat: menoy => menoy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

  /**
   * 全屏
   * */
  // 判断各种浏览器，找到正确的方法
  launchFullScreen: element => {
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
  fullScreen(element = "all") {
    if (element === "all") {
      this.launchFullScreen(document.documentElement);
    } else this.launchFullScreen(document.getElementById(element));
  },

  /**
   * 高亮关键词
   * */
  highlights: (str, keyword) =>
    str.replace(new RegExp(keyword, "gmi"), `<em>${keyword}</em>`),
};

export default utils;
