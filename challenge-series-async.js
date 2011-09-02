var engines = require('./setup');
var terms = escape(process.argv.slice(2).join(" "));

var http = require('http');
var url = require('url');

var async = require('async');
var engine_names = Object.keys(engines);
async.forEachSeries(engine_names,
    function iterator(engine_name, next) {
        engine = engines[engine_name];
        request_url = engine + terms;
        parsed_url = url.parse(request_url);
        request = {
            host: parsed_url.host, port: parsed_url.port || 80,
            path: parsed_url.pathname + parsed_url.search
        }
        http.get(request, function(response) {
            var data = '';
            response.on('data', function(d) { data += d });
            response.on('end', function() {
                console.log("Response from: " + request_url);
                console.log(data.substring(0, 100));
                next();
            });
        });
    },
    function finished() {}
)
