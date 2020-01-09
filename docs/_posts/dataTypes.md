---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 8 种数据类型

- 7 种原始类型
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol
    - es6
  - BigInt
    - es10
- 引用类型
  - Object

### Boolean

布尔值只有两个值：true 或 false

```
var x = true;
var y = false;
```

### Null

Null 类型只有一个值：null。表示没有对象，把 null 作为尚未创建的对象更易理解。可以用来清空变量。

```
let n = null
console.log(n) //null
```

### Undefined

一个没有被赋值的变量会有个默认值 undefined。

```
let u; // undefined
function add(a, b) {
  console.log(a, b)
}
add(); // undefined undefined
```

### Number

JavaScript 只有一种数值类型: 基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(263 -1) 到 263 -1）。可以表示整数, 浮点数, +Infinity, -Infinity, NaN。可以使用 Number 对象的 MIN_VALUE 和 MAX_VALUE 属性表示最小最大值。

```
let num = 6;
let fnm = 5.6;
let inf = +Infinity;
let nan = isNaN('5');
let nan2 = isNaN('this is nan');
let nan3 = isNaN(true);

console.log(inf) //Infinity
console.log(nan) //false 会转换为数字 5
console.log(nan2) //true
console.log(nan3) //false 会转换为数字 1
```

### String

```
JavaScript的字符串类型用于表示文本数据。
let str = "abc";
let str2 = "这是str";
```

### Symbol

ES6 新特性。符号类型是唯一的并且是不可修改的。能作为对象属性的标识符。

```
const symbol1 = Symbol()
const symbol2 = Symbol(42)
const symbol3 = Symbol('foo')
const syb = {[Symbol('2')] : 2};
console.log(syb); // { [Symbol(2)]: 2 }
console.log(Symbol('foo') === Symbol('foo')) // false
```

### BigInt

ES10 新特性。可以用任意精度表示整数。使用 BigInt，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。BigInt 是通过在整数末尾附加 n 或调用构造函数来创建的。

```
const theBiggestInt = 9007199254740991n
console.log(theBiggestInt) // 9007199254740991n
const alsoHuge = BigInt(9007199254740991)
console.log(alsoHuge) //9007199254740991n
const hugeButString = BigInt('9007199254740991')
console.log(hugeButString) //9007199254740991n

const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER)
console.log(previousMaxSafe) // 9007199254740991n
const maxPlusOne = previousMaxSafe + 1n
console.log(maxPlusOne) // 9007199254740992n
```

可以对 BigInt 使用运算符+、\*、-、\*\*和%。BigInt 转换为 Boolean 时，它的行为类似于一个数字：if、||、&&、Boolean 和!。BigInt 不能与数字互换操作。

### Object

Object 类型其实又具体包括了： Array Date function 等。

## 原始数据类型与引用数据类型有什么区别呢？

1. 基本类型变量存的是值(存储在栈内存)，复杂类型的变量存的是内存地址(存储在堆内存)。
2. 基本类型在赋值的时候拷贝值，复杂类型在赋值的时候只拷贝地址，不拷贝值。

```
let _a = '123'
let _b = _a //复制了值
_b = '3'
let _c = { a: 1 }
let _d = _c //复制了地址引用
_d.a = 2
console.log(_a) // 123
console.log(_c) // { a: 2 }
```

## 类型的判断？

几种常用的方法：

1. typeof
2. instanceof
3. Object.prototype.toString

### typeof
```
console.log(typeof 1) // number
console.log(typeof 'str') // string
console.log(typeof undefined) // undefined
console.log(typeof true) // boolean
console.log(typeof Number(1)) // number
console.log(typeof String('str')) // string
console.log(typeof Boolean('str')) // boolean
console.log(typeof BigInt(2)) // bigint
console.log(typeof Symbol()) // symbol

console.log(typeof null) // object
console.log(typeof (() => 1)) // function
console.log(typeof {}) // object
console.log(typeof []) // object
console.log(typeof new Date()) // object
```
可以发现原始类型中除了`null会打印object`,其他原始类型都可以用`typeof`正常判断。对于引用数据类型如果想具体判断的话就需要instanceof了。

### instanceof
a instanceof B 判断的是：a 是否为 B 的实例，即 a 的原型链上是否存在 B 构造函数。
```
function Animal (name) {
  this.name = name
}

const cat = new Animal('cat');
console.log(cat instanceof Animal) // true
```
```
console.log((() => 1) instanceof Function) // true
console.log({} instanceof Object) // true
console.log([] instanceof Array) // true
console.log(new Date() instanceof Date) // true

console.log(null instanceof Object) // false
```
经过代码测试发现，依然不能判断null的数据类型，因为本质上Null和Object不是一个数据类型，null值并不是以Object为原型创建出来的。其实可以通过`Object.prototype.toString`来进行判断。

### Object.prototype.toString
终极方法：
```
console.log(Object.prototype.toString.call(1)) 
// [object Number]
console.log(Object.prototype.toString.call('str')) 
// [object String]
console.log(Object.prototype.toString.call(undefined)) 
// [object Undefined]
console.log(Object.prototype.toString.call(true)) 
// [object Boolean]
console.log(Object.prototype.toString.call({})) 
// [object Object]
console.log(Object.prototype.toString.call([])) 
// [object Array]
console.log(Object.prototype.toString.call(function(){})) 
// [object Function]
console.log(Object.prototype.toString.call(null)) 
// [object Null]
console.log(Object.prototype.toString.call(Symbol(2))) 
// [object Symbol]
console.log(Object.prototype.toString.call(BigInt(2))) 
// [object BigInt]
```
实际应用中可以通过处理进而更方便的判断： 
```
console.log(Object.prototype.toString.call(BigInt(2)).slice(8,-1)) 
// BigInt
```

参考资料：  
[BigInt](https://java.ctolib.com/tc39-proposal-bigint.html)  
[MDN数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)