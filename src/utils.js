/**
 * sortBy根据数值大小排序,从大到小
 * */
const by = name => (o, p) => {
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
};

/**
 * 评分
 * */
const rate = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);

/**
 * 金钱格式化
 * */
const menoyFormat = menoy =>
  menoy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 全屏
 * */
// 判断各种浏览器，找到正确的方法
const launchFullScreen = element => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};
const fullScreen = (element = "all") => {
  if (element === "all") {
    launchFullScreen(document.documentElement);
  } else launchFullScreen(document.getElementById(element));
};

/**
 * 高亮关键词
 * */
const highlights = (str, keyword) =>
  str.replace(new RegExp(keyword, "gmi"), `<em>${keyword}</em>`);

export { by, rate, menoyFormat, fullScreen, highlights };
