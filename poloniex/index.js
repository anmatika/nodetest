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
    .then((currencies) => {
      currencies.forEach((currency) => {
        consoleLogger.print(`bought ${currency.boughtAmount} pcs by ${currency.boughtValue}, average price: ${currency.averageValueBought}`, `${currency.name} purchases in BTC`);
        consoleLogger.print(`sold ${currency.soldAmount} pcs by ${currency.soldValue}, average price ${currency.averageValueSold}`, `${currency.name} sells in BTC`);
      });
    });
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
