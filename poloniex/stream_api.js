"use strict";
var autobahn = require('autobahn');

const OPT_RESTAPI_URL = 'https://poloniex.com/public';
const OPT_TRADEAPI_URL = 'https://poloniex.com/tradingApi';
const OPT_WEBSOCKET_URL = 'wss://api.poloniex.com';
const OPT_LIMIT_SEC = 0.2;
const OPT_LIMIT_HOST = 'https://poloniex.com';
const OPT_TIMEOUT_SEC = 30;
const OPT_KEEPALIVE = false;

var createStreamApi = module.exports = function(pairs, receiver){
    var pairs = (pairs instanceof Array) ? pairs : [pairs];
    var instance = {
        close : function(){},
        debuglog : function(){},
        isReconnect : false,
    };
    var f = function(pair, receiver, instance){
        var uri = OPT_WEBSOCKET_URL;
        var conn = new autobahn.Connection({
            url: uri,
            realm: "realm1"
        });
        conn.onopen = function(session) {
            instance.debuglog(['opened', uri]);
            instance.isReconnect = true;
            pairs.forEach(function(pair){
                session.subscribe(pair, function(args, kwargs){
                    if(args.length) receiver({type:"market", pair:pair, message:args, sub:kwargs});
                });
            })
            session.subscribe('ticker', function(args, kwargs){
                receiver({type:"ticker",message:args, sub:kwargs});
            });
            session.subscribe('trollbox', function(args, kwargs){
                receiver({type:"trollbox",message:args, sub:kwargs});
            });
        }
        conn.onclose = function () {
            instance.debuglog(['closed', uri]);
            if(instance.isReconnect){
                f(pair, receiver, instance);
            }
        }
        conn.open();
        instance.close = function(){
            instance.isReconnect = false;
            conn.close();
        }
    }
    f(pairs, receiver, instance);
    return instance;
}

