var engines = require('./setup');
var terms = escape(process.argv.slice(2).join(" "));

var http = require('http');
var url = require('url');

var async = require('async');

var engine_names = Object.keys(engines);
function search(term, callback) {
    var total = engine_names.length, count = 0, results = {};
    function done() {
        count += 1;
        if (count == total) {
            callback(null, results);
        }
    }
    engine_names.forEach(function(engine_name) {
        var time = new Date();
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
                results[engine_name] =  {
                    time: (new Date() - time) / 1000,
                    data: data.substring(0, 50)
                };
                done();
            });
        });
    });
}

search(terms, function(err, results) {
    console.log(results);
})
