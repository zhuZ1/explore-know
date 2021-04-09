
class EventEmitter {
  constructor(){
    this.events = {}  // 事件对象，存放订阅的名字和事件, 如  {click: [handle1, handle2]}
  }
  // 订阅事件的方法
  on(eventName, callback){
    if(!this.events[eventName]){  // 事件名没有就新建
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)  // 有了就push，同一个事件名可以订阅多个事件
    }
  }
  // 触发事件的方法
  emit(eventName){
    this.events[eventName] && this.events[eventName].forEach(cb=>cb())
  }
  // 移除订阅事件
  removeListener(eventName, callback){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(cb=>cb != callback)
    }
  }
  // 只执行一次订阅事件，然后移除
  once(eventName, callback){
    let fn = () =>{
      callback()
      this.removeListener(eventName, fn)
    }
    this.on(eventName, fn)
  }
}

let em = new EventEmitter()
let workday = 0
em.on('work', function () {
  workday++
  console.log('work everyday')
})

em.once('love', function () {
  console.log('just for love')
})

function makeMoney() {
  console.log('make more money')
}

em.on('money', makeMoney)

let time = setInterval(
  ()=>{
    em.emit('work')
    em.removeListener('money', makeMoney)
    em.emit('money')
    em.emit('love')
    if(workday==5){
      console.log('have a rest')
      clearInterval(time)
    }
  }, 1000
)
