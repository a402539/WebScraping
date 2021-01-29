//const fetch = require("node-fetch");
const https = require('https');
const fs = require('fs');

var URL = 'https://pravoslavnoe-duhovenstvo.ru/persons/?page=';

var res;
/*
(async () => {
    res = await https.get(`https://pravoslavnoe-duhovenstvo.ru/persons/?page=1`);
    //(d)=>console.log(d));
    //const json = await res.json();
    //console.log(json.public_repos);
    console.log(res);
})();
*/

function readURL(url) {

    // возвращаем Promise - так как операция чтения может длиться достаточно долго
    return new Promise((resolve, reject) => {

        // встроенный в NodeJS модуль https
        // первый аргумент - url, второй - callback c параметром ответа сервера

        https.get(url, (res) => {

            // получаем статус ответа сервера посредством деструктуризации объекта
            const {
                statusCode
            } = res;


            let error;
            if (statusCode !== 200) {
                error = new Error(`Ошибка запроса. Код ответа: ${statusCode}`);
            }


            // при ошибке очищаем память и выходим
            if (error) {

                reject(error);
                res.resume();
                return;
            }


            // устанавливаем кодировку
            res.setEncoding('utf8');

            // собираем данные в строку
            let rawData = '';
            res.on('data', chunk => rawData += chunk);

            // после получения всех данных успешно завершаем Промис
            res.on('end', () => resolve(rawData));



        }).on('error', (e) => reject(e)); // ошибка -> отклоняем Промис
    });
}

function g(data) {
    res = [...data.matchAll(/<a href="\/person\/\d+\/">[^<]+<\/a>/g)].map(it => it[0]).join('\n') + '\n';
    fs.appendFileSync("async.html", '\n'+res);
}

fs.writeFileSync("async.html", 'https://pravoslavnoe-duhovenstvo.ru/persons/?page=(*) 1-816 \n');
for(var i=1; i<817; i++){
    //fs.appendFileSync("async.html", `${i}\n`);
    var promise = new Promise(resolve => {
        //setTimeout(() => resolve("done!"), 1000);
        //res = await https.get(`https://pravoslavnoe-duhovenstvo.ru/persons/?page=1`);
        //res = https.get(`https://pravoslavnoe-duhovenstvo.ru/persons/?page=`+i);
        //r = res;
        readURL(URL + i)
            .then(g)
            .catch(err => err.message);
    });
    promise.then(
        console.log('done', i)
    ); // выведет "done!" спустя одну секунду
}