/**
 * 随机数范围
 * */
const random = (min = 0, max = 1) =>
  Math.floor(min + Math.random() * (max + 1 - min));

/**
 * 将阿拉伯数字翻译成中文的大写数字
 * */
const numberToChinese = num => {
  const AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  const BB = ["", "十", "百", "仟", "萬", "億", "点", ""];
  const a = `${num}`.replace(/(^0*)/g, "").split(".");
  let k = 0;
  let re = "";
  for (let i = a[0].length - 1; i >= 0; i -= 1) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp(`0{4}//d{${a[0].length - i - 1}}$`).test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        [BB[7]] = [BB[5]];
        k = 0;
        break;
      default:
        break;
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0)
      re = AA[0] + re;
    if (a[0].charAt(i) !== 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k += 1;
  }

  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6];
    for (let i = 0; i < a[1].length; i += 1) re += AA[a[1].charAt(i)];
  }
  if (re === "一十") re = "十";
  if (re.match(/^一/) && re.length === 3) re = re.replace("一", "");
  return re;
};

/**
 * 将数字转换为大写金额
 * */
const changeToChinese = Num => {
  // 转换为字符
  let stringNum = Num.toString();
  stringNum = stringNum.replace(/,/g, ""); // 替换tomoney()中的“,”
  stringNum = stringNum.replace(/ /g, ""); // 替换tomoney()中的空格
  stringNum = stringNum.replace(/￥/g, ""); // 替换掉可能出现的￥字符
  if (Number.isNaN(stringNum)) {
    // 验证输入的字符是否为数字
    // alert("请检查小写金额是否正确");
    return "";
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  const part = String(stringNum).split(".");
  let newchar = "";
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i -= 1) {
    if (part[0].length > 10) {
      return "";
      // 若数量超过拾亿单位，提示
    }
    let tmpnewchar = "";
    const perchar = part[0].charAt(i);
    switch (perchar) {
      case "0":
        tmpnewchar = `零${tmpnewchar}`;
        break;
      case "1":
        tmpnewchar = `壹${tmpnewchar}`;
        break;
      case "2":
        tmpnewchar = `贰${tmpnewchar}`;
        break;
      case "3":
        tmpnewchar = `叁${tmpnewchar}`;
        break;
      case "4":
        tmpnewchar = `肆${tmpnewchar}`;
        break;
      case "5":
        tmpnewchar = `伍${tmpnewchar}`;
        break;
      case "6":
        tmpnewchar = `陆${tmpnewchar}`;
        break;
      case "7":
        tmpnewchar = `柒${tmpnewchar}`;
        break;
      case "8":
        tmpnewchar = `捌${tmpnewchar}`;
        break;
      case "9":
        tmpnewchar = `玖${tmpnewchar}`;
        break;
      default:
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar += "元";
        break;
      case 1:
        if (perchar !== 0) tmpnewchar += "拾";
        break;
      case 2:
        if (perchar !== 0) tmpnewchar += "佰";
        break;
      case 3:
        if (perchar !== 0) tmpnewchar += "仟";
        break;
      case 4:
        tmpnewchar += "万";
        break;
      case 5:
        if (perchar !== 0) tmpnewchar += "拾";
        break;
      case 6:
        if (perchar !== 0) tmpnewchar += "佰";
        break;
      case 7:
        if (perchar !== 0) tmpnewchar += "仟";
        break;
      case 8:
        tmpnewchar += "亿";
        break;
      case 9:
        tmpnewchar += "拾";
        break;
      default:
        break;
    }
    newchar = tmpnewchar + newchar;
  }
  // 小数点之后进行转化
  if (stringNum.indexOf(".") !== -1) {
    if (part[1].length > 2) {
      // alert("小数点之后只能保留两位,系统将自动截断");
      part[1] = part[1].substr(0, 2);
    }
    for (let i = 0; i < part[1].length; i += 1) {
      let tmpnewchar = "";
      const perchar = part[1].charAt(i);
      switch (perchar) {
        case "0":
          tmpnewchar = `零${tmpnewchar}`;
          break;
        case "1":
          tmpnewchar = `壹${tmpnewchar}`;
          break;
        case "2":
          tmpnewchar = `贰${tmpnewchar}`;
          break;
        case "3":
          tmpnewchar = `叁${tmpnewchar}`;
          break;
        case "4":
          tmpnewchar = `肆${tmpnewchar}`;
          break;
        case "5":
          tmpnewchar = `伍${tmpnewchar}`;
          break;
        case "6":
          tmpnewchar = `陆${tmpnewchar}`;
          break;
        case "7":
          tmpnewchar = `柒${tmpnewchar}`;
          break;
        case "8":
          tmpnewchar = `捌${tmpnewchar}`;
          break;
        case "9":
          tmpnewchar = `玖${tmpnewchar}`;
          break;
        default:
          break;
      }
      if (i === 0) tmpnewchar += "角";
      if (i === 1) tmpnewchar += "分";
      newchar += tmpnewchar;
    }
  }
  // 替换所有无用汉字
  while (newchar.search("零零") !== -1) newchar = newchar.replace("零零", "零");
  newchar = newchar.replace("零亿", "亿");
  newchar = newchar.replace("亿万", "亿");
  newchar = newchar.replace("零万", "万");
  newchar = newchar.replace("零元", "元");
  newchar = newchar.replace("零角", "");
  newchar = newchar.replace("零分", "");
  if (newchar.charAt(newchar.length - 1) === "元") {
    newchar += "整";
  }
  // noinspection JSAnnotator
  return newchar;
};

/**
 * 取2位小数
 * */
const toDecimal2 = x => {
  let f = parseFloat(x);
  if (Number.isNaN(f)) {
    return false;
  }
  f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + 2) {
    s += "0";
  }
  return s;
};

export { random, numberToChinese, changeToChinese, toDecimal2 };
