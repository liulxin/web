---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 运算符和比较规则

## 运算符

- 算术运算符  
  `+ - * / % ++ --`
- 赋值运算符  
  `= += -= *= /= %=`
- 字符串运算符  
  `+ +=`
- 比较运算符  
  `== === != !== > < >= <=`
- 三元运算符  
  `?`
- 类型运算符  
  `typeof instanceof`
- 位运算符  
  `& | ^ ~ << >> >>>`

## 比较规则

不同数据类型间进行比较时就涉及到了 js 的比较方式：严格比较运算符和转换类型比较运算符  
严格比较运算符（===），仅当两个操作数的类型相同且值相等为 true，而对于被广泛使用的比较运算符（==）来说，会在进行比较之前，将两个操作数转换成相同的类型。

当比较运算涉及到类型转换时，会按以下规则对字符串，数字，布尔，或对象类型进行操作：

- 数字和字符串，字符串会转换为数字值。
- 如果其中有布尔类型，那么布尔操作数 true 会转为 1，如果为 false 会转为 0
- 如果一个对象和数字或字符串比较时，js 会尝试返回对象的默认值。操作符会尝试 valueOf 和 toString 将对象转为原始值。

经典面试题中有就有涉及到对象的隐式转换：

```
什么情况下 a==1&&a==2&&a==3 成立？
```

这里就可以通过对象的转换达到目的：

```
let a = {
  i: 1,
  valueOf: () => {
    return a.i ++
  }
}

// 同样：
let a = {
  i: 1,
  toString: () => {
    return a.i ++
  }
}
```

## 参考

[https://www.w3school.com.cn/js/js_operators.asp](https://www.w3school.com.cn/js/js_operators.asp)  
[https://www.runoob.com/jsref/jsref-operators.html](https://www.runoob.com/jsref/jsref-operators.html)  
[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)  
[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
