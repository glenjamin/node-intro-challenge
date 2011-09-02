# NodeJS What, Why & How Challenge

This short challenge introduces you to handling control flow while making
asynchronous HTTP requests to major search engines.

Be careful which files you open, as all the solutions are already present
in this repository.

## 0. Setup

The file `setup.js` contains a short bit of bootstrap which will time your
script and also provides the search URLs.

    > node setup
    { google: 'http://google.com/search?q=',
      bing: 'http://www.bing.com/search?q=',
      yahoo: 'http://search.yahoo.com/search?p=',
      ask: 'http://www.ask.com/web?q=',
      duck: 'http://duckduckgo.com/?q=' }

Start with `challenge.js`, which requires the URL list and takes the search
terms from the command line.

Useful Links:
http://nodejs.org/docs/latest/api/http.html
http://nodejs.org/docs/latest/api/url.html

## 1. Parallel HTTP requests

Use node's stdlib HTTP client to make a request to each of the search engines
and then print the first 100 characters of the response to the console.

Solution: `challenge-parallel.js`

## 2. Serial HTTP requests

To demonstrate the complexities of control flow with async, now modify your
previous solution to make the requests one-at-a-time.

You can try and do this by hand, or use the async library.

Solutions: `challenge-series.js` `challenge-series-async.js`

## 3. Parallel requests with summary

Firing stuff off in parallel is easy enough, but knowing when asynchronous
tasks have completed is less so. Combine the results of all of the queries
into a single object keyed by engine name that contains the time taken to
process the request and the data.

    {
        google: {time: 1.34, data: '<html>...' },
        yahoo: {time: 1.34, data: '<html>...' },
        bing: {time: 1.34, data: '<html>...' },
        ...
    }

Again, you can try and do this by hand, or use the async library.

Solutions: `challenge-summary.js` `challenge-summary-async.js`

For bonus points pull the URL to the first result out of the data and include
that in the returned object.
