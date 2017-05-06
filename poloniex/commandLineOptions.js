const dashdash = require('dashdash');

function get() {
  const options = [
    { name: 'all', type: 'bool' },
    { name: 'returnTradeHistory', type: 'bool' },
    { name: 'returnBalances', type: 'bool' },
    { name: 'buy', type: 'bool' },
    { name: 'sell', type: 'bool' },
    { name: 'cancelOrder', type: 'bool' },
    { name: 'amount', type: 'number' },
    { name: 'rate', type: 'number' },
    { name: 'currencyPair', type: 'string' },
    { name: 'returnOpenOrders', type: 'bool' },
    { name: 'orderNumber', type: 'string' }

  ];
  const opts = dashdash.parse({ options });
  return opts;
}

module.exports.get = get;
