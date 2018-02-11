# up-utils ![up-utils 2.0.0](https://img.shields.io/badge/up--utils-2.0.0-brightgreen.svg)

> 公共方法库

## 安装

```
yarn global add prettier
# or npm
npm install up-utils
```

## 用法

```js
import {
  upString,
  upNumber,
  upObject,
  upStorage,
  utils,
  computedEchartsOption,
} from "query-string";
```

### computedEchartsOption

#### computedEchartsOption(*obj*)

* 计算echarts渲染所需option
* option: 基础配置项
* data: 数据源
* row: 横坐标上的属性(对于data里面的key)
* column: 纵坐标上的属性(对于data里面的key)
* value: 图上的属性(对于data里面的key)
* seriesType: 对应seriesTemplates的key
* seriesTemplates: 每个series的配置

```js
console.log(computedEchartsOption(obj);
//= > obj <- echarts option
```
### utils

#### rate(*int*)

* 评分

```js
console.log(utils.rate(3.5));
//= > "★★★★☆"
```

#### menoyFormat(*int*)

* 金钱格式化

```js
console.log(utils.menoyFormat(123456789.01));
//= > "123,456,789.01"
```

#### fullScreen(*element*)

* 全屏
* element: 元素id, 默认: "all"(document.documentElement)

#### highlights(*string*, *keyword*)

* 高亮关键词

```js
console.log(utils.highlights("highlights","high"));
//= > "<em>high</em>lights"
```

### upString

#### trim(*string*, *type*)

* 去除字符串空格
* type: 　1-所有空格(默认值)　 2-前后空格　 3-前空格 　4-后空格

```js
console.log(upString.trim(" trim "));
//= > 'trim'
```

#### changeCase(*string*, *type*)

* 大小写转换
* type:　 1:首字母大写　 2：首页母小写　 3：大小写转换　 4：全部大写 　5：全部小写

```js
console.log(upString.changeCase("changeCASE"));
//= > "CHANGEcase"
```

#### checkPwd(*string*)

* 检测密码强度

```js
console.log(upString.checkPwd("checkPwd"));
//= > 2
```

#### randomString(*int*)

* 随机n位字符串(默认32位)

```js
console.log(upString.randomString());
//= > "7R2XCzRKbRDnywF2WtPWnB4aGNXynDsX"
```

### upNumber

#### random(*min*, *max*)

* 随机数 范围(min - max)
* min: int(默认0) max: int(默认1)

```js
console.log(upNumber.random(1, 10));
//= > 7
```

#### numberToChinese(*number*)

* 将阿拉伯数字翻译成中文的大写数字

```js
console.log(upNumber.numberToChinese(1234567890.01));
//= > "一十二億三仟四百五十六萬七仟八百九十零点零一"
```

#### changeToChinese(*number*)

* 将数字转换为大写金额

```js
console.log(upNumber.changeToChinese(123456789.01));
//= > "壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元壹分"
```

#### toDecimal2(*number*)

* 取2位小数

```js
console.log(upNumber.toDecimal2(0.005));
//= > "0.01"
```

### upObject

#### delve(*obj*, *key*)

* 根据key去取obj里面的value

```js
console.log(upObject.delve({ a: { b: { c: 1 } } }, 'a.b.c'));
//= > 1
```

#### filterNull(*obj*)

* 清除对象中值为空的属性包括("",null,undefined)

```js
console.log(upObject.filterNull({ a: null, b: undefined, c: "", d: 1});
//= > { d: 1 }
```

### upStorage

#### getCookie(*string*)

* 根据cookie的key取出对应的value

```js
console.log(upStorage.getCookie("cookieName");
```

#### setCookie(*cookieName*, *value*, *expireHours*)

* 设置cookie
* cookieName: string value: string, expireHours: int

```js
console.log(upStorage.setCookie("cookieName");
```

#### setLocal(*key*, *val*)

* 设置localStorage

#### getLocal(*key*)

* 获取localStorage

#### removeLocal(*key*)

* 移除localStorage

#### clearLocal()

* 移除所有localStorage

#### setSessionl(*key*, *val*)

* 设置sessionStorage

#### removeSession(*key*)

* 移除sessionStorage

#### clearSession()

* 移除所有sessionStorage