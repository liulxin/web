执行上下文的调用创建阶段会决定 this 的指向。因此可以得出的一个结论：

> `this` 的指向是在调用函数执行时，根据执行上下文所动态确定的

具体规则有以下几条规律：

- 在函数体中，简单调用该函数时（非显式/隐式绑定下），严格模式下 this 绑定到 undefined，否则绑定到全局对象 window
- 一般由上下文对象调用，绑定在该对象上
- 一般由 call/apply/bind 方法显式调用，绑定到指定参数的对象上
- 一般构造函数 new 调用，绑定到新创建的对象上
- 箭头函数中，根据外层上下文绑定的 this 决定 this 指向

### 一、全局环境下的 this

函数在浏览器全局环境中被简单调用，非严格模式下 this 指向 window；在 use strict 指明严格模式的情况下就是 undefined。

```
function f1 () {
    console.log(this)
}
function f2 () {
    'use strict'
    console.log(this)
}
f1() // window
f2() // undefined
```

### 二、上下文对象调用中的 this

需要注意的是：`在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境。`

```
const foo = {
    bar: 10,
    fn: function() {
       console.log(this)
       console.log(this.bar)
    }
}
var fn1 = foo.fn
fn1()
```

这里 this 指向 window。fn 函数在 foo 对象中作为方法被引用，但是在赋值给 fn1 之后，fn1 的执行仍然是在 window 的全局环境中。因此输出 window 和 undefined

```
const foo = {
    bar: 10,
    fn: function() {
       console.log(this)
       console.log(this.bar)
    }
}
foo.fn()
```

这里 this 指向 foo 对象。因此输出`{bar: 10, fn: f} 10`

更复杂的调用关系：

```
const person = {
    name: 'Jack',
    brother: {
        name: 'Mike',
        fn: function() {
            return this.name
        }
    }
}
console.log(person.brother.fn())
```

在这种嵌套的关系中，this 指向最后调用它的对象，因此输出将会是：Mike。

更高阶的题目：

```
const o1 = {
    text: 'o1',
    fn: function() {
        return this.text
    }
}
const o2 = {
    text: 'o2',
    fn: function() {
        return o1.fn()
    }
}
const o3 = {
    text: 'o3',
    fn: function() {
        var fn = o1.fn
        return fn()
    }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
```

分析过程：

1. `o1.fn()` `this` 指向 o1, 打印 o1
2. `o2.fn()` 最终调用的还是 `o1.fn()`, 打印 o1
3. `o3.fn()` 最终调用`fn`, 是“裸奔”调用，因此这里的 this 指向 window，打印 undefined

### 三、bind/call/apply 改变 this 指向

```
const target = {}
fn.call(target, 'arg1', 'arg2')

//相当于
const target = {}
fn.apply(target, ['arg1', 'arg2'])

//相当于
const target = {}
fn.bind(target, 'arg1', 'arg2')()
```

例如：

```
var foo = {
    name: 'joker',
    showName: function() {
      console.log(this.name);
    }
}
var bar = {
    name: 'rose'
}
foo.showName.call(bar); // rose
```

### 四、构造函数与 this

```
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('Nick');
p1.getName(); // Nick
```

> new 操作符调用构造函数，具体做了什么呢？

- 创建一个新的对象
- 将构造函数的 this 指向这个新对象
- 为这个对象添加属性和方法等
- 返回这个新对象

其实这里已经很明确的知道 this 会指向这个新对象实例。

还有一点：`如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。`

示例：

```
// 返回了一个指定对象
function Person(name) {
    this.name = name;
    return {
      name: 'test'
    }
}

var p1 = new Person('Nick');
console.log(p1.name) // test
```

```
// 返回一个字符串
function Person(name) {
    this.name = name;
    return 'string'
}

var p1 = new Person('Nick');
console.log(p1.name) // Nick
```

### 五、箭头函数中的 this

`箭头函数中 this 根据外层（函数或者全局）上下文来决定`

```
const foo = {
    fn: function () {
        setTimeout(function() {
            console.log(this)
        })
    }
}
console.log(foo.fn())
```

this 出现在 setTimeout() 中的匿名函数里，因此 this 指向 window 对象。如果需要 this 指向 foo 这个 object 对象，可以巧用箭头函数解决：

```
const foo = {
    fn: function () {
        setTimeout(() => {
            console.log(this)
        })
    }
}
console.log(foo.fn()) // {fn: ƒ}
```
