# simple-map-api

Makesure you can visit maps.googleapis.com


# Install
    
    npm i simple-map-api
    
# Example

    var sma = require('simple-map-api');
    
    var server = new sma({
        port:3010
    });
    
    server.start(); //=> server running on http://localhost:3010
    
    http://localhost:3010?geolocation=39.909946,116.656435&callback=callbackfn
    http://localhost:3010?address=tongzhouqu&callback=callbackfn