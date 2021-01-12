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
        map(array => [array[0], array[1].filter(score => score >= 3).length, array[1].length]),
        filter(rating => rating[2] * 0.7 <= rating[1]),
        mergeMap(rating => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies/${rating[0]}`), (outer, inner) => (
                {inner}
        )
        ),
        map(inner => inner.inner.title)
    )
    .subscribe(console.log);


