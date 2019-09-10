// console.log(Number(1)) //1
// console.log(Number(-1)) //-1
// console.log(Number('1')) //1
// console.log(Number('str')) //NaN
// console.log(Number('null')) //NaN
// console.log(Number(true)) //1
// console.log(Number(false)) //0
// console.log(Number(null)) //0
// console.log(Number(undefined)) //NaN
// console.log(Number({})) //NaN
// console.log(Number([])) //0
// console.log(Number([1,2])) //NaN
// console.log(Number(() => {})) //NaN
// // console.log(Number(Symbol())) 不可转
// console.log(Number(BigInt(2))) //2

// [1,2, 'this'].toString() // "1,2,this"

// let num = ['123', '123.4', '123.6', '0123', '123this', 'this123']
// console.log(num.map(item => parseInt(item)))
// console.log(num.map(item => parseFloat(item)))

// [ 123, 123, 123, 123, 123, NaN ]
// [ 123, 123.4, 123.6, 123, 123, NaN ]

// console.log(String('2 + 2')) // 2 + 2
// console.log(String(3)) // 3
// console.log(String([12,3])) // 12,3
// console.log(String([])) //
// console.log(String(null)) // null
// console.log(String(undefined)) // undefined

// console.log(Boolean(false)) // false
// console.log(Boolean(null)) // false
// console.log(Boolean(undefined)) // false
// console.log(Boolean(0)) // false
// console.log(Boolean(-0)) // false
// console.log(Boolean(NaN)) // false
// console.log(Boolean('')) // false
// console.log(Boolean([])) // true
// console.log(Boolean({})) // true
// console.log(Boolean(new Boolean(false))) //true

console.log(1 + '1') // 11
console.log(1 + true) // 2
console.log(1 + false) // 1
console.log(1 + undefined) // NaN
console.log('1' + true) // 1true
console.log({} + true) // [object Object]true
console.log(Infinity + Infinity) //Infinity
console.log(-Infinity + (-Infinity)) // -Infinity
console.log(-Infinity + (Infinity)) // NaN
