const upString = {
  /**
   * 去除空格
   * @param  str
   * @param  type:  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return String
   */
  trim: (str, type = 1) => {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },

  /**
   * @param  str
   * @param  type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
   * @return String
   */
  changeCase: (str, type = 3) => {
    switch (type) {
      case 1:
        return str.replace(
          /\b\w+\b/g,
          word =>
            word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      case 2:
        return str.replace(
          /\b\w+\b/g,
          word =>
            word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      case 3:
        return str
          .split("")
          .map(word => {
            if (/[a-z]/.test(word)) {
              return word.toUpperCase();
            }
            return word.toLowerCase();
          })
          .join("");
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  },

  /**
   * 检测密码强度
   */
  checkPwd: str => {
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
  },

  /**
   * 过滤html代码(把<>转换)
   */
  filterTag: str => {
    let newStr = str;
    newStr = newStr.replace(/&/gi, "&amp;");
    newStr = newStr.replace(/</gi, "&lt;");
    newStr = newStr.replace(/>/gi, "&gt;");
    newStr = newStr.replace(" ", "&nbsp;");
    return newStr;
  },

  /**
   * 随机n位字符串
   * */
  randomString: (len = 32) => {
    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    const maxPos = chars.length;
    let rs = "";
    for (let i = 0; i < len; i += 1) {
      rs += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return rs;
  },
};

export default upString;
