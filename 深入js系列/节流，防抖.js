// 开发中会遇到一些频繁触发的事件
// 例如 1 window 的resize, scroll 2 mousedown mousemove 等
// 防抖：debounce
// 你尽管触发事件，在一定的时间之后才会执行， 如果重复触发事件，延迟时间就会更新（持续触发事件，在最后一次 n 秒后执行一次）
function debounce(func, wait){
  var timeout
  return function(){
    var that = this,
      args = arguments // 事件对象e
      // 修正this指向, 以让其能指向调用函数的对象
    clearTimeout(timeout)
    timeout = setTimeout(function(){
      func.apply(that, args)
    }, wait)
  }
}
// 新增 immediate 参数来控制是否立即执行, 事件函数可能有返回值, 只在 immediate 为true的时候返回执行结果
function debounce(func, wait, immediate){
  var timeout, result
  return function(){
    var that = this,
      args = arguments // 事件对象e
    // 修正this指向, 以让其能指向调用函数的对象
    if(timeout) clearTimeout(timeout)
    if(immediate){
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if(callNow) result = func.apply(that, args)
    } else {
      timeout = setTimeout(function(){
        func.apply(that, args)
      }, wait)
    }
    return result
  }
}
// 想要取消 debounce 函数
function debounce(func, wait, immediate){
  var timeout, result
  var debounced = function(){
    var that = this,
      args = arguments // 事件对象e
    // 修正this指向, 以让其能指向调用函数的对象
    if(timeout) clearTimeout(timeout)
    if(immediate){
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if(callNow) result = func.apply(that, args)
    } else {
      timeout = setTimeout(function(){
        func.apply(that, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
// 节流：throttle
// 某些代码不能在没有间断的情况下连续重复执行，第一次调用函数，创建一个定时器，在指定的时间间隔后运行代码，
// 第二次调用时，会清除前一次的定时器并设置另一个（持续触发事件，每 n 秒执行一次）
// 一种是时间戳， 一种是定时器
function throttle(func, wait, options) {
  var timeout, that, args, result
  var previous = 0
  if(!options) options = {}

  var later = function(){
    previous = options.leading === false ? 0: new Date().getTime()
    timeout = null
    func.apply(that, args)
    if(!timeout) that = args = null
  }

  var throttled = function(){
    var now = new Date().getTime()
    if(!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    that = this, args = arguments
    if(remaining <=0 || remaining > wait){
      if(timeout){
        clearTimeout(timeout)
        timeout = null
        previous = now
        func.apply(that, args)
        if(!timeout) that = args = null
      }
    } else if(!timeout && options.trailing !== false){
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function(){
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}
