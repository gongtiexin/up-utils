/**
 * 评分
 * */
const rate = score => '★★★★★☆☆☆☆☆'.slice(5 - score, 10 - score);

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
const fullScreen = (element = 'all') => {
  if (element === 'all') {
    launchFullScreen(document.documentElement);
  } else launchFullScreen(document.getElementById(element));
};

/**
 * 高亮关键词
 * */
const highlights = (str, keyword) => str.replace(new RegExp(keyword, 'gmi'), `<em>${keyword}</em>`);

export { rate, fullScreen, highlights };
