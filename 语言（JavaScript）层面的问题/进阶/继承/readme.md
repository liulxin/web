在《javascript高级程序设计》中讲解了6种继承方式：

### 1.原型链继承

```
function SuperType() {
  this.property = true
}

SuperType.prototype.getSuperValue = function() {
  return this.property
}

function SubType() {
  this.subproperty = false
}

//继承了supertype
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function() {
  return this.subproperty
}

var instance = new SubType()

console.log(instance.getSubValue()) // false
```

原型链继承存在的问题：
```
function SuperType() {
  this.colors = ['red']
}

function SubType() {
  
}

SubType.prototype = new SuperType()

var instance1 = new SubType()
instance1.colors.push('blue');
console.log(instance1.colors) // ["red", "blue"]

var instance2 = new SubType()
instance2.colors.push('pink');
console.log(instance2.colors) // ["red", "blue", "pink"]
```
1. 引用类型的属性被所有实例共享。
2. 创建子类型的实例时，不能向超类型的构造函数中传递参数。

### 2.借用构造函数

解决原型中包含引用类型值所带来的问题：
```
function SuperType() {
  this.colors = ['red']
}

function SubType() {
  SuperType.call(this)
}

var instance1 = new SubType()
instance1.colors.push('blue')
console.log(instance1.colors) // ["red", "blue"]

var instance2 = new SubType()
instance2.colors.push('pink')
console.log(instance2.colors) // ["red", "pink"]
```

传递参数：
```
function SuperType(name) {
  this.name = name
}

function SubType() {
  //继承superType同时传递参数
  SuperType.call(this, 'lisi')

  //实例属性
  this.age = 24
}

var instance = new SubType()
console.log(instance.name) //lisi
```

借用构造函数存在的问题：
方法都在构造函数中定义，每次创建实例都会创建一遍方法，函数复用就无从谈起了。

### 3.组合继承