---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# arguments的使用

>arguments 是一个对应于传递给函数的参数的类数组对象。

什么是类数组呢？
>类似于Array，但除了length属性和索引元素之外没有任何Array属性。但是类数组可以被转换为真正的数组。
```
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

const args = Array.from(arguments);
const args = [...arguments];
```
## arguments的使用
* length属性表示实参的确切个数
* 可以通过数组索引的方式获取单个参数的值
* 作为函数参数的别名（非严格模式）
```
function assert(bol, cons) {
  if(bol) {
    console.log(cons)
  }
}

function whatever(a,b,c) {
  // 值的准确性校验
  assert(a === 1, 'the value of a is 1')
  assert(b === 2, 'the value of b is 2')
  assert(c === 3, 'the value of c is 3')

  // 共传入 5 个参数
  assert(arguments.length === 5, 'we have passed in 5 parameters')
  // 验证传入的前3个参数与函数的3个形参匹配
  assert(arguments[0] === a, 'the first argument is assigned to a')
  assert(arguments[1] === b, 'the second argument is assigned to b')
  assert(arguments[2] === c, 'the third argument is assigned to c')
  // 验证额外的参数可以通过参数 arguments 获取
  assert(arguments[3] === 4, 'can access the fourth argument')
  assert(arguments[4] === 5, 'can access the fifth argument')

  // 别名
  assert(a === 1, 'the a is 1')
  assert(arguments[0] === 1, 'the first argument is 1')

  arguments[0] = 666
  assert(a === 666, 'now, the a is 666')
  assert(arguments[0] === 666, 'now, the first argument is 666')

  a = 999
  assert(a === 999, 'now, the a is 999')
  assert(arguments[0] === 999, 'now, the first argument is 999')
}

whatever(1,2,3,4,5)
```