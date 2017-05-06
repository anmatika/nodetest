const request = require('request');
const crypto  = require('crypto');
const nonce   = require('nonce')();
const apikeys = require('../../keys/apikeys.js')
const urlLib = require('url');

const PUBLIC_API_URL  = 'https://poloniex.com/public';
const PRIVATE_API_URL = 'https://poloniex.com/tradingApi';

const APIKEY = apikeys.poloniex_api_key;
const SECRET = apikeys.poloniex_secret;

const createQuery = (command, { currencyPair, start, end }) => {
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
  query.nonce = nonce();

  return query;
}

const createQueryString = (command, opts) => {
  const query = createQuery(command, opts);

  const queryString = urlLib.format({ query }).substring(1);
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

const createOptions = ({ url, queryString, apiKey, secret }) => {
  const options = {
    url,
    headers: createHeader(apiKey, secret, queryString),
    method: 'post',
    body: queryString
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

module.exports.returnBalances = () => {
  return makeRequest('returnBalances', {});
}

module.exports.returnTradeHistory = ({ currencyPair, start, end }) => {
  return makeRequest('returnTradeHistory', {
    currencyPair,
    start,
    end
  });
}
