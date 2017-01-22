const path = require('path');

const arraysFilePathName = path.basename('~/code/nodetest/arrays.js');
console.log (arraysFilePathName);


console.log(process.env.PATH.split(path.delimiter));
