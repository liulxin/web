---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 特殊的变量 name

浏览器环境下：

```
name = 123;

console.log(name) // '123'
console.log(typeof name) // string
```
为什么打印的不是number类型呢？  

window.name 会调用 toString 将赋给它的值转换成对应的字符串表示(不可赋值symbol类型)