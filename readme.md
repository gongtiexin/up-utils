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
} from 'query-string';
```

### computedEchartsOption

#### computedEchartsOption(_obj_)

- 计算 echarts 渲染所需 option
- option: 基础配置项
- data: 数据源
- row: 横坐标上的属性(对于 data 里面的 key)
- column: 纵坐标上的属性(对于 data 里面的 key)
- value: 图上的属性(对于 data 里面的 key)
- seriesType: 对应 seriesTemplates 的 key
- seriesTemplates: 每个 series 的配置

```js
console.log(computedEchartsOption(obj);
//= > obj <- echarts option
```

### utils

#### rate(_int_)

- 评分

```js
console.log(utils.rate(3.5));
//= > "★★★★☆"
```

#### menoyFormat(_int_)

- 金钱格式化

```js
console.log(utils.menoyFormat(123456789.01));
//= > "123,456,789.01"
```

#### fullScreen(_element_)

- 全屏
- element: 元素 id, 默认: "all"(document.documentElement)

#### highlights(_string_, _keyword_)

- 高亮关键词

```js
console.log(utils.highlights('highlights', 'high'));
//= > "<em>high</em>lights"
```

### upString

#### trim(_string_, _type_)

- 去除字符串空格
- type: 　 1-所有空格(默认值)　 2-前后空格　 3-前空格 　 4-后空格

```js
console.log(upString.trim(' trim '));
//= > 'trim'
```

#### changeCase(_string_, _type_)

- 大小写转换
- type:　 1:首字母大写　 2：首页母小写　 3：大小写转换　 4：全部大写 　 5：全部小写

```js
console.log(upString.changeCase('changeCASE'));
//= > "CHANGEcase"
```

#### checkPwd(_string_)

- 检测密码强度

```js
console.log(upString.checkPwd('checkPwd'));
//= > 2
```

#### randomString(_int_)

- 随机 n 位字符串(默认 32 位)

```js
console.log(upString.randomString());
//= > "7R2XCzRKbRDnywF2WtPWnB4aGNXynDsX"
```

### upNumber

#### random(_min_, _max_)

- 随机数 范围(min - max)
- min: int(默认 0) max: int(默认 1)

```js
console.log(upNumber.random(1, 10));
//= > 7
```

#### numberToChinese(_number_)

- 将阿拉伯数字翻译成中文的大写数字

```js
console.log(upNumber.numberToChinese(1234567890.01));
//= > "一十二億三仟四百五十六萬七仟八百九十零点零一"
```

#### changeToChinese(_number_)

- 将数字转换为大写金额

```js
console.log(upNumber.changeToChinese(123456789.01));
//= > "壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元壹分"
```

#### toDecimal2(_number_)

- 取 2 位小数

```js
console.log(upNumber.toDecimal2(0.005));
//= > "0.01"
```

### upObject

#### delve(_obj_, _key_)

- 根据 key 去取 obj 里面的 value

```js
console.log(upObject.delve({ a: { b: { c: 1 } } }, 'a.b.c'));
//= > 1
```

#### filterNull(_obj_)

- 清除对象中值为空的属性包括("",null,undefined)

```js
console.log(upObject.filterNull({ a: null, b: undefined, c: "", d: 1});
//= > { d: 1 }
```

### upStorage

#### getCookie(_string_)

- 根据 cookie 的 key 取出对应的 value

```js
console.log(upStorage.getCookie("cookieName");
```

#### setCookie(_cookieName_, _value_, _expireHours_)

- 设置 cookie
- cookieName: string value: string, expireHours: int

```js
console.log(upStorage.setCookie("cookieName");
```

#### setLocal(_key_, _val_)

- 设置 localStorage

#### getLocal(_key_)

- 获取 localStorage

#### removeLocal(_key_)

- 移除 localStorage

#### clearLocal()

- 移除所有 localStorage

#### setSessionl(_key_, _val_)

- 设置 sessionStorage

#### removeSession(_key_)

- 移除 sessionStorage

#### clearSession()

- 移除所有 sessionStorage
