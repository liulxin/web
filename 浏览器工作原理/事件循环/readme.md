## 浏览器事件循环

js引擎中负责解析代码的线程只有一个（主线程），这也是js被称为单线程的原因。而js任务又分为`同步`和`异步`两种，那么js如何去处理同步和异步任务呢。

同步任务是直接在主线程上排队执行，异步任务则会被放到任务队列中，若有多个任务（异步任务）则要在任务队列中排队等待，任务队列类似一个缓冲区，任务下一步会被移到调用栈（call stack），然后主线程执行调用栈的任务。检查调用栈是否为空，以及确定把哪个task加入调用栈的这个过程就是事件循环，而js实现异步的核心就是`事件循环`。

## macrotask（宏） & microtask（微）
关于任务队列就需要提及两个概念，任务队列分为宏任务和微任务：

1. macrotask：setTimeout、setInterval、setImmediate、I/O、postMessage、requestAnimationFrame、UI rendering

2. microtask：process.nextTick、Promise.then、Object.observe（已废弃）、MutationObserver


## 事件循环流程

1. 主线程执行js代码，形成执行上下文栈，遇到异步任务就挂起，接受到响应结果后将异步任务放入对应的任务队列中，直到执行上下文栈只剩下全局上下文。

2. 将微任务队列中的所有任务按优先级，单个任务队列的异步任务按先进先出（FIFO）的方式入栈并执行，直到清空所有的微任务队列

3. 将宏任务队列中优先级最高的任务队列中的异步任务按先进先出（FIFO）的方式入栈并执行

4. 重复`2 3`步骤，直到清空所有宏任务和微任务，全局上下文出栈。

简单来说就是，主线程执行完js整体代码后，执行`全部`微任务，然后执行`一个`宏任务，然后继续重复微任务、宏任务交替执行，直到清空所有任务队列。

先看一道面试题：
```
console.log('start here')

const foo = () => (new Promise((resolve, reject) => {
    console.log('first promise constructor')

    let promise1 = new Promise((resolve, reject) => {
        console.log('second promise constructor')

        setTimeout(() => {
            console.log('setTimeout here')
            resolve()
        }, 0)

        resolve('promise1')
    })

    resolve('promise0')

    promise1.then(arg => {
        console.log(arg)
    })
}))

foo().then(arg => {
    console.log(arg)
})

console.log('end here')
```
* 首先输出`start here`，执行foo，同步输出 `first promise constructor`
* 继续执行foo, 遇到 promise1,执行promise1,同步输出`second promise constructor`，以及`end here`，同时按顺序：setTimeout 回调进入宏任务队列，promise1 的完成处理函数进入 微任务队列，第一个匿名promise 的完成处理函数进入微任务队列。
* 执行完同步任务之后，开始执行异步任务，即任务队列中的任务。需要先执行所有微任务，那么输出`promise1`,然后输入`promise0`。
* 所有微任务处理完成之后，执行宏任务，输出`setTimeout here`

如果含有await的话，又是怎么处理呢？
```
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function() {
    console.log('setTimeout') 
}, 0)  

async1()

new Promise(function(resolve) {
    console.log('promise1')
    resolve()
}).then(function() {
    console.log('promise2')
})

console.log('script end')
```
* async 声明的函数，其返回值必定是 promise 对象，如果没有显式返回 promise 对象，也会用 Promise.resolve() 对结果进行包装，保证返回值为 promise 类型
* await之后如果不是promise，await会阻塞后面的代码，会先执行async外面的同步代码，等外面的同步代码执行完成在执行async中的代码
* 如果await等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果
>只有运行完await语句，才把await语句后面的全部代码加入到微任务行列

代码分析：
* 执行同步代码，输出`script start`, setTimeout 加入宏任务
* 执行 async1 ，输出 `async1 start`, 继续下后执行到 await async2()，执行 async2 函数
* async2 函数内并没有 await，按顺序执行，同步输出 `async2`，按照 async 函数规则，async2 函数仍然返回一个 promise，作为 async1 函数中的 await 表达式的值, 放入微任务
* 主线程回到 async1 函数外，继续执行，输出 Promise 构造函数内 `promise1`，同时将这个 promise 的执行完成逻辑放到微任务当中
* 执行完最后一行代码，输出 `script end`
* 开始检查微任务，输出 `async1 end`，`promise2`
* 宏任务执行，输出`setTimeout`
