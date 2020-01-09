---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 作用域链

由之前的词法作用域了解到 JavaScript 采用的是词法作用域。

- 词法作用域
  - 就是定义在词法阶段的作用域。也就是由你在写代码时变量和块作用域的位置，即你的源代码结构确定的。

在《你不知道的 javascript-上》里有这样举例：

```
var a = 2;
```

这段代码的执行过程就是：

1. 分解成词法单元
2. 解析成树结构
3. 可执行代码生成

而在第三步过程中编译器需要进行如下处理：

1. 遇到 var a, 编译器会询问作用域是否已经有一个该名称的变量在于同一个作用域的集合中。如果是，编译器会忽略该声明，继续进行编译。否则会要求作用域在当前作用域集合中声明一个新的变量，并命名为 a。
2. 生成运行时所需代码。用来处理 a=2 这个赋值操作。运行时会询问作用域，在当前作用域集合中是否存在一个叫作 a 的变量。如果是，引擎就会使用这个变量。不是，引擎就会继续查找该变量。（向父级作用域一层层查找，这就是作用域链的概念）

## 作用域 & 作用域链

- 作用域
  - 负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，来确定当前执行的代码对这些标识符的访问权限。简单来说就是用来确定变量的访问权限的一套规则
  - es6 以后作用域有：全局作用域、函数作用域和块级作用域
  - 在词法阶段已经定义好
- 作用域链
  - 是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问
  - 执行上下文创建阶段会确认作用域链

## [[scope]]

```
var x = 10;
function foo() {
  var y = 20;
  alert(x + y);
}
foo(); // 30
```

而在 foo 的 AO 中，其实并没有`x`。那么函数在查找变量的时候，如何能查找到更上层的变量对象呢？其实是通过`[[scope]]`属性，注意它是函数的属性。

`[[scope]]`属性保存了所有上层变量对象

> 注意：`[[scope]]`在函数创建时被存储－－静态（不变的），直至函数销毁。即：函数可以永不调用，但`[[scope]]`属性已经写入，并存储在函数对象中

1. 函数定义时

foo 的`[[scope]]`属性为：

```
foo.[[scope]] = {
  globalContext.VO //window
}
```

2. 函数调用时

此时会创建执行上下文，其中的作用域链`[[scope chain]]` 就是将当前函数的`[[scope]]`按顺序复制到`[[scope chain]]`，最后把活动对象推入到`[[scope chain]]`的顶部。这样执行上下文的`[[scope chain]]`就保证了执行上下文有权访问的所有变量和对象的有序访问。

```
EC(foo) = {
  VO: {
    y: undefined
  },
  [[scope chain]]: [
    VO(foo),
    globalContext.VO
  ]
}
```

## 举例

```
  var a = 1
  function f1() {
    var b = 2;
    function f2() {
      var c = 3;
      console.log(a + b + c)
    }
    return f2
  }

  f1()()
```

上方代码的执行栈，变量对象和作用域链创建过程：

1. f1 函数创建

```
f1.[[scope]] = {
  globalContext.VO
}
```

2. f1 函数执行, 创建 f1 函数执行上下文， f1 函数上下文入调用栈, 内部 f2 创建

```
ECStack = [
  f1Context,
  globalContext
]

f1Context = {
  AO: {
    b: undefined,
    f2: <reference f2>
  },
  [[scope chain]]: [
    AO(f1),
    globalContext.VO
  ]
}

f2.[[scope]] = {
  AO(f1),
  globalContext.VO
}

```

3. f1 函数执行上下文执行过程开始， b 赋值， 返回 f2， f1 出栈

```
f1Context = {
  VO: {
    b: 2,
    f2: <reference f2>
  },
  [[scope chain]]: [
    VO(f1),
    globalContext.VO
  ]
}

f2.[[scope]] = {
  VO(f1),
  globalContext.VO
}

//执行后出栈
ECStack = [
  globalContext
]
```

4. f2 函数执行, 创建 f2 函数执行上下文， f2 函数上下文入调用栈

```
ECStack = [
  f2Context,
  globalContext
]

f2Context = {
  AO: {
    c: undefined
  },
  [[scope chain]]: [
    AO(f2),
    AO(f1),
    globalContext.VO
  ]
}
```

5. f1 函数执行上下文执行过程开始， c 赋值， 打印 6 , 出栈

```
f2Context = {
  VO: {
    c: 3
  },
  [[scope chain]]: [
    VO(f2),
    VO(f1),
    globalContext.VO
  ]
}

//执行后出栈
ECStack = [
  globalContext
]
```
