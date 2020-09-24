
class EventEmitter {
  constructor(){
    this.events = {}
  }
  on(eventName, callback){
    if(!this.events[eventName]){
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  emit(eventName){
    this.events[eventName] && this.events[eventName].forEach(cb=>cb())
  }

  removeListener(eventName, callback){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(cb=>cb != callback)
    }
  }
  once(eventName, callback){
    let fn =()=>{
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
