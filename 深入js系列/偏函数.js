
// 局部应用： 指固定一个函数的一些参数，然后产生一个更小元的函数
// 什么是元？ 元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数

var _ = {}
function partial(fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    var position = 0, len = args.length
    for(var i = 0;i < len;i++){
      args[i] = args[i] === _? arguments[position++]: args[i]
    }
    while(position < arguments.length) args.push(arguments[position++])
    return fn.apply(this, args)
  }
}
