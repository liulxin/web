let u // undefined
function add(a, b) {
  console.log(a, b)
}
add() // undefined undefined

let num = 6
let fnm = 5.6
let inf = +Infinity
let nan = isNaN('5')
let nan2 = isNaN('this is nan')
let nan3 = isNaN(true)

console.log(inf) //Infinity
console.log(nan) //false 会转换为数字 5
console.log(nan2) //true
console.log(nan3) //false 会转换为数字 1

// isFinite 判断是不是无穷
// const x_ = 2 ** 53
// console.log(isFinite(x_)) //true
// const x = 2n ** 53n
// // BigInt不能与数字互换操作 isFinite会抛出TypeError
// console.log(x) //9007199254740992n
// const y = x + 1n
// console.log(y) //9007199254740993n
// console.log(!y) //false

const x = Number.MAX_SAFE_INTEGER
//9007199254740991 ,1 less than 2^53
const y = x + 1
//9007199254740992
const z = x + 2
//9007199254740992

const theBiggestInt = 9007199254740991n
console.log(theBiggestInt) // 9007199254740991n
const alsoHuge = BigInt(9007199254740991)
console.log(alsoHuge) //9007199254740991n
const hugeButString = BigInt('9007199254740991')
console.log(hugeButString) //9007199254740991n

const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER)
console.log(previousMaxSafe) // 9007199254740991n
const maxPlusOne = previousMaxSafe + 1n
console.log(maxPlusOne) // 9007199254740992n

let str = 'abc'
let str2 = '这是str'

const symbol1 = Symbol()
const symbol2 = Symbol(42)
const symbol3 = Symbol('foo')
const syb = {[Symbol('2')] : 2};
console.log(syb); // { [Symbol(2)]: 2 }
console.log(Symbol('foo') === Symbol('foo')) // false

let _a = '123'
let _b = _a
_b = '3'
let _c = { a: 1 }
let _d = _c
_d.a = 2
console.log(_a) // 123
console.log(_c) // { a: 2 }
