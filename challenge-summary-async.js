var engines = require('./setup');
var terms = escape(process.argv.slice(2).join(" "));

var http = require('http');
var url = require('url');

var async = require('async');

var engine_names = Object.keys(engines);
function search(term, callback) {
    var results = {};
    async.forEach(engine_names,
        function iterator(engine_name, next) {
            var time = new Date();
            engine = engines[engine_name];
            request_url = engine + term;
            parsed_url = url.parse(request_url);
            request = {
                host: parsed_url.host, port: parsed_url.port || 80,
                path: parsed_url.pathname + parsed_url.search
            }
            http.get(request, function(response) {
                var data = '';
                response.on('data', function(d) { data += d });
                response.on('end', function() {
                    results[engine_name] =  {
                        time: (new Date() - time) / 1000,
                        data: data.substring(0, 100)
                    };
                    next();
                });
            });
        },
        function finished(err) {
            callback(null, results);
        }
    );
}

search(terms, function(err, results) {
    console.log(results);
})
