在执行上下文栈中，有写到 js 引擎遇到可执行代码时就会创建一个新的执行上下文。而一个执行上下文其实分为两个阶段：

- 创建阶段
  1. 创建变量对象
  2. 建立作用域链
  3. 确定 this 指向
- 执行阶段
  1. 变量赋值
  2. 函数引用
  3. 执行其他代码

## 变量对象（Variable Object）

VO 包含了以下属性：

1. 函数所有形参（如果在函数执行上下文中）

   - 由名称和对应值组成；没有传递对应参数的话，那么由名称和 undefined 值组成

2. 所有函数声明(FunctionDeclaration)

   - 由名称和对应值（函数对象(function-object)）组成；如果变量对象已经存在相同名称的属性，则完全替换这个属性

3. 所有变量声明（var）

   - 由名称和对应值（undefined）组成；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举例：

```
  var a = 1
  console.log(test); // f test(a) {}
  function test(a) {
    console.log(a) // 1
    var a = 2
    console.log(a) // 2
  }
  test(a)
  var test = 2;
  console.log(test); // 2
```

首先创建阶段：  
`如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性`，所以 test 为`<function reference>`

```
glEC = {
  VO: {
    test: <function reference>,
    a: undefined
  }
}
```

未进入执行阶段之前，变量对象中的属性都不能访问！但是进入执行阶段之后，变量对象转变为了活动对象，里面的属性都能被访问了，然后开始进行执行阶段的操作。只有处于函数调用栈栈顶的执行上下文中的变量对象，才会变成活动对象。  
执行阶段：  
a 赋值为 1， 打印 test, 执行 test()调用，test 函数上下文入调用栈，test 函数执行完毕 test 函数上下文出调用栈，test 赋值为 2，打印 test

```
glEC = {
  AO: {
    test: <function reference>,
    a: 1
  }
}
```

遇到 test()执行函数，就开始创建 test 函数执行上下文:

```
testEC = {
  VO: {
    arguments: {a: 1}
  }
}
```

test 执行阶段：  
打印 a, 赋值 a, 打印 a

```
testEC = {
  AO: {
    arguments: {a: 1}
  }
}
```

如果理解了变量对象的属性和生成规则上边的示例肯定就是完全理解了的。

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
