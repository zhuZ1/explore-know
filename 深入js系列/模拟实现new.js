// 因为new是关键字，所以建立一个新对象 objectFactory
// function Person(){
//   ...
// }
// var person = new Person()
// 使用new
// 使用模拟函数
// var person = objectFactory(Person, ...)

// new操作发生了什么？
// 通过构造函数，new 一个实例，继承了构造器的构造属性（this.name等等）以及原型上的属性
// new 过程会新建对象，此对象会继承构造器的原型和原型上的属性，最后它会被作为实例返回

function objectFactory() {
  var obj = {}
  Constructor = Array.prototype.shift.call(arguments) // 模拟函数的 第一个参数是构造函数
  obj._proto_ = Constructor.prototype  // 实例对象的 _proto_ 指向 原型对象
  let res = Constructor.apply(obj, arguments)  // 经典继承中，为obj添加构造函数中的属性
  return typeof res === 'object'? res || obj: obj
}

// es6实现
function myNew(obj, ...rest){
  let newObj = Object.create(obj.prototype) // 以构造函数的prototype 属性为原型创建新对象
  let result = obj.apply(newObj, rest) // 将this 和调用参数交给构造器执行
  return typeof result === 'object'? result: newObj
}

function Person(name, age) {
  // let this = {} 隐式的
  this.name = name
  this.age = age
  // return this 如果没有手动返回对象，那就会返回this 指向的对象，也是隐式的
}
// 这里实际上只描述了构造器的属性是如何 赋给实例的，却没说原型上的属性是如何通过实例继承的
// 所以更合理的说法是 以构造器的 prototype 属性为原型创建对象

Person.prototype.sayName = function () {
  console.log(this.name)
}

let person = new Person('小明', 20)
person.sayName()
