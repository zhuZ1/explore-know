const myAjax = function (method, url, params) {
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest()
    if(typeof params == 'object'){
      // 获取传入参数，get拼接在url后，post加在 send中
      let arr = []
      for(let key in params){
        arr.push(key + '=' + params[key])
      }
      params = arr.join('&')
    }
    if(method == 'GET'){
      url = url + '?' + params
    }
    let body = null
    if(method == 'POST'){
      body = params
    }
    xhr.open(method, url)
    xhr.send(body)
    xhr.onreadystatechange = () =>{
      if(xhr.readyState == 4 && xhr.status == 200){
        let json = JSON.parse(xhr.responseText)
        resolve(json)
      } else {
        reject('error')
      }
    }
  })
}
