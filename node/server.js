const http = require('http')
const myM = require('./foo')
const hostname = '127.0.0.1'
const port = 3000

console.log(myM.foo())

const server = http.createServer((req, res)=>{
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
})

server.listen(port, hostname, ()=>{
  console.log(`server running at http://${hostname}:${port}/`)
})
