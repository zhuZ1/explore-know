// es中 所有函数的参数都是按值传递的
// 也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样
var value = 1

function changeV(v){
  v = 2
  console.log(v)
}

console.log(changeV(value)) // 2
// 参数按值传递，v相当于拷贝了一个value的副本，函数中修改的是副本，所以不会改变原有值
console.log(value) // 1

var obj = {
  a: 1
}

function change(o){
  o.a = 2
  console.log(o.a)
}
console.log(change(obj)) // 2
// 按引用传递： 传递对象的引用，函数内部对函数的任何改变都会影响该对象的值，因为两者引用的是同一个对象
// 此并非引用传递， 而是共享传递
console.log(obj.a)  // 2

function change1(o) {
  o = 3
  console.log(o)
}

console.log(change1(obj)) // 3
// 这里的obj并不会被修改，说明引用传递是不存在的
//  共享传递： 传递对象的引用的副本
console.log(obj.a) // 2

// 拷贝副本也是值的传递，所以  按值传递没毛病
