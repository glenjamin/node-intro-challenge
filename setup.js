var start = new Date();
process.on('exit', function() {
    var duration = (new Date() - start) / 1000;
    console.log("Script took " + duration + " seconds");
});

var GOOGLE = 'http://www.google.com/search?q=';
var BING   = 'http://www.bing.com/search?q=';
var YAHOO  = 'http://search.yahoo.com/search?p=';
var ASK    = 'http://www.ask.com/web?q=';
var DUCK   = 'http://duckduckgo.com/?q=';

module.exports = {
    google: GOOGLE,
    bing:   BING,
    yahoo:  YAHOO,
    ask:    ASK,
    duck:   DUCK
};

if (!module.parent) {
    console.log(module.exports);
}
