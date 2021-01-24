// https://www.freecodecamp.org/news/the-definitive-node-js-handbook-6912378afc6e/
/*
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n')});
server.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`)});
*/
var request = require('request');
var URL = 'https://www.petergen.com/bovkalo/duhov/mda.html';

request(URL, function (err, res, body) {
    if (err) throw err;
    console.log(iconv.encode(iconv.decode(body, "cp1251"), "utf8").toString());
    console.log(res.statusCode);
});