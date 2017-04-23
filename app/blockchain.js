const fetch = require('node-fetch');

function getTicker(){
    fetch('https://blockchain.info/ticker')
        .then(res => res.json())
        .then(json => console.log(json));
}
function getChart(){
    fetch('https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json')
        .then(res => res.json())
        .then(json => console.log(json));
}
// getTicker();
getChart();
