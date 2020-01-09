---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# js深拷贝

工作中经常遇到的一个问题，如何深拷贝一个对象？
最简单的方式就是通过`JSON.parse(JSON.stringify(Obj))`。但是当值是`undefined、function、symbol` 在转换过程中会被忽略，数组中会返回`null`。
>《你不知道的 JavaScript》中写到，所有 安全的 JSON 值 （JSON-safe）都可以使用 JSON.stringify(..) 字符串化。什么是不安全的JSON值呢？ undefined 、 function 、 symbol （ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的 对象 都不符合 JSON 结构标准。
```
let person = {
  name: 'liming',
  say: function() {
    console.log(`my name is ${this.name}`)
  },
  _id: Symbol('id'),
  und: undefined,
  friends: ['tom','lilei',undefined]
}

let copyPerson = JSON.parse(JSON.stringify(person))
console.log(copyPerson)
//  {
//    friends: ['tom','lilei', null],
//    name: 'liming'
//  }

```
### 函数实现
```
function deepCopy(obj) {
	if (typeof obj !== 'object') return

	var newObject = obj instanceof Array ? [] : {}

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObject[key] = typeof obj[key] === 'object' && obj[key] ? deepCopy(obj[key]) : obj[key]
		}
	}

	return newObject
}
```