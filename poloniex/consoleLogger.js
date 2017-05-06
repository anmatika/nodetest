const chalk = require('chalk');

function printMessage(msg, regName) {
  console.log(chalk.green(regName));
  console.log(chalk.green('message'));
  console.log(msg.body);
}

function printError(err) {
  console.log(chalk.red(`error occured ${err}`));
}

function printArrayLineByLine(arr) {
  let parsed;
  try {
    parsed = JSON.parse(arr);
  } catch (e) {
    parsed = arr;
  }

  parsed.forEach(m => console.log(m));
}

module.exports.printMessage = printMessage;
module.exports.printError = printError;
module.exports.printArrayLineByLine = printArrayLineByLine;
