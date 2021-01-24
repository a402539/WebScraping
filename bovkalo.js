// Отслеживание обновление страниц со списками священников
// https://www.petergen.com/bovkalo/
// Списки выпускников духовных учебных заведений https://www.petergen.com/bovkalo/duhov.html
// https://www.petergen.com/bovkalo/duhov/mda.html
//var request = require('request');

var URL = 'https://www.petergen.com/bovkalo/duhov/mda.html';
/*
request(URL, function (err, res, body) {
    if (err) throw err;
    console.log(body);
    console.log(res.statusCode);
});
*/

const iconv = require("iconv-lite");
const http = require("https");

http.get(URL, (res) => {
    res.pipe(iconv.decodeStream("win1251")).collect((err, body) => {
        if (err) throw err;
        b(body);
    });
});

function b(body) {
    var start = body.indexOf('<h2');
    var finish = body.indexOf('<p><center>');
    console.log(body.slice(start, finish));
}
