const chalk = require('chalk');
const tradingApi = require('./tradingApi')
const objectHelper = require('./objectHelper');

function consoleLogMsg(msg, regName) {
  console.log(chalk.green(regName));
  console.log(chalk.green('message'));
  console.log(msg.body);
}

function consoleLogError(err) {
  console.log(chalk.red(`error occured ${err}`));
}


tradingApi.returnBalances()
  .then((msg) => {
    const objArray = objectHelper.getGreaterThanZeroValuesFromObject(JSON.parse(msg.body));
    objArray.forEach((balance) => {
      console.log(balance);
    });
  })
  .catch(err => consoleLogError(err));

tradingApi.returnTradeHistory({
  currencyPair: 'all',
  // start: new Date('April 26, 2017, 2:00').getTime()
}).then(msg => consoleLogMsg(msg, 'returnTradeHistory'))
  .catch(err => consoleLogError(err))
