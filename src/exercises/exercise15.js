const {take} = require("rxjs/operators");
const {reduce} = require("rxjs/operators");
const {filter} = require("rxjs/operators");
const {toArray} = require("rxjs/operators");
const {map} = require("rxjs/operators");
const {groupBy} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {zip} = require("rxjs");
const {of} = require("rxjs");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings')
    .pipe
    (
        mergeMap(array => array),
        groupBy(
            rating => rating.movie,
            r => r.score
        ),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(array => [array[0], array[1].reduce((acc, score) => acc + score) /  array[1].length]),
        toArray(),
        mergeMap(array => array),
        mergeMap(movie => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies/${movie[0]}`), (outer, inner) => {
              return  {
                    "inner": inner, "outer": outer
                }
            }
        ),
        map(inner => [inner.inner.title, inner.outer[1]]),
        toArray(),
        map(arr => arr.sort((next, prev) => {
            return - next[1] + prev[1]
        })),
        mergeMap(array => array[0]),
        take(1)
    )
    .subscribe(console.log);


