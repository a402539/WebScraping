// Отслеживание обновление страниц со списками священников
// https://www.petergen.com/bovkalo/
// Списки выпускников духовных учебных заведений https://www.petergen.com/bovkalo/duhov.html
// https://www.petergen.com/bovkalo/duhov/mda.html
var request = require('request');

var URL = 'https://www.petergen.com/bovkalo/duhov/mda.html';

request(URL, function (err, res, body) {
    if (err) throw err;
    console.log(body);
    console.log(res.statusCode);
});