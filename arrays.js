/* global require */
const immutable = require('immutable');

const data = [{
    id: 1,
    name: 'foo',
    children: [{
        id: 1,
        name: 'foochild1'
    }, {
        id: 2,
        name: 'foochild2'
    }]
}, {
    id: 2,
    name: 'bar',
    children: [{
        id: 1,
        name: 'barchild1'
    }, {
        id: 2,
        name: 'barchild2'
    }]
}];

const idata = immutable.fromJS(data);

const item = idata.find(i => i.get('id') === 2);

console.log(item);
