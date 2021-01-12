const {map} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');
const {takeLast} = require("rxjs/operators");

let counter = 0;
fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe
    (
        mergeMap(array => array),
        map(value => ++counter),
        takeLast(1)
    )
    .subscribe(console.log);
