const tradingApi = require('./tradingApi')

function getAllTradeHistory(currencyPair = 'all') {
  return new Promise((resolve, reject) => {
    tradingApi.returnTradeHistory({
      currencyPair,
      // currencyPair: BTC_LTC
      start: new Date('1970-01-01 00:00:00').getTime() / 1000
      // start: 1410158341,
      // end: new Date('2017-05-05 05:43:30').getTime() / 1000
    }).then(msg => resolve(JSON.parse(msg.body)))
      .catch(err => reject(err))
  });
}

function getBoughtSold(currencyPair = 'all') {
  return new Promise((resolve, reject) => {
    tradingApi.returnTradeHistory({
      currencyPair,
      start: new Date('1970-01-01 00:00:00').getTime() / 1000
    }).then((msg) => {
      const parsed = JSON.parse(msg.body);
      let currencies = {}
      if (Array.isArray(parsed)) {
        currencies = {
          currency: parsed
        }
      } else {
        Object.assign(currencies, parsed);
      }

      Object.keys(currencies).forEach((currency) => {
        const currencyArr = currencies[currency];

        const boughtValue = currencyArr
          .filter(a => a.type === 'buy')
          .map(a => parseFloat(a.total))
          .reduce((a, b) => a + b, 0);

        const boughtAmount = currencyArr
              .filter(a => a.type === 'buy')
              .map(a => parseFloat(a.amount))
          .reduce((a, b) => a + b, 0);

        const soldValue = currencyArr
              .filter(a => a.type === 'sell')
          .map(a => parseFloat(a.total))
          .reduce((a, b) => a + b, 0);

        const soldAmount = currencyArr
          .filter(a => a.type === 'sell')
          .map(a => parseFloat(a.amount))
          .reduce((a, b) => a + b, 0);

        const averageValueBought = boughtValue / boughtAmount;
        const averageValueSold = soldValue / soldAmount;



        resolve({
          currency,
          boughtValue,
          boughtAmount,
          averageValueBought,
          soldValue,
          soldAmount,
          averageValueSold
        });
      })
    })
    .catch(err => reject(err))
  });
}

module.exports.getAllTradeHistory = getAllTradeHistory;
module.exports.getBoughtSold = getBoughtSold;
