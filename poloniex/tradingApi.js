const request = require('request');
const crypto  = require('crypto');
const nonce   = require('nonce')();
const apikeys = require('../../keys/apikeys.js')
const urlLib = require('url');


const PUBLIC_API_URL  = 'https://poloniex.com/public';
const PRIVATE_API_URL = 'https://poloniex.com/tradingApi';

const APIKEY = apikeys.poloniex_api_key;
const SECRET = apikeys.poloniex_secret;

const createQuery = (command, {
  currencyPair,
  start,
  end,
  buy,
  rate,
  amount,
  sell,
  cancelOrder,
  orderNumber
}) => {
  const query = {};

  query.command = command;
  if (currencyPair) {
    query.currencyPair = currencyPair
  }
  if (start) {
    query.start = start;
  }
  if (end) {
    query.end = end;
  }
  if (buy) {
    query.buy = buy;
  }
  if (sell) {
    query.sell = sell;
  }
  if (rate) {
    query.rate = rate;
  }
  if (amount) {
    query.amount = amount;
  }
  if (cancelOrder) {
    query.cancelOrder = cancelOrder;
  }
  if (orderNumber) {
    query.orderNumber = orderNumber;
  }
  query.nonce = nonce();

  return query;
}

const createQueryString = (command, opts) => {
  const query = createQuery(command, opts);

  const queryString = urlLib.format({ query }).substring(1);
  console.log('querystring', queryString);
  return queryString;
}

const createHeader = (apiKey, secret, queryString) => (
  {
    Key: apiKey,
    Sign: crypto.createHmac('sha512', secret).update(queryString).digest('hex'),
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'request node'
  }
)

const createOptions = ({ url, queryString, apiKey, secret, method = 'post' }) => {
  const options = {
    url,
    method,
    body: queryString
  }
  if (method === 'post') {
    options.headers = createHeader(apiKey, secret, queryString);
  }

  console.log('requesting with options: ', options)
  return options;
};

function makeRequest(command, opts) {
  const promise = new Promise((resolve, reject) => {
    request(createOptions({
      url: PRIVATE_API_URL,
      queryString: createQueryString(command, opts),
      apiKey: APIKEY,
      method: opts.method || 'post',
      secret: SECRET }), (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    })
  });
  return promise;
}

function makeRequestPublic(command) {
  return new Promise((resolve, reject) => {
    request(`${PUBLIC_API_URL}?command=${command}`, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    })
  })
}

module.exports.returnBalances = () => makeRequest('returnBalances', {});
module.exports.buy = ({ currencyPair, amount, rate }) => makeRequest('buy', { currencyPair, amount, rate });
module.exports.sell = ({ currencyPair, amount, rate }) => makeRequest('sell', { currencyPair, amount, rate });
module.exports.returnTradeHistory = ({ currencyPair, start, end }) => makeRequest('returnTradeHistory', { currencyPair, start, end });
module.exports.cancelOrder = ({ orderNumber }) => makeRequest('cancelOrder', { orderNumber });
module.exports.returnOpenOrders = ({ currencyPair }) => makeRequest('returnOpenOrders', { currencyPair });
module.exports.returnTicker = () => makeRequestPublic('returnTicker');
