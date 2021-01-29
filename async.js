var fetch = require("node-fetch");

(async () => {
    const res = await fetch(`https://pravoslavnoe-duhovenstvo.ru/persons/?page=1`);
    //const json = await res.json();
    //console.log(json.public_repos);
    console.log(res);
})();