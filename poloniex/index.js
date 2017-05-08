const tradingApi = require('./tradingApi')
const objectHelper = require('./objectHelper');
const commandLineOptions = require('./commandLineOptions');
const consoleLogger = require('./consoleLogger');
const tradeHistory = require('./tradehistory');

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
  tradeHistory.getAllTradeHistory(opts.currencyPair || 'all')
    .then(msg => consoleLogger.printArrayLineByLine(msg))
    .catch(err => consoleLogger.printError(err))
}

if (opts.returnBoughtSold) {
  tradeHistory.getBoughtSold(opts.currencyPair)
    .then((msg) => {
      consoleLogger.print(`bought ${msg.boughtAmount} pcs by ${msg.boughtValue}, average price: ${msg.averageValueBought}`, `${msg.currency} purchases in BTC`);
      consoleLogger.print(`sold ${msg.soldAmount} pcs by ${msg.soldValue}, average price ${msg.averageValueSold}`, `${msg.currency} sells in BTC`);
    });

  tradingApi.returnTradeHistory({
    currencyPair,
    // currencyPair: BTC_LTC
    start: new Date('1970-01-01 00:00:00').getTime() / 1000
    // start: 1410158341,
    // end: new Date('2017-05-05 05:43:30').getTime() / 1000
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

      consoleLogger.print(`bought ${boughtAmount} pcs by ${boughtValue}, average price: ${averageValueBought}`, `${currency} purchases in BTC`);
      consoleLogger.print(`sold ${soldAmount} pcs by ${soldValue}, average price ${averageValueSold}`, `${currency} sells in BTC`);
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
