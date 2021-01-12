const {mergeAll} = require("rxjs/operators");
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
            movie => movie.genres,
            m => m.title
        ),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(array => array[0]),
        mergeAll(),
        map(element => ({"id": element})),
        groupBy(
            m => m.id
        ),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(pair => [pair[0], pair[1].length]),
        reduce((acc, val) => {if (acc[1] > val[1]) {return val} else {return acc}}),
        mergeMap(genre => fromHttpRequest(`https://orels-moviedb.herokuapp.com/genres/${genre[0]}`), (outer, inner) => (
                {inner}
            )
        ),
        map(inner => inner.inner.name))
.subscribe(console.log);
