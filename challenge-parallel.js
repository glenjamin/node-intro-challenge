var engines = require('./setup');
var terms = escape(process.argv.slice(2).join(" "));

var http = require('http');
var url = require('url');
var querystring = require('querystring');

Object.keys(engines).forEach(function(engine_name) {
    var engine = engines[engine_name];
    var request_url = engine + terms;
    var parsed_url = url.parse(request_url);
    var request = {
        host: parsed_url.host, port: parsed_url.port || 80,
        path: parsed_url.pathname + parsed_url.search
    };
    http.get(request, function(response) {
        var data = '';
        response.on('data', function(d) { data += d });
        response.on('end', function() {
            console.log("Response from :" + request_url);
            console.log(data.substring(0, 100));
        });
    });
});
