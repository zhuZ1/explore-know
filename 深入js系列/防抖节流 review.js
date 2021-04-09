// 防抖
    // 重复触发事件，只在最后一次事件结束后的一段时间内执行
function debounce(func, wait){
  var timout
  return function(){  // 函数调用会返回一个function
    // dom.onmousemove = function () {}
    var that = this, event = arguments  // 修正this指向调用函数的对象
    clearTimeout(timout)
    timout = setTimeout(()=>{
      func.apply(that, event)
    }, wait)
  }
}

// immediate函数来控制是否立即执行，只在为 true的时候返回执行结果
function debounce1(func, wait, immediate) {
  var timout, result
  var debounced = function () {
    var that = this, event = arguments
    if(timout) clearTimeout(timout)
    if(immediate){ // 立即执行
      var callNow = !timout
      timout = setTimeout(()=>{  // wait时间内 timout都是有值的，callNow为false，不会触发func执行逻辑
                                          // wait时间后， timout被清空，才能再度触发事件
        timout = null
      }, wait)
      if(callNow) result = func.apply(that, event)
    } else {
      timout = setTimeout(()=>{
        func.apply(that, event)
      }, wait)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timout)
    timout = null
  }
  return debounced
}


// 节流 一段时间内，只触发一次事件
function throttle(fn, delay) {
  var timeout = null
  return function () {
    var that = this, event = arguments
    if(!timeout){
      timeout = setTimeout(function () {
        fn.apply(that, event)
        clearTimeout(timeout)
        timeout = null
      }, delay)
    }
  }
}

