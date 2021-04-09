// 首先定义一个父类

function Animal() {
  this.name = 'Animal'
  this.sleep = function () {
    console.log(this.name + '正在睡觉')
  }
}
// 定义在原型上的方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃' + food)
}

// 1. 原型链继承
function Cat() {  // 子类

}

Cat.prototype = new Animal() // 将父类作为子类的原型
Cat.prototype.name = 'cat'

let cat  = new Cat()
console.log(cat.name)
console.log(cat instanceof Animal) //true instanceof 检查某个构造函数的 prototype属性是否出现在某个实例对象的原型链上
console.log(cat instanceof Cat) // true
cat.eat('shi')
// 优点：
// 纯粹的继承关系。子类的实例也是父类的实例
// 简单
// 父类新增的属性和方法，子类都能访问
// 缺点：
// 想要为子类增加属性和方法，必须在new Animal()之后进行
// 不能实现多继承
// 原型对象的属性会被所有实例共享

// 2. 借用构造函数
function Dog(name) {
  Animal.call(this)
  this.name = name || '旺财'
}
let dog = new Dog()
console.log(dog.name)
dog.sleep()
// dog.eat('shi') dog.eat is not a function
// 优点：
// 1.可以实现多继承 call， apply
// 2. 可以在子类的构造函数中向父类传递参数
// 缺点：
// 1.实例不是父类的实例，只是子类的
// 2. 不能继承原型上的属性和方法

// 3. 原型 + 构造函数的方法. 组合继承需要调用两次父类构造函数
function Dog1(name, age) {
  Animal.call(this, name) // 2次
  this.age = age
}
Dog1.prototype = new Animal()  // 1次
Dog1.prototype.constructor = Dog1 // 修复构造函数指向

let dog1 = new Dog1('小狗')
console.log(dog1.name)
dog1.sleep()
// 缺点：
// 调用了两次父类的构造函数，第一次给子类的原型添加了父类的属性，第二次给子类的构造函数添加了父类的属性
// 从而覆盖了同名属性，造成性能浪费


// 4. 寄生组合继承
function Dog2(name, age) {
  Animal.call(this, name)
  this.age = age
}
Dog2.prototype = Object.create(Animal.prototype)
Dog2.prototype.constructor = Dog2
// es5最完美的继承方法，解决了组合继承中调用两次父类构造函数的问题


// 5. es6继承
class Person {
  constructor(name, age){
    this.name = name
    this.age = age
  }
  showName(){
    console.log(this.name, this.age + '岁了' )
  }
}

class Man extends Person{
  constructor(name, age, male){
    super(name, age)
    this.male = male
  }
  sayHello(){
    console.log(this.name + '你好啊')
  }
}

let m1 = new Man('小红', 18, 'girl')
console.log(m1.name, m1.age, m1.male)
m1.sayHello()
m1.showName()

