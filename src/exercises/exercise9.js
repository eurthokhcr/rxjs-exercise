const {take} = require("rxjs/operators");
const {reduce} = require("rxjs/operators");
const {of} = require("rxjs");
const {zip} = require("rxjs");
const {groupBy} = require("rxjs/operators");
const {toArray} = require("rxjs/operators");
const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe
    (
        mergeMap(array => array),
        groupBy(
            movie => movie.year,
            m => m.title
        ),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(array => [array[0], array[1].length]),
    )
    .subscribe(console.log);
