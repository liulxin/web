---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# new的模拟实现

实现目标：
1. 创建新的对象
2. 新对象属性有构造函数中`this`绑定的属性
3. 新对象可以访问构造函数原型链上的属性和方法
4. 如果构造函数返回了一个对象，实例化的对象只能访问返回的对象中的属性

```
let newF = function(Constructor, ...rest) {
	const obj = Object.create(Constructor.prototype)

	const res = Constructor.apply(obj, rest)

    // && 当结果为真时，返回第二个为真的值, 当结果为假时，返回第一个为假的值
	return (typeof res === 'object' && res) || obj
}
```

测试：
```
function Obj(name) {
  this.name = name
}

Obj.prototype.setName = function(name) {
  this.name = name
}
Obj.prototype.getName = function() {
  return this.name
}

var obj1 = new Obj('huahua')
console.log(obj1)
console.log(obj1.getName())
obj1.setName('liul')
console.log(obj1.getName())


var obj2 = newF(Obj, 'huahua2')
console.log(obj2)
console.log(obj2.getName())
obj2.setName('liul2')
console.log(obj2.getName())
```
带返回值的情况：
```
function Obj(name) {
  this.name = name

  return {
    name: 'mod'
  }
}

var obj2 = newF(Obj, 'huahua2')
console.log(obj2) // { name: 'mod' }
console.log(obj2.getName()) // TypeError: obj2.getName is not a function
```