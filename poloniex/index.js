const tradingApi = require('./tradingApi')
const objectHelper = require('./objectHelper');
const commandLineOptions = require('./commandLineOptions');
const consoleLogger = require('./consoleLogger');

const opts = commandLineOptions.get();
const currencyPair = opts.currencyPair;
const amount = opts.amount;
const rate = opts.rate;

if (opts.all || opts.returnBalances) {
  tradingApi.returnBalances()
    .then((msg) => {
      const objArray = objectHelper.getGreaterThanZeroValuesFromObject(JSON.parse(msg.body));
      consoleLogger.printArrayLineByLine(objArray);
    })
    .catch(err => consoleLogger.printError(err));
}

if (opts.all || opts.returnTradeHistory) {
  tradingApi.returnTradeHistory({
    currencyPair,
    // currencyPair: BTC_LTC
    start: new Date('1970-01-01 00:00:00').getTime() / 1000
    // start: 1410158341,
    // end: new Date('2017-05-05 05:43:30').getTime() / 1000
  }).then(msg => consoleLogger.printArrayLineByLine(msg.body))
    .catch(err => consoleLogger.printError(err))
}

if (opts.returnBoughtSold) {
  tradingApi.returnTradeHistory({
    currencyPair,
    // currencyPair: BTC_LTC
    start: new Date('1970-01-01 00:00:00').getTime() / 1000
    // start: 1410158341,
    // end: new Date('2017-05-05 05:43:30').getTime() / 1000
  }).then((msg) => {
    const parsed = JSON.parse(msg.body);
    let final = {}
    if (Array.isArray(parsed)) {
      final = {
        currency: parsed
      }
    } else {
      final = parsed;
    }

    Object.keys(final).forEach((currency) => {
      const currencyArr = final[currency];
      const bought = currencyArr
        .filter(a => a.type === 'buy')
        .map(a => parseFloat(a.total))
        .reduce((a, b) => {
          return a + b;
        }, 0);
      const sold = currencyArr
        .filter(a => a.type === 'sell')
        .map(a => parseFloat(a.total))
        .reduce((a, b )=> {
          return a + b;
        }, 0);
      consoleLogger.print(bought,`${currency} purchase value in BTC`);
      consoleLogger.print(sold, `${currency} sold value in BTC`);
    })
  })
    .catch(err => consoleLogger.printError(err))
}
if (opts.buy) {
  tradingApi.buy({
    currencyPair,
    amount,
    rate
  }).then(msg => consoleLogger.print(msg.body))
    .catch(err => console.log(err))
}

if (opts.sell) {
  tradingApi.sell({
    currencyPair,
    amount,
    rate
  }).then(msg => consoleLogger.print(msg.body))
    .catch(err => console.log(err))
}

if (opts.cancelOrder) {
  tradingApi.cancelOrder({
    orderNumber: opts.orderNumber
  }).then(msg => consoleLogger.print(msg.body))
    .catch(err => console.log(err))
}

if (opts.returnOpenOrders) {
  tradingApi.returnOpenOrders({
    currencyPair: opts.currencyPair
  }).then((msg) => {
    const objArray = objectHelper.getNonEmptyArrayValuesFromObject(JSON.parse(msg.body));
    consoleLogger.printArrayLineByLine(objArray);
  })
    .catch(err => console.log(err))
}
