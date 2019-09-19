## 执行上下文栈（Execution Context Stack）

执行上下文(EC)是 ECMA-262 标准中用于同可执行代码进行区分的一个抽象概念。其实可以理解为当前代码的执行环境。

可执行代码类型与执行上下文的抽象概念有时是完全等价的。而可执行代码类型又分为：

- 全局代码（环境）：JavaScript 代码运行起来会首先进入该环境，全局代码不包括任何 function 体内的代码
- 函数代码（环境）：当函数被调用执行时，会进入当前函数中执行代码
- eval

每次当 JavaScript 引擎遇到可执行代码的时候，就会进入一个执行上下文。一个 JavaScript 程序中，会产生多个执行上下文。那么 js 引擎如何处理呢？执行上下文在逻辑上组成一个上下文栈（Execution context stack，ECS）。栈底部永远都是全局上下文(global context)，而顶部就是当前的执行上下文。

当代码在执行过程中，遇到以上三类情况，都会生成一个执行上下文，放入栈中，而处于栈顶的上下文执行完毕之后，就会自动出栈。值得注意的一点是：每次函数的调用都会创建一个执行上下文压入栈中，无论是函数内部的函数、还是递归调用等。

### 示例

```
  function fun3() {
    console.log('fun3')
  }

  function fun2() {
    fun3()
  }

  function fun1() {
    fun2()
  }

  fun1()
```

这段代码的函数栈是如何运行的呢？假设 ECStack = []。

```
//fun1()
 ECStack.push(<fun1> functionContext);

 // fun1中调用了fun2，创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

下面是 chrome 控制台调用栈的信息（fun1 与 fun3 执行时，fun3 执行完毕的调用栈状态）  
fun1 执行：
![fun1执行](http://ww3.sinaimg.cn/large/006y8mN6ly1g757ywfiuvj30vg0eoq45.jpg)  
fun3 执行：
![fun3执行](http://ww3.sinaimg.cn/large/006y8mN6ly1g758exora7j30wo0dsgmo.jpg)  
fun3 执行完毕：
![fun3执行完毕](http://ww3.sinaimg.cn/large/006y8mN6ly1g758hbsmelj30wi0dedh0.jpg)

## 思考

```
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();// local scope

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();// local scope
```

两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？就是执行上下文栈不同

```
示例1:

ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();

示例2:

ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```
