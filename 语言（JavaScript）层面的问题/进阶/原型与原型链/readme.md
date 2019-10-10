## 构造函数创建对象

使用构造函数创建一个对象:
```
function Person() {
  
}

let person  = new Person();
person.name = 'zhangsan';
console.log(person.name);// zhangsan
```
Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person

### prototype
每个函数都有一个 prototype 属性, prototype是函数才会有的属性。
```
function Person() {
  
}

Person.prototype.name = 'lisi';
let person1  = new Person();
let person2  = new Person();
console.log(person1.name);// lisi
console.log(person2.name);// lisi
```

函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型。即person1,person2的原型。
那什么是原型呢？可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

构造函数和实例原型之间的关系如图：
![](http://ww3.sinaimg.cn/large/006tNc79ly1g5fymxrvlpj312g0aitab.jpg)

在这张图中我们用 Object.prototype 表示实例原型。
那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：

### __proto__
每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。

```
console.log(person1.__proto__ === Person.prototype);//true
```
![](http://ww3.sinaimg.cn/large/006tNc79ly1g5fyr4ap2xj31180judib.jpg)

实例对象和构造函数都有属性指向原型，那么原型是否有属性指向构造函数或者实例呢？

### constructor

指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的。每个原型都有一个 constructor 属性指向关联的构造函数。

```
console.log(Person === Person.prototype.constructor );//true
```
![](http://ww2.sinaimg.cn/large/006tNc79ly1g5fzo364s4j31300kcgo8.jpg)

## 实例与原型

读取实例的属性时，如果找不到会自动查找与对象关联的原型上的属性。同理，查不到会继续找原型的原型，一直到最顶层。
```
Person.prototype.name = 'zhangsan';

let person = new Person();
person.name = 'lisi';

console.log(person.name);// lisi

delete person.name;
console.log(person.name);// 'zhangsan'
```
可以看到删除了person实例的name属性后，打印出了person的原型中的name属性值(`person.__proto__`也即`Person.prototype`中查找)。

如果person的原型依然没有name属性呢，原型的原型是什么？

### 原型的原型

原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：

```
var obj = new Object();
obj.name = 'zhangsan'
console.log(obj.name) // zhangsan
```

其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 `__proto__` 指向构造函数的 prototype:

![](http://ww2.sinaimg.cn/large/006tNc79ly1g5h1gkw9pmj311v0u0jvx.jpg)

### 原型链

Object.prototype 的原型是什么？

```
console.log(Object.prototype.__proto__) //null
```
也就是说 Object.prototype 是没有原型的。
![](http://ww4.sinaimg.cn/large/006tNc79ly1g5h1ozaexzj30u00v1q8f.jpg)

其实相互关联的原型组成的链状结构就是原型链。

