/**
 * 去除空格
 * @param  str
 * @param  type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return String
 */
const trim = (str, type = 1) => {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s*)/g, '');
    case 4:
      return str.replace(/(\s*$)/g, '');
    default:
      return str;
  }
};

/**
 * @param  str
 * @param  type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
 * @return String
 */
const changeCase = (str, type = 3) => {
  switch (type) {
    case 1:
      return str.replace(
        /\b\w+\b/g,
        word => word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase(),
      );
    case 2:
      return str.replace(
        /\b\w+\b/g,
        word => word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase(),
      );
    case 3:
      return str
        .split('')
        .map(word => {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          }
          return word.toLowerCase();
        })
        .join('');
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
};

/**
 * 检测密码强度
 */
const checkPwd = str => {
  let Lv = 0;
  if (str.length < 6) {
    return Lv;
  }
  if (/[0-9]/.test(str)) {
    Lv += 1;
  }
  if (/[a-z]/.test(str)) {
    Lv += 1;
  }
  if (/[A-Z]/.test(str)) {
    Lv += 1;
  }
  if (/[.|-|_]/.test(str)) {
    Lv += 1;
  }
  return Lv;
};

/**
 * 过滤html代码(把<>转换)
 */
const filterTag = str => {
  let newStr = str;
  newStr = newStr.replace(/&/gi, '&amp;');
  newStr = newStr.replace(/</gi, '&lt;');
  newStr = newStr.replace(/>/gi, '&gt;');
  newStr = newStr.replace(' ', '&nbsp;');
  return newStr;
};

/**
 * 随机n位字符串
 * */
const randomString = (len = 32) => {
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let rs = '';
  for (let i = 0; i < len; i += 1) {
    rs += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return rs;
};

/**
 * 将时间转换为特定格式
 * */
const formatDate = date => {
  // 获取传入时间时间戳
  const timeStr = +new Date(date);
  // 获取当前时间戳
  const now = +new Date();
  // 求与当前的时间差
  let se = now - timeStr;
  const DATE_LEVEL = {
    month: 2592000000,
    day: 86400000,
    hour: 3600000,
    minter: 60000,
  };
  let text = '';
  // 去年
  if (new Date(timeStr).getFullYear() !== new Date().getFullYear() && se > DATE_LEVEL.month) {
    text = `${new Date(timeStr).getFullYear()}年${new Date(timeStr).getMonth() + 1}月${new Date(
      timeStr,
    ).getDate()}日`;
  }
  // 一个月以上
  else if (se > DATE_LEVEL.month) {
    text = `${new Date(timeStr).getMonth() + 1}月${new Date(timeStr).getDate()}日`;
  }
  // 一天以上
  else if (se > DATE_LEVEL.day) {
    text = `${Math.floor(se / DATE_LEVEL.day)}天前`;
  }
  // 一个小时以上
  else if (se > DATE_LEVEL.hour) {
    text = `${Math.floor(se / DATE_LEVEL.hour)}小时前`;
  }
  // 一个小时以内
  else {
    // 如果小于1分钟，就显示1分钟前
    if (se < DATE_LEVEL.minter) {
      se = DATE_LEVEL.minter;
    }
    text = `${Math.floor(se / DATE_LEVEL.minter)}分钟前`;
  }
  return text;
};

export { trim, changeCase, checkPwd, filterTag, randomString, formatDate };
