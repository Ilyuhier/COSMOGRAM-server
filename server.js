const http = require('node:http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 4026;
const dataGenerator = require('./js/dataGenerator.js')
const dataArray = dataGenerator()
fs.writeFile('data.txt', JSON.stringify(dataArray), (err) => {
  if (err) {
    console.error('Помилка при записі у файл:', err);
  } else {
    console.log('Дані успішно записано в файл:');
  }
})

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*'
  });
  
  const url = req.url;
  
 if(url ==='/photo'){
    const data = fs.readFileSync('data.txt','utf8')
    res.write(data)
    res.end()
  }
  else {
    res.end('Wrong Url\n try /photo')
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});