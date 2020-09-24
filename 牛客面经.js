'use strict'

var a = 1
var obj = {
  a: 2,
  b: function () {
    this.a = 3
  },
  print: function () {
    console.log(this.a)
  }
}

obj.print() // 输出值 2
var print = obj.print
print() // 输出值 1  严格模式下是 this 指向undefined 会报错



