## Fours
#### Minimalist [streaming](http://nodejs.org/api/stream.html) API client for Fouresquare.

Heavily ~~ripping off~~ inspired by [https://github.com/diy/diy-client]() written by [Andrew Sliwinski](https://github.com/thisandagain).

### Installation
```bash
npm install fours
```

### Basic Use
```javascript
var fours = require('fours')(
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

```
