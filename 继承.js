// 什么是继承？
// 继承是面向对象过程中一个强大的机制，可以使子类具有父类的属性和方法，或者重新定义、追加属性和方法
// 继承的几种方法:
// 1.原型链继承
  // 定义父类
function Animal() {
  this.name = 'Animal'
}
Animal.prototype.eat = function (food) {
  return this.name + '在吃' + food
}
// 定义子类
function Cat() {

}
Cat.prototype = new Animal()  // 关键，父类的实例是子类的原型
Cat.prototype.name = 'Cat'
let cat = new Cat()
console.log(cat.name, cat.eat('鱼'))

// 2. 借用构造函数继承
function Dog() {
  Animal.call(this)
}
let dog = new Dog()
// 创建子类实例时调用 父类的构造函数，子类的每个实例都会将父类的属性复制一份
dog.name = '旺财'
console.log(dog.name)  // dog.eat is not a function // 说明无法继承父类原型上的属性和方法

// 3. 原型 + 构造函数的继承方法
function Dog1() {
  Animal.call(this)
}
Dog1.prototype = new Animal()
Dog1.prototype.constructor = Dog1

// 4. 寄生组合式继承
function Dog2() {
  Animal.call(this)
}
Dog2.prototype = Object.create(Animal.prototype)
Dog2.prototype.constructor = Dog2
