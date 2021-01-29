// Как скачать страницу сайта с помощью NodeJS?
// https://myrusakov.ru/nodejs-read-remote-url.html

var URL = 'https://pravoslavnoe-duhovenstvo.ru/persons/?page=';

const https = require('https');
const fs = require('fs');

// функция загружает удаленный URL

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
    fs.appendFileSync("pravoslavnoe-duhovenstvo.html", res);
}

var i = 701;
//console.log(i);
fs.appendFileSync("pravoslavnoe-duhovenstvo.html", URL+i+'\n');
pr = readURL(URL+i)
    .then(g)
    .catch(err => err.message);
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});