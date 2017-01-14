const Immutable = require('immutable');
const colors = require('colors');

// Our existing data
const state = Immutable.fromJS({
    actors: {
        name: 'Scarlett Johansson'
    },
    heroes: {
        heroList: [{
            heroName: 'blackWidow',
            realName: 'Natasha Romanoff'
        }]
    }
});

// New data to append to the existing heroList
const heroList = Immutable.fromJS([{
    heroName: 'ironMan',
    realName: 'Tony Stark'
}, {
    heroName: 'captainAmerica',
    realName: 'Steve Rogers'
}]);



console.log(colors.red('state before: '), state);

// Here's the magic!
const nstate = state.setIn(['heroes'], state.getIn(['heroes', 'heroList']).concat(heroList));

console.log(colors.green('state after: '), nstate);
