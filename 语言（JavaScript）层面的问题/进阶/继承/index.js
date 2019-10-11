// function SuperType() {
//   this.property = true
// }

// SuperType.prototype.getSuperValue = function() {
//   return this.property
// }

// function SubType() {
//   this.subproperty = false
// }

// //继承了supertype
// SubType.prototype = new SuperType()
// SubType.prototype.getSubValue = function() {
//   return this.subproperty
// }

// var instance = new SubType()

// console.log(instance.getSubValue()) // false

// function SuperType() {
//   this.colors = ['red']
// }

// function SubType() {

// }

// SubType.prototype = new SuperType()

// var instance1 = new SubType()
// instance1.colors.push('blue');
// console.log(instance1.colors) // ["red", "blue"]

// var instance2 = new SubType()
// instance2.colors.push('pink');
// console.log(instance2.colors) // ["red", "blue", "pink"]

// function SuperType() {
//   this.colors = ['red']
// }

// function SubType() {
//   SuperType.call(this)
// }

// var instance1 = new SubType()
// instance1.colors.push('blue')
// console.log(instance1.colors) // ["red", "blue"]

// var instance2 = new SubType()
// instance2.colors.push('pink')
// console.log(instance2.colors) // ["red", "pink"]

// function SuperType(name) {
//   this.name = name
//   this.colors = ['red', 'blue']
// }
// SuperType.prototype.sayName = function() {
//   console.log(this.name)
// }

// function SubType(name, age) {
//   SuperType.call(this, name)

//   this.age = age
// }

// //继承方法
// SubType.prototype = new SuperType()
// SubType.prototype.constructor = SubType
// SubType.prototype.sagAge = function() {
//   console.log(this.age)
// }

// var instance1 = new SubType('nike', 20)
// instance1.colors.push('pink')
// console.log(instance1.colors) // ["red", "blue", "pink"]
// instance1.sagAge() // 20
// instance1.sayName() // nike

// var instance2 = new SubType('gary', 21)
// console.log(instance2.colors) // ["red", "blue"]
// instance2.sagAge() // 21
// instance2.sayName() // gary

// function cObject(o) {
//   function F(){}
//   F.prototype = o;
//   return new F()
// }

// var person = {
//   name: 'nike',
//   friends: ['van', 'court']
// }

// var anotherPerson = cObject(person);
// anotherPerson.friends.push('super')

// var yetPerson = cObject(person)
// yetPerson.friends.push('arr')

// console.log(person.friends) // ["van", "court", "super", "arr"]

// function cObject(o) {
//   function F() {}
//   F.prototype = o
//   return new F()
// }

// function createObj(o) {
//   var clone = cObject(o)
//   clone.sayName = function() {
//     console.log('hi')
//   }
//   return clone
// }

// var person = {
//   name: 'nike',
//   friends: ['van', 'court']
// }

// var anotherPerson = createObj(person)
// anotherPerson.sayName()

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
  SuperType.call(this, name) // 第一次

  this.age = age
}

inheritPrototype(SubType, SuperType)

SubType.prototype.sagAge = function() {
  console.log(this.age)
}

var instance1 = new SubType('nike', 20)
instance1.sagAge()