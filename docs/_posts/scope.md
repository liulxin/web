---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 作用域

作用域是指可访问变量的集合。  
作用域负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。（《你不知道的 JavaScript》）  
作用域由两种主要工作模型：`词法作用域`和`动态作用域`。  
JavaScript 采用词法作用域，也称为静态作用域。

## 静态作用域

词法作用域是由你在写代码时将变量和函数（块）作用域写在哪里来决定的，即由源代码结构所决定的。  
`作用域查找会在找到第一个匹配的标识符时停止，而且查找始终从运行时所处的最内部作用域开始，逐级向外或者说向上进行，直到遇见第一个匹配的标识符为止。`

先看一个简单的例子：

```
function foo(a) {
  var b = a * 2
  function bar(c) {
    console.log(a, b, c)
  }
  bar(b * 3)
}

foo(2) // 2 4 12
```

在上边的例子中有 3 个逐级嵌套的作用域。作用域范围分别对应其对应的作用域块代码位置。

1. 全局作用域，其中只有 1 个标识符：foo
2. foo 函数作用域，其中有 3 个标识符：a, bar, b
3. bar 函数作用域，其中有 1 个标识符：c

还有一个例子：

```
var a = 2;

function f1() {
  console.log(a)
}

function f2() {
  var a = 3;

  f1()
}

f2() // 2
```

f1 的上层作用域是全局作用域，而不是 f2， 所以打印 2。

## 欺骗词法

词法作用域完全由写代码期间函数所声明的位置来定义，那么怎么可以在运行时修改词法作用域呢？

1. eval

```
function foo(str, a) {
  eval(str)
  console.log(a, b)
}
var b = 2
foo('var b = 3', 1) // 1 3
```

2. with

```
function foo(obj) {
  with(obj) {
    a = 2;
  }
}
var o1 = {
  a: 3
}
var o2 = {
  b: 3
}
foo(o1)
console.log(o1.a) // 2
foo(o2)
console.log(o2.a) // undefined
console.log(a) // 2
```

with 可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域，因此这个对象的属性也会被处理为定义在这个作用域中的词法标识符。

尽管 with 块可以将一个对象处理为词法作用域，但是这个块内部正常的 var 声明并不会限制在这个块作用域中，而是被添加到 with 所处的函数作用域中。

foo(o2) 在进行`a=2`的赋值操作时，o2, foo, 全局作用域都没有找到标识符 a，因此自动创建了一个全局变量。

## 思考题

```
var a = 1
function test() {
  var a = 2
  function test2() {
    return a
  }
  return test2()
}

test()
```

```
var a = 1
function test() {
  var a = 2
  function test2() {
    return a
  }
  return test2
}

test()()
```

两段代码都会打印：`2`
