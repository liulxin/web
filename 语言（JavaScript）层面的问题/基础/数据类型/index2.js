// console.log(typeof 1) // number
// console.log(typeof 'str') // string
// console.log(typeof undefined) // undefined
// console.log(typeof true) // boolean
// console.log(typeof Number(1)) // number
// console.log(typeof String('str')) // string
// console.log(typeof Boolean('str')) // boolean
// console.log(typeof BigInt(2)) // bigint
// console.log(typeof Symbol()) // symbol

// console.log(typeof null) // object
// console.log(typeof (() => 1)) // function
// console.log(typeof {}) // object
// console.log(typeof []) // object
// console.log(typeof new Date()) // object

// function Animal (name) {
//   this.name = name
// }

// const cat = new Animal('cat');
// console.log(cat instanceof Animal) // true

// console.log((() => 1) instanceof Function) // true
// console.log({} instanceof Object) // true
// console.log([] instanceof Array) // true
// console.log(new Date() instanceof Date) // true

// console.log(null instanceof Object) // false


console.log(Object.prototype.toString.call(1)) 
// [object Number]
console.log(Object.prototype.toString.call('str')) 
// [object String]
console.log(Object.prototype.toString.call(undefined)) 
// [object Undefined]
console.log(Object.prototype.toString.call(true)) 
// [object Boolean]
console.log(Object.prototype.toString.call({})) 
// [object Object]
console.log(Object.prototype.toString.call([])) 
// [object Array]
console.log(Object.prototype.toString.call(function(){})) 
// [object Function]
console.log(Object.prototype.toString.call(null)) 
// [object Null]
console.log(Object.prototype.toString.call(Symbol(2))) 
// [object Symbol]
console.log(Object.prototype.toString.call(BigInt(2))) 
// [object BigInt]

console.log(Object.prototype.toString.call(BigInt(2)).slice(8,-1)) 
// BigInt