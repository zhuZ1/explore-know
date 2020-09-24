
// setInterval: 执行多次，每隔几秒执行一次
// setTimeout: 只执行一次， 延迟多长时间后执行。要想多次执行，自调用
function setMyInterval() {
  setMyInterval.timer = setTimeout(()=>{
    arguments[0]()
    setMyInterval(...arguments)
  }, arguments[1])
}

setMyInterval.clear = function () {
  clearTimeout(setMyInterval.timer)
}


// 测试
setMyInterval(()=>{
  console.log(111)
}, 1000)


setTimeout(()=>{
  setMyInterval.clear()
}, 5000)

