
// sleep函数的作用是让线程休眠，等到指定时间再重新唤起
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

sleep(5000).then(res=>{
  console.log('sleep end')
})

