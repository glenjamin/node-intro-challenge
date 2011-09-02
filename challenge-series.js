var engines = require('./setup');
var terms = escape(process.argv.slice(2).join(" "));

var http = require('http');
var url = require('url');

var engine_names = Object.keys(engines);
function do_req() {
    var engine_name, engine, request_url, parsed_url, request;
    engine_name = engine_names.pop();
    if (!engine_name) {
        return;
    }
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
            do_req();
        });
    });
}
do_req();
