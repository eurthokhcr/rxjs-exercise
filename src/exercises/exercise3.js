const {takeLast} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe
    (
        mergeMap(array => array),
        takeLast(1)
    )
    .subscribe(console.log);
