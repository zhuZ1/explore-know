function Person() {  // 构造函数

}

var person = new Person() // 实例对象
person.name = 'nav'
console.log(person.name)

Person.prototype.name = 'hehe'  // 定义在构造函数 原型对象上的属性
var person1 = new Person()
var person2 = new Person()
console.log(person1.name, person2.name)

// prototype 是函数特有的属性， 函数的prototype指向一个对象， 该对象是由构造函数创建的实例对象的原型
// 也即 person1和person2 的原型
// 什么是原型？  每一个对象（null除外）在创建的时候都会关联另一个对象，这个对象就是我们所说的原型， 每一个对象都能从原型‘继承’属性
// 每个js对象都有一个属性，_proto_ 这个属性指向该对象的原型
console.log(person._proto_ === Person.prototype)  // 实例对象的_proto_属性指向其构造函数的原型对象

console.log(Person.prototype.constructor === Person)  // 原型对象的 constructor 属性指向构造函数，
// 原型对象无法指向实例对象， 因为一个构造函数可以生成多个实例
console.log(Object.getPrototypeOf(person) === Person.prototype) // es5 的 getPrototypeOf() 方法能获取实例对象的原型
// 真的是继承吗？
// 继承意味着复制操作，而js默认不会复制对象的属性，相反，js只是在两个对象中间创建关联，这样一个对象就可以通过委托访问另一个对象的属性和方法
// 与其说是继承，倒不如说是委托更合适
// _proto_  大多数网站支持这个非标准的访问原型对象的方法
// 最终存在于 Object.prototype 上，与其说是一个属性，不如说是getter/setter, 使用 obj._proto_ 就相当于返回了 Object.getPrototypeOf(obj)
