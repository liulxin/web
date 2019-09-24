// function foo(a) {
//   var b = a * 2
//   function bar(c) {
//     console.log(a, b, c)
//   }
//   bar(b * 3)
// }

// foo(2)

// function foo(str, a) {
//   eval(str)
//   console.log(a, b)
// }
// var b = 2
// foo('var b = 3', 1) // 1 3

// function foo(obj) {
//   with(obj) {
//     a = 2;
//   }
// }
// var o1 = {
//   a: 3
// }
// var o2 = {
//   b: 3
// }
// foo(o1)
// console.log(o1.a)
// foo(o2)
// console.log(o2.a)
// console.log(a)


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();