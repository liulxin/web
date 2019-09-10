强类型语言不同类型的变量不能直接进行运算，弱类型语言中不同类型的变量却是可以运算的。其中就涉及到显式转换与隐式转换。

## 显式转换

1.  非数值转为数值类型

    - Number()

    可以用于任何数据类型

    ```
    console.log(Number(1)) //1
    console.log(Number('1')) //1
    console.log(Number('str')) //NaN
    console.log(Number(null)) //0
    console.log(Number(undefined)) //NaN
    console.log(Number({})) //NaN
    console.log(Number([])) //0
    console.log(Number(() => {})) //NaN
    // console.log(Number(Symbol())) 不可转
    console.log(Number(BigInt(2))) //2
    ```

    Number 转换规则：

    ```
    1. 布尔值，true和false分别为1，0
    2. 数字，简单传入返回
    3. null，为0
    4. undefined，为NaN
    5. 字符串：
      1. 空，为0
      2. 数字，转10进制
      3. 其它NaN
    6. 对象：
      会调用该对象上 valueOf 或 toString 这两个方法，该方法的返回值是转换为基本类型的结果
    ```

    - parseInt()  
      将字符串转换为数值，不遵循四舍五入。string 必须是数字类型的开头字符串，一直遍历到非数值的那个字符才停止。若不是数字开头，则会显示 NaN
    - parseFloat()  
      将字符串转换为浮点数。从数字位开始看，直到非数字位结束，用法与 parseInt(string)一致

    ```
    let num = ['123', '123.4', '123.6', '0123', '123this', 'this123']
    console.log(num.map(item => parseInt(item)))
    console.log(num.map(item => parseFloat(item)))
    // [ 123, 123, 123, 123, 123, NaN ]
    // [ 123, 123.4, 123.6, 123, 123, NaN ]
    ```

2.  其他类型转字符串类型

    - String()
    - toString()

3.  转布尔值  
    `Boolean()`
    - 原始类型
      `undefined null +0 -0 NaN ''`都是 false,其他为 true
    - 对象
      所有对象的布尔值都为`true`
    ```
    console.log(Boolean(false)) // false
    console.log(Boolean(null)) // false
    console.log(Boolean(undefined)) // false
    console.log(Boolean(0)) // false
    console.log(Boolean(-0)) // false
    console.log(Boolean(NaN)) // false
    console.log(Boolean('')) // false
    console.log(Boolean([])) // true
    console.log(Boolean({})) // true
    console.log(Boolean(new Boolean(false))) //true
    ```

## 隐式转换

当使用 + 运算符计算 string 和其他类型相加时，都会转换为 string 类型；其他情况，都会转换为 number 类型，但是 undefined 会转换为 NaN，相加结果也是 NaN。如果存在复杂类型，那么复杂类型将会转换为基本类型，再进行运算。

```
console.log(1 + '1') // 11
console.log(1 + true) // 2
console.log(1 + false) // 1
console.log(1 + undefined) // NaN
console.log('1' + true) // 1true
console.log({} + true) // [object Object]true
console.log(Infinity + Infinity) //Infinity
console.log(-Infinity + (-Infinity)) // -Infinity
console.log(-Infinity + (Infinity)) // NaN
```
