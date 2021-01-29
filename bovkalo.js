// Отслеживание обновления страниц со списками священников
// Списки выпускников духовных учебных заведений https://www.petergen.com/bovkalo/duhov.html

var URL = 'https://www.petergen.com/bovkalo/duhov.html';

const iconv = require("iconv-lite");
const http = require("https");
const fs = require('fs');

var pages = [];

function h(URL,g){
    http.get(URL, (res) => {
        res.pipe(iconv.decodeStream("win1251")).collect((err, body) => {
            if (err) throw err;
            g(body);
        });
    });
}

function h2(pageURL, g2) {
    http.get(URL.replace('duhov.html', pageURL), (res) => {
        res.pipe(iconv.decodeStream("utf8")).collect((err, body) => {
            if (err) throw err;
            g2(pageURL, body);
        });
    });
}

function g2(pageURL, body) {
    fs.appendFile("duhov/" + pageURL, body);
}

/*
function f(file){
    fs.stat(file, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }
        s(stats);
    });
}
*/

var stat = null;

function s(stats){
    stat = stats;
}

/*
f('duhov.html');


stat.isFile(); //true
stat.isDirectory(); //false
stat.isSymbolicLink(); //false
var s = stat.size; //1024000 //= 1MB
*/

h(URL,g);

function g(body){
    console.log("<ul>");
    fs.writeFileSync("duhov.html", "<ul>");
    array = [...body.matchAll(/<a href="duhov[^>]+>[^<]+<\/a>.*/g)];
    for (var it in array) {
        var a = array[it][0];
        var c = a.match(/duhov\/(.+\.html?)/);
        var pageURL = c[1];
        console.log(' <li>', Number(it)+1, pageURL, a, '</li>');
        fs.appendFileSync("duhov.html", " <li>"+a+"</li>");
        //h2(pageURL, g2);
        pages.push([URL.replace('duhov.html', pageURL), "duhov\\" + pageURL]);
    }
    console.log("</ul>");
    fs.appendFileSync("duhov.html", "</ul>");
    function gi(body, pLocal) {
        fs.writeFile(pLocal, body);
    }
    for(it in pages){
        var pGlobal = pages[it][0], pLocal = pages[it][1];
        http.get(pGlobal), (res) => {
            res.pipe(iconv.decodeStream("utf8")).collect((err, body) => {
                if (err) throw err;
                gi(body, pLocal);
            });
        };
    }
}