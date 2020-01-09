---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 函数的定义

函数是对象。函数名实际是指向函数对象的指针。

1. 函数声明

```
function add() {}
```

2. 函数表达式

```
let add = function() {}
```

3. Function 构造函数  
   Function 构造函数可以接收任意数量的参数，最后一个参数始终都被看成是函数体，前边的参数则是新函数的参数。

```
let add = new Function( 'a', 'b', 'return a + b')
```

这种做法会导致解析两次代码，第一次是解析常规 ECMAScript 代码，第二次是解析传入的字符串，从而影响性能。

## 对象的定义

创建 Object 实例有三种方式：

1. new 操作符跟 Object 构造函数

```
let person = new Object()
person.name = 'ku'
```

2. 对象字面量

```
let person = {
  name: 'ku'
}
```

3. Object.create
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
```
let obj = Object.create({
  name: 'ku'
})
let obj2 = Object.create(null) //
```
![](http://ww4.sinaimg.cn/large/006y8mN6gy1g6oz1ln6n2j306x07adfp.jpg)

## 参考资料
《javascript高级程序设计》  
[MDN Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)