var sma = require('./index.js');

var server = new sma({
    port:3010
});

server.start(); //=> server running on http://localhost:3010

//request
//http://localhost:3010?geolocation=39.909946,116.656435&callback=callbackfn
//http://localhost:3010?address=beijingshitongzhouqu&callback=callbackfn