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
