// Отслеживание обновление страниц со списками священников
// https://www.petergen.com/bovkalo/
// Списки выпускников духовных учебных заведений https://www.petergen.com/bovkalo/duhov.html
// https://www.petergen.com/bovkalo/duhov/mda.html
//var request = require('request');

var URL = 'https://www.petergen.com/bovkalo/duhov.html';
//'https://www.petergen.com/bovkalo/duhov/mda.html';
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
        b2(body);
    });
});

function b(body) {
    var start = body.indexOf('<center>');
    var finish = body.indexOf('<p><center>');
    console.log(body.slice(start, finish));
}

function b2(body){
    console.log("<ul>");
    array = [...body.matchAll(/<a href="duhov[^>]+>[^<]+<\/a>.+/g)];
    for (var it in array) console.log(' <li>' + array[it][0] + '</li>');
    console.log("</ul>");
}