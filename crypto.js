const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);

const hash2 = crypto.createHmac('sha256', secret)
                   .update('correcthorsewarmfinal')
                   .digest('hex');
console.log(hash2);

const hash3 = crypto.createHmac('sha256', 'abcdefH')
      .update('correcthorsewarmfinal')
      .digest('hex');
console.log(hash3);
