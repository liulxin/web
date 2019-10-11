在《javascript 高级程序设计》中讲解了 6 种继承方式：

## 1.原型链继承

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

## 2.借用构造函数

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

## 3.组合继承

原型链和借用构造函数组合。使用原型链实现对原型属性和方法的继承，借用构造函数实现实例属性的继承。

```
function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue']
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)

  this.age = age
}

//继承方法
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sagAge = function() {
  console.log(this.age)
}

var instance1 = new SubType('nike', 20)
instance1.colors.push('pink')
console.log(instance1.colors) // ["red", "blue", "pink"]
instance1.sagAge() // 20
instance1.sayName() // nike

var instance2 = new SubType('gary', 21)
console.log(instance2.colors) // ["red", "blue"]
instance2.sagAge() // 21
instance2.sayName() // gary
```

## 4.原型式继承

```
function cObject(o) {
  function F(){}
  F.prototype = o;
  return new F()
}

var person = {
  name: 'nike',
  friends: ['van', 'court']
}

var anotherPerson = cObject(person);
anotherPerson.friends.push('super')

var yetPerson = cObject(person)
yetPerson.friends.push('arr')

console.log(person.friends) // ["van", "court", "super", "arr"]
```

缺点：原型式继承和原型链继承一样：引用类型的属性被所有实例共享。

## 5.寄生式继承

```
function cObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function createObj(o) {
  var clone = cObject(o)
  clone.sayName = function() {
    console.log('hi')
  }
  return clone
}

var person = {
  name: 'nike',
  friends: ['van', 'court']
}

var anotherPerson = createObj(person)
anotherPerson.sayName()
```

## 6.寄生组合式继承
在组合式继承中，无论什么情况下都会调用两次超类型构造函数。
```
function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue']
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name) // 第一次

  this.age = age
}

//继承方法
SubType.prototype = new SuperType() // 第二次
SubType.prototype.constructor = SubType
SubType.prototype.sagAge = function() {
  console.log(this.age)
}
```
寄生组合式继承便解决了这个问题：
```
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function inheritPrototype(SubType, SuperType) {
  var prototype = object(SuperType.prototype)
  prototype.constructor = SubType
  SubType.prototype = prototype
}

function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue']
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

inheritPrototype(SubType, SuperType)

SubType.prototype.sagAge = function() {
  console.log(this.age)
}

var instance1 = new SubType('nike', 20)
instance1.sagAge()
```
