var express = require('express');
var app = express();

var request = require('request');

var querystring = require('querystring');

var App = function(config){
    this.port = config.port || 3000;
    
    app.get('/',function(req,res){
        var callback = req.query.callback || false;

        if(!req.query.geolocation && !req.query.address){
            callback ? res.send(callback+'("参数错误")') : res.send('参数错误');
        }

        if(req.query.geolocation){
            var geolocation = req.query.geolocation;

            request({
                url:'http://maps.google.com/maps/api/geocode/json?latlng='+(geolocation)+'&language=zh-CN&sensor=false',
                method:'get'
            },(err,data) => {
                if(err){
                    return callback ? res.send(callback+'("'+err+'")') : res.send(err);
                }

                var obj = JSON.parse(data.body);
                if(!obj.results[0]){
                    return callback ? res.send(callback+'("'+err+'")') : res.send(err);
                }

                var result = {};

                result.geolocation = obj.results[0].geometry.location;
                result.address = obj.results[0].formatted_address;
                result.city = obj.results[0].address_components[obj.results[0].address_components.length-2] ? obj.results[0].address_components[obj.results[0].address_components.length-3].long_name : '';

                callback ? res.send(callback+'("'+JSON.stringify(result)+'")') : res.json(result);
            });
        }

        if(req.query.address){
            var address = querystring.stringify(req.query);

            request({
                url:'http://maps.googleapis.com/maps/api/geocode/json?'+address+'&language=zh-CN&sensor=false',
                method:'get'
            },(err,data) => {
                if(err){
                    return callback ? res.send(callback+'("'+err+'")') : res.send(err);
                }

                var obj = JSON.parse(data.body);
                if(!obj.results[0]){
                    return callback ? res.send(callback+'("'+err+'")') : res.send(err);
                }

                var result = {};

                result.geolocation = obj.results[0].geometry.location;
                result.address = obj.results[0].formatted_address;
                result.city = obj.results[0].address_components[obj.results[0].address_components.length-2] ? obj.results[0].address_components[obj.results[0].address_components.length-3].long_name : '';

                callback ? res.send(callback+'("'+JSON.stringify(result)+'")') : res.json(result);
            });
        }

    });
}

App.prototype = {
    start:function(){
        console.log('server running on http://localhost:'+this.port);
        app.listen(this.port);
    }
}

module.exports = App;