var value = 1

function bar(){
  var value = 2
  foo()  // 调用foo, 内部查找不到，就向上一层查找。 即全局
}
function foo() { // 这里的foo是定义在全局作用域里的
  console.log(value) // 1
}
console.log(bar())

// 类比：
function bar1() {
  var value = 2
  function foo(){  // foo定义在函数bar1 的内部，调用foo，内部查找不到，向上一层查找，即bar1 的作用域
    console.log(value) // 2
  }
  foo()
}
console.log(bar1())
// 词法作用域： 函数的作用域在定义的时候就已经决定了。
// 动态作用域： 函数的作用域在调用的时候才决定
// 如果是静态作用域  调用foo(), 先在内部查找value 变量, 没找到, 则向上一层查找 value = 1
// 相反，如果是动态作用域， foo() 是在bar内部被调用的，foo本身没有找到value, 就从调用函数的作用域，也就是 bar() 内部查找 value = 2

// 变量对象
// 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明
// 函数上下文
// 在函数上下文中， 我们用活动变量（AO）来表示变量对象。
// 活动对象和变量对象是一个东西，变量对象是规范上的，不可再js环境中访问，只有当进入一个执行上下文中时，
// 这个执行上下文的变量对象才会被激活，而只有被激活的变量对象，各种属性才能被访问

// 执行过程
// 1.进入执行上下文
// 2.代码执行
  // 进入执行上下文
    // 变量对象包括：
     // 1.函数的所有形参
     // 2.函数声明
     // 3.变量声明

var obj = {
  name:'zz',
  say: function() {
    console.log('name', this.name)
  }
}
obj.say()

var foo1 = obj.say
foo1()

  let newArr = [
    ["2010", "", ""],
    ["2012", "", "1990"],
    ["硕士", "硕士", ""],
    ["经管学部", "经管学部", ""],
    ["天津大学", "天津大学", "北京林业大学"],
    ["陈卫东", "", ""]
  ]
let res = [], keys = ['enrollmentYear', 'graduationYear', 'educationArr', 'collegeName', 'schoolArr', 'classTeacher']
  for(let i = 0; i < newArr[0].length; i++){
    let obj = {}
    for(let j = 0; j < keys.length; j++){
      obj[keys[j]] = newArr[j][i]
    }
    res.push(obj)

  }
  console.log(res)
// let row = newArr[0].length, col = newArr.length
// let eduList = Array.from(new Array(row), ()=> new Array(col).fill(0))
// console.log('初始', eduList)
// for(let i = 0; i < newArr.length; i++){
//   for(let j = 0; j < newArr[i].length; j++){
//     console.log(newArr[i][j])
//     eduList[j][i] = newArr[i][j]
//   }
// }
// console.log(eduList)
// let res = [], keys = ['enrollmentYear', 'graduationYear', 'educationArr', 'collegeName', 'schoolArr', 'classTeacher']
// for(let i = 0; i < eduList.length; i++){
//   let obj = {}
//   for(let j = 0; j < keys.length; j++){
//     obj[keys[j]] = eduList[i][j]
//   }
//   res.push(obj)
// }
// console.log(res)
