import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as upObject from './object';
import * as upStorage from './storage';
import computedEchartsOption from './echarts';

/**
 * 全屏
 * */
// 判断各种浏览器，找到正确的方法
const launchFullScreen = (element) => {
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

export { upObject, upStorage, fullScreen, computedEchartsOption };
