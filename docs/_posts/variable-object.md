---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 变量对象（Variable Object）

在执行上下文栈中，有写到 js 引擎遇到可执行代码时就会创建一个新的执行上下文。而一个执行上下文都有三个重要的属性：

- 变量对象
- 作用域链
- this


变量对象存储了上下文中定义的变量和函数声明。
VO 包含了以下属性：

1. 函数所有形参（在函数执行上下文中）

   - 由名称和对应值组成；没有传递对应参数的话，那么由名称和 undefined 值组成

2. 所有函数声明(FunctionDeclaration)

   - 由名称和对应值（函数对象(function-object)）组成；如果变量对象已经存在相同名称的属性，则完全替换这个属性

3. 所有变量声明（var）

   - 由名称和对应值（undefined）组成；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

> 全局上下文变量对象和杉树上下文变量对象是稍有不同的。

## 全局上下文的变量对象

全局上下文的变量对象是`全局对象`。

```
VO(globalContext) === global;
```

> 全局对象(Global object) 是在进入任何执行上下文之前就已经创建了的对象；这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序退出那一刻。

在客户端 JavaScript 中，全局对象就是 Window 对象

全局对象初始创建阶段将 Math、String、Date、parseInt 作为自身属性，等属性初始化，同样也可以有额外创建的其它对象作为属性（其可以指向到全局对象自身。

```
global = {
  Math: <...>,
  String: <...>
  ...
  window: global //引用自身
};
```

## 函数上下文的变量对象

执行上下文代码会分两个阶段处理：

- 创建
- 执行

在任何时候，最多只有一个实际执行代码的执行上下文。 这就是所谓的运行执行上下文。此时这个执行上下文的变量对象会被激活，这时的变量对象被称为活动对象(activation object, AO)。后续都会以活动对象来表示变量对象。
举例：

```
  function test(a) {
    var b = 1;
    function c() {}
    var d = function d() {}
    b = 2
  }
  test(0)
```

1. 创建阶段

```
AO(test) = {
  a: 0,
  b: undefined,
  c: <reference c>,
  d: undefined
}
```

2. 执行阶段

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

```
AO(test) = {
  a: 0,
  b: 2,
  c: <reference to function c() {}>,
  d: <reference to FunctionExpression "d">
}
```

## 思考

```
(function(){
    a = 5;
    alert(a);           //==> 5
    alert(window.a);    //==> undefined
    var a = 10;
    alert(a);           //==> 10
})();
```

这里涉及到一个问题，不使用 var 关键字是否会进行变量提升？  
答案是不会：[非声明变量只有在执行赋值操作的时候才会被创建。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)

```
function foo() {
    console.log(a);
    a = 1;
}
foo(); // Uncaught ReferenceError: a is not defined
```

上述代码就可以验证不使用 var 关键字是不会进行变量提升的，不会被存放在 AO 中。  
其中有一句话：非声明变量总是全局的。这样不是和输出结果冲突了么？  
其实这句话是不严谨的。请注意`执行赋值操作`这个时机，而在变量查找的过程中，是一级一级往上级作用域查找的，在查找到的时候就会进行赋值，而并不是真的说全局作用域下进行赋值。

所以以上代码等同于：

```
(function(){
  var a = undefined;
  a = 5; // 已存在的a变量被赋值为5，不生成新的全局变量
  alert(a); // 5
  alert(window.a) // undefined
  a = 10; // 已存在的a变量被赋值为10
  alert(a) // 10
})()
```
