const dashdash = require('dashdash');

function get() {
  const options = [
    { name: 'all', type: 'bool' },
    { name: 'returnTradeHistory', type: 'bool' },
    { name: 'returnBalances', type: 'bool' },
    { name: 'currencyPair', type: 'string' }

  ];
  const opts = dashdash.parse({ options });
  return opts;
}

module.exports.get = get;
