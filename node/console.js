// console.assert(false, '什么都不做')
// console.clear()
//
// console.count('abc') // 计数器
//
// const code = 5
// console.error(code)
//
// let table = [{a: 1}, {b: 2}]
// console.table(table)
// const dns = require('dns')
//
// dns.lookup('www.baidu.com',(err, address, family)=>{
//   console.log(address, family)
// })
b = 3

function f(a) {
  var b = 2
  console.log(a, b)
}


f(4)
console.log('b=',global.b)

for(var i=0; i<5; i++){
  console.log('内部的', i)
}

console.log(i)

let j

for(j=0; j<5; j++){
  console.log('内部j', j)
}
console.log(j)

function foo(a) {
  console.log(a)
}

function bar() {
  var a = 3
  foo(a)
}

// var a = 2

bar()

var obj = {
  id: 'awesome',
  cool: function coolFn() {
    console.log(this.id)
  }
}

var id = 'not awesome'

console.log(obj.cool())
setTimeout(obj.cool,1)

function foo1(something) {
  console.log(this.a, something)
  return this.a + something
}

var obj1 = {
  a: 2
}
var bar1 = foo1.bind(obj1)
console.log(bar1(3))

var myArr = [1, 2, 3], it = myArr[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())

