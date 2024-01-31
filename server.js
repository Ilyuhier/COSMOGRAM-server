const dataGenerator = require('./js/dataGenerator.js')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const hostname = '127.0.0.1';
const filePath = './data.txt'

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log('Файл не існує');
    const dataArray = dataGenerator()
    writeTxt(dataArray)
  } else {
    console.log('Файл існує');
  }
});

app.use(express.json({limit: '3000kb', extended: true}))
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/photos', (req, res) => {
  res.sendFile('D:/Fpro/Homework/COSMOGRAM SERVER/COSMOGRAM-server/data.txt')
})

app.post('/picture', (req, res) => {
  res.send(JSON.stringify('Your image succesfully uploaded'))
  const data = JSON.parse(fs.readFileSync('data.txt','utf8'))
  const body = req.body
  body.id = data.length + 1
  body.comments = ''
  body.likes = 0
  data.push(body)
  writeTxt(data)
  console.log(data)
})

app.listen(port, hostname,() => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

function writeTxt(data){
  fs.writeFile('data.txt', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Помилка при записі у файл:', err);
   } else {
   console.log('Дані успішно записано в файл:');
   }
})
}