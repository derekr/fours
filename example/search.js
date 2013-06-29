var fours = require('../lib')(
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // client_id
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'  // client_secret shhhh
    );

var request = fours({
    method: 'GET',
    uri:    '/venues/search?near=San%20Francisco,CA'
}).pipe(process.stdout);

request.on('error', function (err) {
    // Oh noes! 
});
