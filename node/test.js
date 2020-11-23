const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zhu_abc',
  database: 'myemployees'
})

connection.connect()
connection.query('select * from jobs', function (error, results, fields) {
  if(error) throw error
  console.log(results)
})
